"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiFilter, FiPlus, FiTrash2 } from "react-icons/fi";

interface Booking {
  id: number;
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  services: string[];
  status: string;
  createdAt: string;
}

const STORAGE_KEY = "prashanthi_bookings";
const statuses = ["All", "New", "Contacted", "Quote Sent", "Confirmed", "Completed", "Cancelled"];
const statusColors: Record<string, string> = { New: "bg-blue-100 text-blue-800", Contacted: "bg-yellow-100 text-yellow-800", "Quote Sent": "bg-purple-100 text-purple-800", Confirmed: "bg-green-100 text-green-800", Completed: "bg-gray-100 text-gray-800", Cancelled: "bg-red-100 text-red-800" };

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", eventType: "Wedding", eventDate: "", venue: "", services: ["Photography"], status: "New" });

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); if (s) setBookings(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings)); }, [bookings]);

  const filtered = bookings.filter((b) => (filterStatus === "All" || b.status === filterStatus) && (!search || b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search)));

  const updateStatus = (id: number, newStatus: string) => setBookings((p) => p.map((b) => b.id === id ? { ...b, status: newStatus } : b));
  const deleteBooking = (id: number) => { if (confirm("Delete this booking?")) setBookings((p) => p.filter((b) => b.id !== id)); };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setBookings((p) => [...p, { ...form, id: Date.now(), services: form.services, createdAt: new Date().toISOString().split("T")[0] }]);
    setForm({ name: "", phone: "", eventType: "Wedding", eventDate: "", venue: "", services: ["Photography"], status: "New" });
    setShowForm(false);
  };

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
                <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Customer Name" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                <input type="tel" required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                <select value={form.eventType} onChange={(e) => setForm({...form, eventType: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"><option>Wedding</option><option>Birthday</option><option>Pre-Wedding</option><option>Corporate</option><option>Engagement</option><option>Naming Ceremony</option><option>LED Wall</option><option>Other</option></select>
                <input type="date" required value={form.eventDate} onChange={(e) => setForm({...form, eventDate: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
                <input type="text" value={form.venue} onChange={(e) => setForm({...form, venue: e.target.value})} placeholder="Venue" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="flex gap-3"><button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold">Save</button><button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500">Cancel</button></div>
            </form>
          </div>
        )}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 flex-1 min-w-[200px]"><FiSearch className="w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="text-sm outline-none bg-transparent w-full" /></div>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2"><FiFilter className="w-4 h-4 text-gray-400" /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm outline-none bg-transparent">{statuses.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
        </div>
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1"><h3 className="font-semibold text-accent text-sm">{b.name}</h3><span className={"px-2 py-0.5 rounded-full text-xs font-medium " + (statusColors[b.status] || "bg-gray-100")}>{b.status}</span></div>
                  <p className="text-xs text-gray-500">{b.phone}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500"><span>{b.eventType} - {b.eventDate}</span>{b.venue && <span>{b.venue}</span>}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)} className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 outline-none">{statuses.filter((s) => s !== "All").map((s) => <option key={s} value={s}>{s}</option>)}</select>
                  <button onClick={() => deleteBooking(b.id)} className="p-1.5 text-gray-400 hover:text-red-500"><FiTrash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                <a href={"tel:" + b.phone} className="text-xs text-primary font-medium hover:underline">Call</a>
                <a href={"https://wa.me/" + b.phone.replace(/[^0-9]/g, "")} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 font-medium hover:underline">WhatsApp</a>
                <Link href="/admin/invoices" className="text-xs text-purple-600 font-medium hover:underline">Create Invoice</Link>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center py-20 text-gray-400"><p>No bookings yet. Add your first booking!</p></div>}
        </div>
      </div>
    </div>
  );
}
