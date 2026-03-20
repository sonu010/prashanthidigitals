"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/led-walls", label: "LED Walls" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/book", label: "Book Now" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <div className="leading-tight">
              <span className="text-primary font-bold text-sm md:text-base block">
                Prashanthi
              </span>
              <span className="text-[10px] md:text-xs text-gray-500">
                Digital Studio & LED Walls
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  link.label === "Book Now"
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "text-gray-700 hover:text-primary hover:bg-red-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Phone & WhatsApp */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919948670396"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary"
            >
              <FiPhone className="w-4 h-4" />
              <span>+91 9948670396</span>
            </a>
            <a
              href="https://wa.me/919948670396?text=Hi%2C%20I%20am%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 px-3 text-base font-medium border-b border-gray-100 ${
                  link.label === "Book Now"
                    ? "text-primary font-bold"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 pb-2">
              <a
                href="tel:+919948670396"
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <FiPhone className="w-4 h-4" />
                +91 9948670396
              </a>
              <a
                href="https://wa.me/919948670396?text=Hi%2C%20I%20am%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
