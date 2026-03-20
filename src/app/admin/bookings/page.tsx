"use client";
import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiSearch, FiFilter } from "react-icons/fi";

const allBookings = [
  { id: 1, name: "Ramesh Reddy", phone: "+91 98765 11111", eventType: "Wedding", eventDate: "2026-04-15", venue: "Golconda Resorts", services: ["Photography", "Videography", "LED Wall"], status: "New", createdAt: "2026-03-18" },
  { id: 2, name: "Priya Sharma", phone: "+91 98765 22222", eventType: "Birthday", eventDate: "2026-03-25", venue: "Home, Nacharam", services: ["Photography"], status: "Contacted", createdAt: "2026-03-17" },
  { id: 3, name: "Sunil Kumar", phone: "+91 98765 33333", eventType: "Corporate", eventDate: "2026-04-02", venue: "HICC Centre", services: ["Photography", "LED Wall"], status: "Confirmed", createdAt: "2026-03-16" },
  { id: 4, name: "Lakshmi & Venkat", phone: "+91 98765 44444", eventType: "Engagement", eventDate: "2026-04-10", venue: "Sri Lakshmi Hall", services: ["Photography", "Videography"], status: "Quote Sent", createdAt: "2026-03-15" },
  { id: 5, name: "Arun Reddy", phone: "+91 98765 55555", eventType: "Pre-Wedding", eventDate: "2026-04-20", venue: "Ramoji Film City", services: ["Photography"], status: "Confirmed", createdAt: "2026-03-14" },
  { id: 6, name: "Kavitha Devi", phone: "+91 98765 66666", eventType: "Naming Ceremony", eventDate: "2026-03-30", venue: "Home, Uppal", services: ["Photography", "Videography"], status: "Completed", createdAt: "2026-03-10" },
];

const statuses = ["All", "New", "Contacted", "Quote Sent", "Confirmed", "Completed", "Cancelled"];
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  "Quote Sent": "bg-purple-100 text-purple-800",
  Confirmed: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState(allBookings);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = bookings.filter((b) => {
    if (filterStatus !== "All" && b.status !== filterStatus) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.phone.includes(search)) return false;
    return true;
  });

  const updateStatus = (id: number, newStatus: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  return (
    <div>
      <header className="bg-white shadow-sm px-4 sm:px-6 py-4 sticky top-0 z-30">
        <h1 className="text-lg font-bold text-accent">📅 All Bookings</h1>
      </header>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 flex-1 min-w-[200px]">
            <FiSearch className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm outline-none bg-transparent w-full"
            />
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm outline-none bg-transparent"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bookings Cards (Mobile-friendly) */}
        <div className="space-y-3">
          {filtered.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-accent text-sm">{booking.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{booking.phone}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                    <span>📅 {booking.eventType} — {booking.eventDate}</span>
                    <span>📍 {booking.venue}</span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {booking.services.map((s) => (
                      <span key={s} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-primary"
                  >
                    {statuses.filter((s) => s !== "All").map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                <a
                  href={`tel:${booking.phone}`}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  📞 Call
                </a>
                <a
                  href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 font-medium hover:underline"
                >
                  💬 WhatsApp
                </a>
                <Link
                  href={`/admin/invoices`}
                  className="text-xs text-purple-600 font-medium hover:underline"
                >
                  🧾 Create Invoice
                </Link>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p>No bookings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
