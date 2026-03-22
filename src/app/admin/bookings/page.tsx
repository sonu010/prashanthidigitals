"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiSearch, FiFilter, FiPlus, FiTrash2 } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { eventCategories } from "@/lib/eventCategories";
import PhoneInput from "@/components/PhoneInput";

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  event_type: string;
  event_date: string;
  event_location: string;
  services: string[];
  status: string;
  created_at: string;
}

const statuses = ["All", "pending", "confirmed", "completed", "cancelled"];
const statusLabels: Record<string, string> = { pending: "Pending", confirmed: "Confirmed", completed: "Completed", cancelled: "Cancelled" };
const statusColors: Record<string, string> = { pending: "bg-yellow-100 text-yellow-800", confirmed: "bg-green-100 text-green-800", completed: "bg-gray-100 text-gray-800", cancelled: "bg-red-100 text-red-800" };

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ customer_name: "", customer_phone: "", event_type: "", event_date: "", event_location: "", services: ["Photography"], status: "pending" });

  const fetchBookings = useCallback(async () => {
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (data) setBookings(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const filtered = bookings.filter((b) => (filterStatus === "All" || b.status === filterStatus) && (!search || b.customer_name.toLowerCase().includes(search.toLowerCase()) || b.customer_phone.includes(search)));

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    if (confirm("Delete this booking?")) {
      await supabase.from("bookings").delete().eq("id", id);
      fetchBookings();
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("bookings").insert({
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      event_type: form.event_type,
      event_date: form.event_date,
      event_location: form.event_location,
      services: form.services,
      status: form.status,
    });
    setForm({ customer_name: "", customer_phone: "", event_type: "", event_date: "", event_location: "", services: ["Photography"], status: "pending" });
    setShowForm(false);
    setSaving(false);
    fetchBookings();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">All Bookings</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark transition"><FiPlus className="w-4 h-4" /><span className="hidden sm:inline">Add</span></button>
      </header>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <h3 className="font-bold text-accent mb-4">Add Booking</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" required value={form.customer_name} onChange={(e) => setForm({...form, customer_name: e.target.value})} placeholder="Customer Name" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                <PhoneInput value={form.customer_phone} onChange={(v) => setForm({...form, customer_phone: v})} required placeholder="9988776655" />
                <select value={form.event_type} onChange={(e) => setForm({...form, event_type: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option value="">Select event type</option>
                  {eventCategories.map((cat) => (
                    <optgroup key={cat.value} label={cat.label}>
                      {cat.subTypes.map((sub) => <option key={sub.value} value={sub.value}>{sub.label}</option>)}
                    </optgroup>
                  ))}
                </select>
                <input type="date" required value={form.event_date} onChange={(e) => setForm({...form, event_date: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                <input type="text" value={form.event_location} onChange={(e) => setForm({...form, event_location: e.target.value})} placeholder="Venue" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="flex gap-3"><button type="submit" disabled={saving} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">{saving ? "Saving..." : "Save"}</button><button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500">Cancel</button></div>
            </form>
          </div>
        )}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 flex-1 min-w-[200px]"><FiSearch className="w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="text-sm outline-none bg-transparent w-full" /></div>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2"><FiFilter className="w-4 h-4 text-gray-400" /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm outline-none bg-transparent"><option value="All">All</option>{statuses.filter(s => s !== "All").map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></div>
        </div>
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1"><h3 className="font-semibold text-accent text-sm">{b.customer_name}</h3><span className={"px-2 py-0.5 rounded-full text-xs font-medium " + (statusColors[b.status] || "bg-gray-100")}>{statusLabels[b.status] || b.status}</span></div>
                  <p className="text-xs text-gray-500">{b.customer_phone}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500"><span>{b.event_type} - {b.event_date}</span>{b.event_location && <span>{b.event_location}</span>}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)} className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 outline-none">{statuses.filter((s) => s !== "All").map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}</select>
                  <button onClick={() => deleteBooking(b.id)} className="p-1.5 text-gray-400 hover:text-red-500"><FiTrash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                <a href={"tel:" + b.customer_phone} className="text-xs text-primary font-medium hover:underline">Call</a>
                <a href={"https://wa.me/91" + b.customer_phone.replace(/[^0-9]/g, "")} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 font-medium hover:underline">WhatsApp</a>
                <Link href="/admin/invoices" className="text-xs text-purple-600 font-medium hover:underline">Create Invoice</Link>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center py-20 text-gray-400"><p>No bookings yet. Add your first booking or share your booking page!</p></div>}
        </div>
      </div>
    </div>
  );
}
