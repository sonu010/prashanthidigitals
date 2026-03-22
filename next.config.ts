import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  /**
   * These NEXT_PUBLIC_ keys are intentionally public (client-side safe).
   * Supabase anon key: designed for browser use; security enforced by Supabase RLS policies.
   * Cloudinary: public cloud name & unsigned upload preset for client uploads.
   * Ideally, move these to Vercel Dashboard → Environment Variables and remove from here.
   */
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dwmqup5uo",
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "prashanthi_unsigned",
    NEXT_PUBLIC_SUPABASE_URL: "https://regjxgbptdyztmnamuhn.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZ2p4Z2JwdGR5enRtbmFtdWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzk2MDQsImV4cCI6MjA4OTcxNTYwNH0.x3fUG7iTebWXwPKHLhF-RW-BaTUIeF1x-JxctDuVRrY",
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
