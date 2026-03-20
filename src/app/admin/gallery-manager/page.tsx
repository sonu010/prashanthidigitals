"use client";
import { useState } from "react";
import Image from "next/image";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface GalleryPhoto { id: number; category: string; src: string; title: string; }
const categories = ["All", "Weddings", "Pre-Wedding", "Birthdays", "Ceremonies", "Haldi", "Reception", "LED Wall"];

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: "", category: "Weddings" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);
  const handleDelete = (id: number) => { if (confirm("Delete this photo?")) setPhotos((p) => p.filter((ph) => ph.id !== id)); };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !newPhoto.title) return;
    // Create object URL for preview (in production, upload to Cloudinary)
    const url = previewUrl || "";
    setPhotos((prev) => [...prev, { id: Date.now(), category: newPhoto.category, src: url, title: newPhoto.title }]);
    setNewPhoto({ title: "", category: "Weddings" }); setPreviewUrl(null); setSelectedFile(null); setShowUpload(false);
  };

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Gallery Manager</h1>
        <button onClick={() => setShowUpload(!showUpload)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPlus className="w-4 h-4" /><span className="hidden sm:inline">Upload</span></button>
      </header>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {showUpload && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h3 className="font-bold text-accent mb-4">Upload New Photo</h3>
            <form onSubmit={handleUpload} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" required value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Photo title" />
                <select value={newPhoto.category} onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">{categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}</select>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="relative inline-block"><Image src={previewUrl} alt="Preview" width={200} height={150} className="rounded-lg object-cover" /><button type="button" onClick={() => { setPreviewUrl(null); setSelectedFile(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">x</button></div>
                ) : (
                  <div><p className="text-sm text-gray-400 mb-2">Click to select a photo</p><input type="file" accept="image/*" onChange={handleFileSelect} className="text-sm" /></div>
                )}
              </div>
              <div className="flex gap-3"><button type="submit" disabled={!selectedFile} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">Upload</button><button type="button" onClick={() => { setShowUpload(false); setPreviewUrl(null); setSelectedFile(null); }} className="text-sm text-gray-500">Cancel</button></div>
            </form>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-6">{categories.map((cat) => <button key={cat} onClick={() => setActiveCategory(cat)} className={"px-4 py-2 rounded-full text-sm font-medium transition " + (activeCategory === cat ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50")}>{cat} ({cat === "All" ? photos.length : photos.filter((p) => p.category === cat).length})</button>)}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo) => (
            <div key={photo.id} className="relative group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <div className="aspect-[4/3] relative"><Image src={photo.src} alt={photo.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" /></div>
              <div className="p-2 flex items-center justify-between">
                <div><p className="text-xs font-medium text-accent truncate">{photo.title}</p><p className="text-[10px] text-gray-400">{photo.category}</p></div>
                <button onClick={() => handleDelete(photo.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-20 text-gray-400"><p>No photos yet. Upload some!</p></div>}
      </div>
    </div>
  );
}
