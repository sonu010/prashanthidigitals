import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dwmqup5uo",
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "prashanthi_unsigned",
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
    ],
  },
};

export default nextConfig;
