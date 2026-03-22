const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

/**
 * Build a Cloudinary URL with auto-format, auto-quality, and optional width.
 * If no cloud name is configured, falls back to local /images/ path.
 *
 * Usage:
 *   cloudinaryUrl("prashanthi/gallery/wedding/cp100199")
 *   cloudinaryUrl("prashanthi/gallery/wedding/cp100199", 800)
 */
export function cloudinaryUrl(publicId: string, width?: number): string {
  if (!CLOUD_NAME) {
    // Fallback: convert publicId to local path
    // e.g. "prashanthi/gallery/wedding/cp100199" -> "/images/gallery/wedding/cp100199.jpg"
    const localPath = publicId.replace(/^prashanthi\//, "/images/") + ".jpg";
    return localPath;
  }

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${publicId}`;
}

/** Key image public IDs used across the site */
export const siteImages = {
  hero: "prashanthi/hero/main-photo",
  owner: "prashanthi/owner/dad",
  ledWall: "prashanthi/led-walls/ledwalls",
  logo: "prashanthi/logo/logo",
};
