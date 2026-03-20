"use client";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";

export default function AdminDashboard() {
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

      {/* Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-accent mb-4">Quick Guide</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <span className="text-lg">📝</span>
            <div>
              <p className="font-medium text-accent">Daily Log</p>
              <p>Record daily events, income, expenses, enquiries and notes. Track your business activities.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">🧾</span>
            <div>
              <p className="font-medium text-accent">Invoices</p>
              <p>Generate professional invoices for customers. Print or save as PDF.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">🖼️</span>
            <div>
              <p className="font-medium text-accent">Gallery Manager</p>
              <p>Upload and manage portfolio photos that appear on the website gallery.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">⭐</span>
            <div>
              <p className="font-medium text-accent">Testimonials</p>
              <p>Add customer reviews that appear on the homepage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
