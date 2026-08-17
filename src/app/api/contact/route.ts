import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND, PACKAGES } from "@/lib/site-data";

export const runtime = "nodejs";

const PKG_NAMES: Record<string, string> = Object.fromEntries(PACKAGES.map((p) => [p.id, p.name]));

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured on the server." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const site = String(body.site ?? "").trim();
  const pkg = String(body.pkg ?? "").trim();
  const deadline = String(body.deadline ?? "").trim();
  const details = String(body.details ?? "").trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "A valid name and email are required." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM || "Rivverr <onboarding@resend.dev>";
  const to = process.env.RESEND_TO || BRAND.email;

  const pkgLabel = PKG_NAMES[pkg] ?? pkg ?? "not given";

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "not given"}`,
    `Current site: ${site || "not given"}`,
    `Package: ${pkgLabel}`,
    `Deadline: ${deadline || "not given"}`,
    "",
    "Project:",
    details || "not given",
  ].join("\n");

  const html = `
    <table style="width:100%;max-width:560px;font-family:sans-serif;font-size:14px;line-height:1.6;color:#0d3742">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(company || "not given")}</td></tr>
      <tr><td><strong>Current site</strong></td><td>${escapeHtml(site || "not given")}</td></tr>
      <tr><td><strong>Package</strong></td><td>${escapeHtml(pkgLabel)}</td></tr>
      <tr><td><strong>Deadline</strong></td><td>${escapeHtml(deadline || "not given")}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:14px;color:#0d3742"><strong>Project</strong></p>
    <p style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#0d3742;white-space:pre-wrap">${escapeHtml(details || "not given")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New project from ${name}`,
      text,
      html,
    });
    if (error) {
      return NextResponse.json({ error: error.message ?? "Failed to send." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
