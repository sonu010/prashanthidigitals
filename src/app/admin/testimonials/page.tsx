"use client";
import { useState, useEffect, useCallback } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiStar, FiEye, FiEyeOff } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

interface Testimonial { id: string; client_name: string; event_type: string; rating: number; review: string; is_visible: boolean; }

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ client_name: "", event_type: "", rating: 5, review: "", is_visible: true });

  const fetchTestimonials = useCallback(async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const row = { client_name: form.client_name, event_type: form.event_type, rating: form.rating, review: form.review, is_visible: form.is_visible };
    if (editingId) {
      await supabase.from("testimonials").update(row).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("testimonials").insert(row);
    }
    setForm({ client_name: "", event_type: "", rating: 5, review: "", is_visible: true });
    setShowForm(false);
    setSaving(false);
    fetchTestimonials();
  };

  const handleEdit = (t: Testimonial) => {
    setForm({ client_name: t.client_name, event_type: t.event_type, rating: t.rating, review: t.review, is_visible: t.is_visible });
    setEditingId(t.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await supabase.from("testimonials").delete().eq("id", id);
      fetchTestimonials();
    }
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_visible: !current }).eq("id", id);
    fetchTestimonials();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Testimonials</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ client_name: "", event_type: "", rating: 5, review: "", is_visible: true }); }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPlus className="w-4 h-4" /><span className="hidden sm:inline">Add</span></button>
      </header>
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h3 className="font-bold text-accent mb-4">{editingId ? "Edit" : "Add"} Testimonial</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Customer Name" />
                <input type="text" required value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Event Type" />
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Rating</label><div className="flex gap-1">{[1,2,3,4,5].map((star) => <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}><FiStar className={"w-6 h-6 " + (star <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} /></button>)}</div></div>
              <textarea rows={3} required value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Customer review..." />
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} className="rounded" /><label className="text-sm text-gray-600">Visible on website</label></div>
              <div className="flex gap-3"><button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : editingId ? "Update" : "Add"}</button><button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="text-sm text-gray-500">Cancel</button></div>
            </form>
          </div>
        )}
        <div className="space-y-3">
          {testimonials.length === 0 && <div className="text-center py-20 text-gray-400"><p>No testimonials yet. Add your first customer review!</p></div>}
          {testimonials.map((t) => (
            <div key={t.id} className={"bg-white rounded-xl border p-4 shadow-sm " + (t.is_visible ? "border-gray-100" : "border-orange-200 bg-orange-50/30")}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                    {!t.is_visible && <span className="text-xs text-orange-500 font-medium">Hidden</span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">&ldquo;{t.review}&rdquo;</p>
                  <p className="text-sm font-semibold text-accent">{t.client_name}</p>
                  <p className="text-xs text-gray-400">{t.event_type}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => toggleVisibility(t.id, t.is_visible)} className="p-1.5 text-gray-400 hover:text-primary rounded-lg" title={t.is_visible ? "Hide" : "Show"}>{t.is_visible ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}</button>
                  <button onClick={() => handleEdit(t)} className="p-1.5 text-gray-400 hover:text-primary rounded-lg"><FiEdit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"><FiTrash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
