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

/**
 * All default gallery photos with their Cloudinary public IDs.
 * These are the initial photos uploaded. Admin can add more via gallery manager.
 */
export const defaultGalleryPhotos = [
  // Weddings
  { id: 1, category: "Weddings", publicId: "prashanthi/gallery/wedding/cp100199", title: "Wedding Photography" },
  { id: 2, category: "Weddings", publicId: "prashanthi/gallery/wedding/cp108787", title: "Wedding Ceremony" },
  { id: 3, category: "Weddings", publicId: "prashanthi/gallery/wedding/cp108812", title: "Wedding Moments" },
  { id: 4, category: "Weddings", publicId: "prashanthi/gallery/wedding/cp109115", title: "Wedding Rituals" },
  { id: 5, category: "Weddings", publicId: "prashanthi/gallery/wedding/cp109196", title: "Wedding Celebrations" },
  { id: 6, category: "Weddings", publicId: "prashanthi/gallery/wedding/cp109222", title: "Wedding Reception" },
  // Pre-Wedding
  { id: 7, category: "Pre-Wedding", publicId: "prashanthi/gallery/prewedding/cp101404", title: "Pre-Wedding Shoot" },
  { id: 8, category: "Pre-Wedding", publicId: "prashanthi/gallery/prewedding/cp101427", title: "Couple Portrait" },
  { id: 9, category: "Pre-Wedding", publicId: "prashanthi/gallery/prewedding/cp101469", title: "Outdoor Shoot" },
  { id: 10, category: "Pre-Wedding", publicId: "prashanthi/gallery/prewedding/cp101553", title: "Pre-Wedding Moments" },
  { id: 11, category: "Pre-Wedding", publicId: "prashanthi/gallery/prewedding/cp101604", title: "Romantic Portrait" },
  { id: 12, category: "Pre-Wedding", publicId: "prashanthi/gallery/prewedding/cp101776", title: "Couple Session" },
  // Birthdays
  { id: 13, category: "Birthdays", publicId: "prashanthi/gallery/baby-birthday/056a5957", title: "Birthday Celebration" },
  { id: 14, category: "Birthdays", publicId: "prashanthi/gallery/baby-birthday/056a5989", title: "Kids Birthday" },
  { id: 15, category: "Birthdays", publicId: "prashanthi/gallery/baby-birthday/056a5994", title: "Birthday Party" },
  { id: 16, category: "Birthdays", publicId: "prashanthi/gallery/baby-birthday/056a6022", title: "Birthday Moments" },
  // Ceremonies
  { id: 17, category: "Ceremonies", publicId: "prashanthi/gallery/cradle-ceremony/dsc06501", title: "Cradle Ceremony" },
  { id: 18, category: "Ceremonies", publicId: "prashanthi/gallery/cradle-ceremony/dsc06628", title: "Naming Ceremony" },
  { id: 19, category: "Ceremonies", publicId: "prashanthi/gallery/cradle-ceremony/dsc06865", title: "Ceremony Rituals" },
  { id: 20, category: "Ceremonies", publicId: "prashanthi/gallery/cradle-ceremony/dsc06975", title: "Ceremony Moments" },
  { id: 21, category: "Ceremonies", publicId: "prashanthi/gallery/haldi/dsc00032", title: "Haldi Ceremony" },
  { id: 22, category: "Ceremonies", publicId: "prashanthi/gallery/haldi/dsc00108", title: "Haldi Celebration" },
  { id: 23, category: "Ceremonies", publicId: "prashanthi/gallery/haldi/dsc00141", title: "Haldi Moments" },
  { id: 24, category: "Ceremonies", publicId: "prashanthi/gallery/haldi/dsc00176", title: "Haldi Rituals" },
  { id: 25, category: "Ceremonies", publicId: "prashanthi/gallery/mangala-snanam/056a8555", title: "Mangala Snanam" },
  { id: 26, category: "Ceremonies", publicId: "prashanthi/gallery/mangala-snanam/056a8582", title: "Mangala Snanam" },
  { id: 27, category: "Ceremonies", publicId: "prashanthi/gallery/mangala-snanam/056a8628", title: "Mangala Snanam" },
  { id: 28, category: "Ceremonies", publicId: "prashanthi/gallery/mangala-snanam/056a9085", title: "Mangala Snanam" },
  { id: 29, category: "Ceremonies", publicId: "prashanthi/gallery/reception/reception-1", title: "Reception Moments" },
  { id: 30, category: "Ceremonies", publicId: "prashanthi/gallery/reception/reception-50", title: "Reception Celebration" },
  { id: 31, category: "Ceremonies", publicId: "prashanthi/gallery/reception/reception-75", title: "Reception Highlights" },
  { id: 32, category: "Ceremonies", publicId: "prashanthi/gallery/reception/reception-125", title: "Reception Party" },
  // LED Wall
  { id: 33, category: "LED Wall", publicId: "prashanthi/led-walls/ledwalls", title: "LED Wall Setup" },
];

/** Key image public IDs used across the site */
export const siteImages = {
  hero: "prashanthi/hero/main-photo",
  owner: "prashanthi/owner/dad",
  ledWall: "prashanthi/led-walls/ledwalls",
  logo: "prashanthi/logo/logo",
};
