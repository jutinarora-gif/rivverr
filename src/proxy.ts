import { NextResponse, type NextRequest } from "next/server";

/**
 * US-only gate. Rivverr markets and sells exclusively to US businesses, so
 * traffic from outside the US is redirected to /blocked instead of served
 * the marketing site or contact form.
 *
 * Country resolution, in order of preference:
 *  1. A CDN/edge-supplied geo header, when the host provides one for free
 *     (Vercel: x-vercel-ip-country, Cloudflare: cf-ipcountry). No network
 *     call, no rate limit, most reliable — this is what you get if you
 *     deploy behind Vercel or put the app behind Cloudflare.
 *  2. A fallback lookup against a free IP-geolocation API, for hosts (a
 *     bare VPS, for example) that don't inject a geo header. This adds
 *     latency and is rate-limited, so results are cached in-memory for the
 *     life of the server process.
 *
 * For a production deployment on your own VPS, prefer configuring
 * geo-blocking at the reverse proxy / CDN layer (e.g. Cloudflare firewall
 * rules, or nginx with the geoip2 module) in addition to this middleware —
 * that blocks traffic before it ever reaches Node, and doesn't depend on a
 * third-party API's uptime or rate limits.
 */

const ALLOWED_COUNTRY = "US";

// Set ALLOW_ALL_COUNTRIES=1 in .env.local for local development, so you're
// not blocked by your own non-US dev IP or an unresolvable localhost lookup.
const BYPASS = process.env.ALLOW_ALL_COUNTRIES === "1";

const PASSTHROUGH_PATHS = ["/blocked", "/favicon.ico", "/robots.txt", "/sitemap.xml"];

type CacheEntry = { country: string | null; expires: number };
const geoCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000;

function getClientIp(req: NextRequest): string | null {
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return null;
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("172.17.") ||
    ip.startsWith("172.18.") ||
    ip.startsWith("172.19.") ||
    ip.startsWith("172.2") ||
    ip.startsWith("172.3")
  );
}

async function lookupCountry(ip: string): Promise<string | null> {
  const cached = geoCache.get(ip);
  if (cached && cached.expires > Date.now()) return cached.country;

  try {
    const res = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) throw new Error(`geo lookup failed: ${res.status}`);
    const text = (await res.text()).trim();
    const country = /^[A-Z]{2}$/.test(text) ? text : null;
    geoCache.set(ip, { country, expires: Date.now() + CACHE_TTL_MS });
    return country;
  } catch {
    // Fail open: an unreachable geo API should not take the whole site down.
    return null;
  }
}

export async function proxy(req: NextRequest) {
  if (BYPASS) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (
    PASSTHROUGH_PATHS.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const edgeCountry = req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry");

  let country = edgeCountry;
  if (!country) {
    const ip = getClientIp(req);
    if (ip && !isPrivateIp(ip)) {
      country = await lookupCountry(ip);
    }
  }

  // Unresolvable country (lookup failed, local dev, etc.) fails open rather
  // than locking out real US visitors behind an unreliable third-party call.
  if (country && country !== ALLOWED_COUNTRY) {
    const url = req.nextUrl.clone();
    url.pathname = "/blocked";
    url.search = "";
    return NextResponse.rewrite(url, { status: 451 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
