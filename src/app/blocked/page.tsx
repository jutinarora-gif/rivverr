import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not available in your region",
  robots: { index: false, follow: false },
};

export default function Blocked() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="label text-primary">451</p>
      <h1 className="headline mt-4 text-[clamp(2rem,6vw,3.5rem)]">Not available in your region.</h1>
      <p className="standfirst mt-6 max-w-md text-muted-foreground">
        Rivverr builds websites exclusively for businesses based in the United States, and this site
        is only available to US visitors.
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        If you believe you&apos;re seeing this in error, write to{" "}
        <a href="mailto:info@rivverr.com" className="text-primary underline underline-offset-4">
          info@rivverr.com
        </a>
        .
      </p>
    </div>
  );
}
