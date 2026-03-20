"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cloudinaryUrl, defaultGalleryPhotos } from "@/lib/cloudinary";

const categories = ["All", "Weddings", "Pre-Wedding", "Birthdays", "Ceremonies", "LED Wall"];
const ADMIN_GALLERY_KEY = "prashanthi_gallery";

interface GalleryItem {
  id: number;
  category: string;
  src: string;
  publicId?: string;
  title: string;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [allItems, setAllItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Merge default Cloudinary photos + admin-uploaded photos
    const defaults: GalleryItem[] = defaultGalleryPhotos.map((p) => ({
      id: p.id,
      category: p.category,
      src: cloudinaryUrl(p.publicId, 800),
      publicId: p.publicId,
      title: p.title,
    }));

    // Admin-uploaded photos from gallery manager (stored in localStorage)
    let adminPhotos: GalleryItem[] = [];
    try {
      const stored = localStorage.getItem(ADMIN_GALLERY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        adminPhotos = parsed.map((p: { id: number; category: string; cloudinaryUrl?: string; src?: string; title: string }) => ({
          id: p.id,
          category: p.category,
          src: p.cloudinaryUrl || p.src || "",
          title: p.title,
        }));
      }
    } catch {}

    setAllItems([...defaults, ...adminPhotos]);
  }, []);

  const filtered = activeCategory === "All" ? allItems : allItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));

  return (
    <>
      {/* Page Header */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">Our Work</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Portfolio Gallery</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Browse through our collection of work across weddings, pre-wedding shoots, birthdays, ceremonies, and LED wall installations.</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {cat} ({cat === "All" ? allItems.length : allItems.filter((i) => i.category === cat).length})
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((item, index) => (
              <div key={item.id} onClick={() => openLightbox(index)} className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                <Image src={item.src} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end">
                  <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && <p className="text-center text-gray-400 py-20">No photos in this category yet. Check back soon!</p>}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full z-10"><FiX className="w-8 h-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white p-2 hover:bg-white/20 rounded-full z-10"><FiChevronLeft className="w-8 h-8" /></button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white p-2 hover:bg-white/20 rounded-full z-10"><FiChevronRight className="w-8 h-8" /></button>
          <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <Image src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].title} width={900} height={675} className="w-full h-auto rounded-lg" />
            <p className="text-white text-center mt-4 text-lg font-medium">{filtered[lightboxIndex].title}</p>
            <p className="text-gray-400 text-center text-sm">{lightboxIndex + 1} / {filtered.length}</p>
          </div>
        </div>
      )}

      {/* Video Section */}
      <section className="py-16 md:py-24 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">Video Highlights</h2>
            <p className="text-gray-500">Watch our highlight reels and wedding films</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-4xl mb-2">&#9654;</p>
                  <p className="text-sm">Video Reel {i}</p>
                  <p className="text-xs">(Embed YouTube here)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
