"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiStar } from "react-icons/fi";

interface Testimonial { id: number; name: string; event: string; rating: number; text: string; }
const STORAGE_KEY = "prashanthi_testimonials";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", event: "", rating: 5, text: "" });

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setTestimonials(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials)); }, [testimonials]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) { setTestimonials((p) => p.map((t) => t.id === editingId ? { ...form, id: editingId } : t)); setEditingId(null); }
    else { setTestimonials((p) => [...p, { ...form, id: Date.now() }]); }
    setForm({ name: "", event: "", rating: 5, text: "" }); setShowForm(false);
  };
  const handleEdit = (t: Testimonial) => { setForm({ name: t.name, event: t.event, rating: t.rating, text: t.text }); setEditingId(t.id); setShowForm(true); };
  const handleDelete = (id: number) => { if (confirm("Delete this testimonial?")) setTestimonials((p) => p.filter((t) => t.id !== id)); };

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">Testimonials</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: "", event: "", rating: 5, text: "" }); }} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPlus className="w-4 h-4" /><span className="hidden sm:inline">Add</span></button>
      </header>
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h3 className="font-bold text-accent mb-4">{editingId ? "Edit" : "Add"} Testimonial</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Customer Name" />
                <input type="text" required value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Event Type" />
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Rating</label><div className="flex gap-1">{[1,2,3,4,5].map((star) => <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}><FiStar className={"w-6 h-6 " + (star <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} /></button>)}</div></div>
              <textarea rows={3} required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Customer review..." />
              <div className="flex gap-3"><button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold">{editingId ? "Update" : "Add"}</button><button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="text-sm text-gray-500">Cancel</button></div>
            </form>
          </div>
        )}
        <div className="space-y-3">
          {testimonials.length === 0 && <div className="text-center py-20 text-gray-400"><p>No testimonials yet. Add your first customer review!</p></div>}
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex gap-1 mb-1">{Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-sm text-gray-600 mb-2">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-sm font-semibold text-accent">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.event}</p>
                </div>
                <div className="flex gap-1 shrink-0">
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
