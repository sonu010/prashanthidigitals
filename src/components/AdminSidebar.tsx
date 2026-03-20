"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuth";
import {
  FiGrid,
  FiCalendar,
  FiFileText,
  FiImage,
  FiDollarSign,
  FiLogOut,
  FiMenu,
  FiX,
  FiBook,
} from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <FiGrid className="w-5 h-5" /> },
  { href: "/admin/bookings", label: "Bookings", icon: <FiCalendar className="w-5 h-5" /> },
  { href: "/admin/daily-log", label: "Daily Log", icon: <FiBook className="w-5 h-5" /> },
  { href: "/admin/invoices", label: "Invoices", icon: <FiDollarSign className="w-5 h-5" /> },
  { href: "/admin/gallery-manager", label: "Gallery", icon: <FiImage className="w-5 h-5" /> },
  { href: "/admin/testimonials", label: "Testimonials", icon: <FiFileText className="w-5 h-5" /> },
];

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-30 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-primary rounded-lg"
            aria-label="Open menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-accent">Admin Panel</h1>
        </div>
        <Link href="/" className="text-xs text-gray-400 hover:text-primary">
          ← Website
        </Link>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-accent text-white transform transition-transform lg:relative lg:translate-x-0 lg:shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Admin Panel</h2>
            <p className="text-xs text-gray-400">Prashanthi Studio</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-400 hover:text-white"
            aria-label="Close menu"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-white/20 text-white font-semibold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
          <hr className="border-white/10 my-4" />
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10 transition text-gray-400"
          >
            <FiLogOut className="w-5 h-5" />
            Back to Website
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-red-500/20 transition text-red-300 w-full text-left"
          >
            <FiLogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
