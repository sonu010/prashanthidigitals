"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUploadCloud, FiLoader } from "react-icons/fi";

interface GalleryPhoto { id: number; category: string; cloudinaryUrl: string; title: string; }
const STORAGE_KEY = "prashanthi_gallery";
const categories = ["All", "Weddings", "Pre-Wedding", "Birthdays", "Ceremonies", "Haldi", "Reception", "LED Wall"];
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: "", category: "Weddings" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setPhotos(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(photos)); }, [photos]);

  const filtered = activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);
  const handleDelete = (id: number) => { if (confirm("Delete this photo?")) setPhotos((p) => p.filter((ph) => ph.id !== id)); };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); setUploadError(""); }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !newPhoto.title) return;

    // If no Cloudinary configured, use local preview URL
    if (!CLOUD_NAME) {
      setUploadError("Cloudinary not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local and create an unsigned upload preset named 'prashanthi_unsigned'.");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "prashanthi_unsigned");
      formData.append("folder", `prashanthi/gallery/${newPhoto.category.toLowerCase().replace(/\s+/g, "-")}`);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
      const data = await res.json();

      if (data.error) {
        setUploadError(data.error.message);
        setUploading(false);
        return;
      }

      const photo: GalleryPhoto = {
        id: Date.now(),
        category: newPhoto.category,
        cloudinaryUrl: data.secure_url,
        title: newPhoto.title,
      };

      setPhotos((prev) => [...prev, photo]);
      setNewPhoto({ title: "", category: "Weddings" });
      setPreviewUrl(null);
      setSelectedFile(null);
      setShowUpload(false);
    } catch (err) {
      setUploadError("Upload failed. Check your internet connection and Cloudinary settings.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Gallery Manager</h1>
        <button onClick={() => setShowUpload(!showUpload)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPlus className="w-4 h-4" /><span className="hidden sm:inline">Upload</span></button>
      </header>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Cloudinary status */}
        {!CLOUD_NAME && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800 font-medium">&#9888; Cloudinary not configured</p>
            <p className="text-xs text-yellow-600 mt-1">Set <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> in your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file and create an unsigned upload preset named <code className="bg-yellow-100 px-1 rounded">prashanthi_unsigned</code> in your Cloudinary dashboard.</p>
          </div>
        )}

        {showUpload && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h3 className="font-bold text-accent mb-4">Upload New Photo to Cloudinary</h3>
            <form onSubmit={handleUpload} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" required value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Photo title" />
                <select value={newPhoto.category} onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">{categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}</select>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="relative inline-block"><Image src={previewUrl} alt="Preview" width={200} height={150} className="rounded-lg object-cover" style={{ width: "auto", height: "auto" }} /><button type="button" onClick={() => { setPreviewUrl(null); setSelectedFile(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">x</button></div>
                ) : (
                  <div><FiUploadCloud className="w-10 h-10 text-gray-300 mx-auto mb-2" /><p className="text-sm text-gray-400 mb-2">Select a photo to upload</p><input type="file" accept="image/*" onChange={handleFileSelect} className="text-sm" /></div>
                )}
              </div>
              {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
              <div className="flex gap-3">
                <button type="submit" disabled={!selectedFile || uploading} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center gap-2">
                  {uploading ? <><FiLoader className="w-4 h-4 animate-spin" /> Uploading...</> : <><FiUploadCloud className="w-4 h-4" /> Upload to Cloud</>}
                </button>
                <button type="button" onClick={() => { setShowUpload(false); setPreviewUrl(null); setSelectedFile(null); setUploadError(""); }} className="text-sm text-gray-500">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">{categories.map((cat) => <button key={cat} onClick={() => setActiveCategory(cat)} className={"px-4 py-2 rounded-full text-sm font-medium transition " + (activeCategory === cat ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50")}>{cat} ({cat === "All" ? photos.length : photos.filter((p) => p.category === cat).length})</button>)}</div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo) => (
            <div key={photo.id} className="relative group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <div className="aspect-[4/3] relative"><Image src={photo.cloudinaryUrl} alt={photo.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" /></div>
              <div className="p-2 flex items-center justify-between">
                <div className="min-w-0 flex-1"><p className="text-xs font-medium text-accent truncate">{photo.title}</p><p className="text-[10px] text-gray-400">{photo.category}</p></div>
                <button onClick={() => handleDelete(photo.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <FiUploadCloud className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No photos uploaded yet.</p>
            <p className="text-sm mt-1">Photos you upload here will appear on the public Gallery page.</p>
          </div>
        )}
      </div>
    </div>
  );
}
