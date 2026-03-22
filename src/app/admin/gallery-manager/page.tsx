"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FiPlus, FiTrash2, FiUploadCloud, FiLoader, FiYoutube, FiImage } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { galleryCategories } from "@/lib/eventCategories";

interface GalleryItem {
  id: string;
  category: string;
  url: string;
  title: string;
  public_id?: string;
  source?: string;
}

/** Extract YouTube video ID from various URL formats */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

const allCategories = ["All", ...galleryCategories];
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

type UploadMode = "photo" | "video";
type FilterType = "all" | "photos" | "videos";

export default function GalleryManagerPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadMode, setUploadMode] = useState<UploadMode>("photo");
  const [filterType, setFilterType] = useState<FilterType>("all");

  // Photo upload state
  const [newPhoto, setNewPhoto] = useState({ title: "", category: galleryCategories[0] });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Video state
  const [newVideo, setNewVideo] = useState({ title: "", category: galleryCategories[0], youtubeUrl: "" });
  const [videoPreviewId, setVideoPreviewId] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const fetchItems = useCallback(async () => {
    const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const isVideo = (item: GalleryItem) => item.source === "youtube";

  const filtered = items.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const typeMatch =
      filterType === "all" ||
      (filterType === "videos" && isVideo(p)) ||
      (filterType === "photos" && !isVideo(p));
    return catMatch && typeMatch;
  });

  const photoCount = items.filter((i) => !isVideo(i)).length;
  const videoCount = items.filter((i) => isVideo(i)).length;

  const handleDelete = async (id: string) => {
    if (confirm("Delete this item?")) {
      await supabase.from("gallery_items").delete().eq("id", id);
      fetchItems();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); setUploadError(""); }
  };

  const handlePhotoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !newPhoto.title) return;
    if (!CLOUD_NAME) { setUploadError("Cloudinary not configured."); return; }
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "prashanthi_unsigned");
      formData.append("folder", "prashanthi/gallery/" + newPhoto.category.toLowerCase().replace(/\s+/g, "-"));
      const res = await fetch("https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/image/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) { setUploadError(data.error.message); setUploading(false); return; }
      await supabase.from("gallery_items").insert({
        url: data.secure_url,
        public_id: data.public_id,
        title: newPhoto.title,
        category: newPhoto.category,
        source: "cloudinary",
      });
      setNewPhoto({ title: "", category: galleryCategories[0] });
      setPreviewUrl(null);
      setSelectedFile(null);
      setShowUpload(false);
      fetchItems();
    } catch (err) {
      setUploadError("Upload failed. Check your internet connection.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.youtubeUrl) return;
    const videoId = extractYouTubeId(newVideo.youtubeUrl);
    if (!videoId) { setUploadError("Invalid YouTube URL. Please paste a valid YouTube link."); return; }
    setUploading(true);
    setUploadError("");
    try {
      await supabase.from("gallery_items").insert({
        url: newVideo.youtubeUrl,
        public_id: videoId,
        title: newVideo.title,
        category: newVideo.category,
        source: "youtube",
      });
      setNewVideo({ title: "", category: galleryCategories[0], youtubeUrl: "" });
      setVideoPreviewId(null);
      setShowUpload(false);
      fetchItems();
    } catch (err) {
      setUploadError("Failed to save video. Try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUrlChange = (url: string) => {
    setNewVideo({ ...newVideo, youtubeUrl: url });
    const vid = extractYouTubeId(url);
    setVideoPreviewId(vid);
    setUploadError("");
  };

  const resetForm = () => {
    setShowUpload(false);
    setPreviewUrl(null);
    setSelectedFile(null);
    setVideoPreviewId(null);
    setUploadError("");
    setNewPhoto({ title: "", category: galleryCategories[0] });
    setNewVideo({ title: "", category: galleryCategories[0], youtubeUrl: "" });
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Gallery Manager</h1>
        <button onClick={() => { setShowUpload(!showUpload); if (showUpload) resetForm(); }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPlus className="w-4 h-4" /><span className="hidden sm:inline">Add</span></button>
      </header>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {showUpload && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            {/* Tab: Photo or Video */}
            <div className="flex gap-2 mb-5">
              <button onClick={() => { setUploadMode("photo"); setUploadError(""); }} className={"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition " + (uploadMode === "photo" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}><FiImage className="w-4 h-4" /> Upload Photo</button>
              <button onClick={() => { setUploadMode("video"); setUploadError(""); }} className={"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition " + (uploadMode === "video" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}><FiYoutube className="w-4 h-4" /> Add YouTube Video</button>
            </div>

            {uploadMode === "photo" ? (
              <form onSubmit={handlePhotoUpload} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" required value={newPhoto.title} onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Photo title" />
                  <select value={newPhoto.category} onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">
                    {galleryCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
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
                  <button type="submit" disabled={!selectedFile || uploading} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center gap-2">{uploading ? <><FiLoader className="w-4 h-4 animate-spin" /> Uploading...</> : <><FiUploadCloud className="w-4 h-4" /> Upload</>}</button>
                  <button type="button" onClick={resetForm} className="text-sm text-gray-500">Cancel</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVideoAdd} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" required value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Video title" />
                  <select value={newVideo.category} onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">
                    {galleryCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <input type="url" required value={newVideo.youtubeUrl} onChange={(e) => handleVideoUrlChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Paste YouTube URL (e.g. https://www.youtube.com/watch?v=...)" />
                </div>
                {videoPreviewId && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-sm">
                    <Image src={getYouTubeThumbnail(videoPreviewId)} alt="Video thumbnail" width={480} height={360} className="w-full h-auto" />
                    <p className="text-xs text-gray-400 text-center py-1">Thumbnail preview</p>
                  </div>
                )}
                {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
                <div className="flex gap-3">
                  <button type="submit" disabled={!newVideo.youtubeUrl || uploading} className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 flex items-center gap-2">{uploading ? <><FiLoader className="w-4 h-4 animate-spin" /> Saving...</> : <><FiYoutube className="w-4 h-4" /> Add Video</>}</button>
                  <button type="button" onClick={resetForm} className="text-sm text-gray-500">Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filter by type */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {([["all", "All"], ["photos", "Photos"], ["videos", "Videos"]] as [FilterType, string][]).map(([val, label]) => (
              <button key={val} onClick={() => setFilterType(val)} className={"px-3 py-1.5 rounded-md text-xs font-semibold transition " + (filterType === val ? "bg-white text-accent shadow-sm" : "text-gray-500 hover:text-gray-700")}>{label}</button>
            ))}
          </div>
          <span className="text-xs text-gray-400">{photoCount} photos · {videoCount} videos</span>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">{allCategories.map((cat) => <button key={cat} onClick={() => setActiveCategory(cat)} className={"px-4 py-2 rounded-full text-sm font-medium transition " + (activeCategory === cat ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50")}>{cat} ({cat === "All" ? items.length : items.filter((p) => p.category === cat).length})</button>)}</div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item) => (
            <div key={item.id} className="relative group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
              <div className="aspect-[4/3] relative">
                {isVideo(item) ? (
                  <>
                    <Image src={getYouTubeThumbnail(item.public_id || "")} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <Image src={item.url} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                )}
              </div>
              <div className="p-2 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-accent truncate">{item.title}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-[10px] text-gray-400">{item.category}</p>
                    {isVideo(item) && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">Video</span>}
                  </div>
                </div>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0"><FiTrash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <FiUploadCloud className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No items yet.</p>
            <p className="text-sm mt-1">Upload photos or add YouTube videos to show in the public Gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
}
