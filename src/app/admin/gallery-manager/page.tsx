"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";

interface GalleryPhoto {
  id: number;
  category: string;
  src: string;
  title: string;
}

const demoPhotos: GalleryPhoto[] = [
  { id: 1, category: "Weddings", src: "https://placehold.co/300x225/c8102e/ffffff?text=Wedding+1", title: "Wedding 1" },
  { id: 2, category: "Weddings", src: "https://placehold.co/300x225/1a1a2e/ffffff?text=Wedding+2", title: "Wedding 2" },
  { id: 3, category: "Pre-Wedding", src: "https://placehold.co/300x225/d4a843/ffffff?text=PreWed+1", title: "Pre-Wedding 1" },
  { id: 4, category: "Birthdays", src: "https://placehold.co/300x225/f5c518/1a1a2e?text=Birthday+1", title: "Birthday 1" },
  { id: 5, category: "LED Wall", src: "https://placehold.co/300x225/1a1a2e/f5c518?text=LED+1", title: "LED Wall 1" },
  { id: 6, category: "Corporate", src: "https://placehold.co/300x225/c8102e/ffffff?text=Corp+1", title: "Corporate 1" },
];

const categories = ["All", "Weddings", "Pre-Wedding", "Birthdays", "Ceremonies", "Corporate", "LED Wall"];

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(demoPhotos);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: "", category: "Weddings" });

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  const handleDelete = (id: number) => {
    if (confirm("Delete this photo?")) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: upload to cloud storage, get URL
    setPhotos((prev) => [
      ...prev,
      {
        id: Date.now(),
        category: newPhoto.category,
        src: `https://placehold.co/300x225/c8102e/ffffff?text=${newPhoto.title.replace(/ /g, "+")}`,
        title: newPhoto.title,
      },
    ]);
    setNewPhoto({ title: "", category: "Weddings" });
    setShowUpload(false);
  };

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">🖼️ Gallery Manager</h1>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"
        >
          <FiPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </button>
      </header>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Upload Form */}
        {showUpload && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h3 className="font-bold text-accent mb-4">Upload New Photo</h3>
            <form onSubmit={handleUpload} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Photo title"
                />
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                >
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
                <p className="text-sm">📷 Drag & drop photos here or click to browse</p>
                <p className="text-xs mt-1">Recommended: 600×450px (4:3 ratio)</p>
                <input type="file" accept="image/*" className="mt-3" />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold">
                  Upload
                </button>
                <button type="button" onClick={() => setShowUpload(false)} className="text-sm text-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat} {cat === "All" ? `(${photos.length})` : `(${photos.filter((p) => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo) => (
            <div key={photo.id} className="relative group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <div className="aspect-[4/3] relative">
                <Image src={photo.src} alt={photo.title} fill className="object-cover" />
              </div>
              <div className="p-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-accent truncate">{photo.title}</p>
                  <p className="text-[10px] text-gray-400">{photo.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p>No photos in this category. Upload some!</p>
          </div>
        )}
      </div>
    </div>
  );
}
