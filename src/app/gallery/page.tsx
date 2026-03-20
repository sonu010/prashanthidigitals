"use client";
import { useState } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const categories = [
  "All",
  "Weddings",
  "Pre-Wedding",
  "Birthdays",
  "Ceremonies",
  "LED Wall",
];

// Real gallery data
const galleryItems = [
  { id: 1, category: "Weddings", src: "/images/gallery/wedding/cp100199.jpg", title: "Wedding Photography" },
  { id: 2, category: "Weddings", src: "/images/gallery/wedding/cp108787.jpg", title: "Wedding Ceremony" },
  { id: 3, category: "Weddings", src: "/images/gallery/wedding/cp108812.jpg", title: "Wedding Moments" },
  { id: 4, category: "Weddings", src: "/images/gallery/wedding/cp109115.jpg", title: "Wedding Rituals" },
  { id: 5, category: "Weddings", src: "/images/gallery/wedding/cp109196.jpg", title: "Wedding Celebrations" },
  { id: 6, category: "Weddings", src: "/images/gallery/wedding/cp109222.jpg", title: "Wedding Reception" },
  { id: 7, category: "Pre-Wedding", src: "/images/gallery/prewedding/cp101404.jpg", title: "Pre-Wedding Shoot" },
  { id: 8, category: "Pre-Wedding", src: "/images/gallery/prewedding/cp101427.jpg", title: "Couple Portrait" },
  { id: 9, category: "Pre-Wedding", src: "/images/gallery/prewedding/cp101469.jpg", title: "Outdoor Shoot" },
  { id: 10, category: "Pre-Wedding", src: "/images/gallery/prewedding/cp101553.jpg", title: "Pre-Wedding Moments" },
  { id: 11, category: "Pre-Wedding", src: "/images/gallery/prewedding/cp101604.jpg", title: "Romantic Portrait" },
  { id: 12, category: "Pre-Wedding", src: "/images/gallery/prewedding/cp101776.jpg", title: "Couple Session" },
  { id: 13, category: "Birthdays", src: "/images/gallery/baby-birthday/056a5957.jpg", title: "Birthday Celebration" },
  { id: 14, category: "Birthdays", src: "/images/gallery/baby-birthday/056a5989.jpg", title: "Kids Birthday" },
  { id: 15, category: "Birthdays", src: "/images/gallery/baby-birthday/056a5994.jpg", title: "Birthday Party" },
  { id: 16, category: "Birthdays", src: "/images/gallery/baby-birthday/056a6022.jpg", title: "Birthday Moments" },
  { id: 17, category: "Ceremonies", src: "/images/gallery/cradle-ceremony/dsc06501.jpg", title: "Cradle Ceremony" },
  { id: 18, category: "Ceremonies", src: "/images/gallery/cradle-ceremony/dsc06628.jpg", title: "Naming Ceremony" },
  { id: 19, category: "Ceremonies", src: "/images/gallery/cradle-ceremony/dsc06865.jpg", title: "Ceremony Rituals" },
  { id: 20, category: "Ceremonies", src: "/images/gallery/cradle-ceremony/dsc06975.jpg", title: "Ceremony Moments" },
  { id: 21, category: "Ceremonies", src: "/images/gallery/haldi/dsc00032.jpg", title: "Haldi Ceremony" },
  { id: 22, category: "Ceremonies", src: "/images/gallery/haldi/dsc00108.jpg", title: "Haldi Celebration" },
  { id: 23, category: "Ceremonies", src: "/images/gallery/haldi/dsc00141.jpg", title: "Haldi Moments" },
  { id: 24, category: "Ceremonies", src: "/images/gallery/haldi/dsc00176.jpg", title: "Haldi Rituals" },
  { id: 25, category: "Ceremonies", src: "/images/gallery/mangala-snanam/056a8555.jpg", title: "Mangala Snanam" },
  { id: 26, category: "Ceremonies", src: "/images/gallery/mangala-snanam/056a8582.jpg", title: "Mangala Snanam" },
  { id: 27, category: "Ceremonies", src: "/images/gallery/mangala-snanam/056a8628.jpg", title: "Mangala Snanam" },
  { id: 28, category: "Ceremonies", src: "/images/gallery/mangala-snanam/056a9085.jpg", title: "Mangala Snanam" },
  { id: 29, category: "Ceremonies", src: "/images/gallery/reception/reception-1.jpg", title: "Reception Moments" },
  { id: 30, category: "Ceremonies", src: "/images/gallery/reception/reception-50.jpg", title: "Reception Celebration" },
  { id: 31, category: "Ceremonies", src: "/images/gallery/reception/reception-75.jpg", title: "Reception Highlights" },
  { id: 32, category: "Ceremonies", src: "/images/gallery/reception/reception-125.jpg", title: "Reception Party" },
  { id: 33, category: "LED Wall", src: "/images/led-walls/ledwalls.jpg", title: "LED Wall Setup" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  const nextImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));

  return (
    <>
      {/* Page Header */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Our Work
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Portfolio Gallery
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse through our collection of work across weddings, pre-wedding shoots,
            birthdays, ceremonies, corporate events, and LED wall installations.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end">
                  <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition font-medium">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-20">
              No photos in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full z-10"
          >
            <FiX className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white p-2 hover:bg-white/20 rounded-full z-10"
          >
            <FiChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white p-2 hover:bg-white/20 rounded-full z-10"
          >
            <FiChevronRight className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].title}
              width={900}
              height={675}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg font-medium">
              {filtered[lightboxIndex].title}
            </p>
            <p className="text-gray-400 text-center text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}

      {/* Video Section */}
      <section className="py-16 md:py-24 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
              Video Highlights
            </h2>
            <p className="text-gray-500">Watch our highlight reels and wedding films</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center"
              >
                <div className="text-center text-gray-400">
                  <p className="text-4xl mb-2">▶</p>
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
