"use client";
import Link from "next/link";
import {
  FiCalendar,
} from "react-icons/fi";

// Demo data for bookings
const demoBookings = [
  {
    id: 1,
    name: "Ramesh Reddy",
    phone: "+91 98765 11111",
    eventType: "Wedding",
    eventDate: "2026-04-15",
    venue: "Golconda Resorts, Shamirpet",
    services: ["Photography", "Videography", "LED Wall"],
    status: "New",
    createdAt: "2026-03-18",
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+91 98765 22222",
    eventType: "Birthday",
    eventDate: "2026-03-25",
    venue: "Home, Nacharam",
    services: ["Photography"],
    status: "Contacted",
    createdAt: "2026-03-17",
  },
  {
    id: 3,
    name: "Sunil Kumar",
    phone: "+91 98765 33333",
    eventType: "Corporate Event",
    eventDate: "2026-04-02",
    venue: "HICC Convention Centre",
    services: ["Photography", "LED Wall"],
    status: "Confirmed",
    createdAt: "2026-03-16",
  },
  {
    id: 4,
    name: "Lakshmi & Venkat",
    phone: "+91 98765 44444",
    eventType: "Engagement",
    eventDate: "2026-04-10",
    venue: "Sri Lakshmi Function Hall",
    services: ["Photography", "Videography"],
    status: "Quote Sent",
    createdAt: "2026-03-15",
  },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  "Quote Sent": "bg-purple-100 text-purple-800",
  Confirmed: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const todayBookings = demoBookings.filter((b) => b.status === "New").length;
  const confirmedBookings = demoBookings.filter((b) => b.status === "Confirmed").length;
  const totalBookings = demoBookings.length;

  return (
    <div className="p-4 sm:p-6">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-accent">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiCalendar className="w-4 h-4" />
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "New Enquiries", value: todayBookings, color: "bg-blue-500" },
          { label: "Confirmed", value: confirmedBookings, color: "bg-green-500" },
          { label: "Total Bookings", value: totalBookings, color: "bg-purple-500" },
          { label: "This Month", value: totalBookings, color: "bg-orange-500" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-accent mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <Link
          href="/admin/daily-log"
          className="bg-primary text-white rounded-xl p-4 text-center text-sm font-semibold hover:bg-primary-dark transition"
        >
          📝 Add Daily Log
        </Link>
        <Link
          href="/admin/invoices"
          className="bg-accent text-white rounded-xl p-4 text-center text-sm font-semibold hover:bg-accent/90 transition"
        >
          🧾 Create Invoice
        </Link>
        <Link
          href="/admin/gallery-manager"
          className="bg-green-600 text-white rounded-xl p-4 text-center text-sm font-semibold hover:bg-green-700 transition"
        >
          🖼️ Manage Gallery
        </Link>
        <Link
          href="/admin/testimonials"
          className="bg-yellow-500 text-white rounded-xl p-4 text-center text-sm font-semibold hover:bg-yellow-600 transition"
        >
          ⭐ Testimonials
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-accent">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-primary text-sm font-semibold">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Event</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {demoBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-accent">{booking.name}</p>
                    <p className="text-xs text-gray-400">{booking.phone}</p>
                    <p className="text-xs text-gray-400 sm:hidden">
                      {booking.eventType} • {booking.eventDate}
                    </p>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell text-gray-600">
                    {booking.eventType}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-gray-600">
                    {booking.eventDate}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[booking.status] || "bg-gray-100"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <a
                      href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 text-xs font-medium hover:underline"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
