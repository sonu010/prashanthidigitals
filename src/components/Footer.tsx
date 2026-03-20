import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-accent text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              Prashanthi Digital Studio
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              20+ years of capturing life&apos;s most precious moments. Professional
              photography, videography & LED wall rental services in Hyderabad.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary transition">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary transition">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-primary transition">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919948670396"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-green-500 transition"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/led-walls", label: "LED Wall Rental" },
                { href: "/gallery", label: "Portfolio" },
                { href: "/packages", label: "Packages & Pricing" },
                { href: "/book", label: "Book an Event" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-3">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Wedding Photography</li>
              <li>Pre-Wedding Shoots</li>
              <li>Birthday Photography</li>
              <li>Corporate Events</li>
              <li>LED Wall Rental</li>
              <li>Videography</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                    <FiMapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <a
                        href="https://maps.app.goo.gl/ZwT1KoAyuwmhubEE8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        Nacharam, Hyderabad, Telangana, India
                    </a>
                </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 shrink-0" />
                <a href="tel:+919948670396" className="hover:text-white">
                  +91 9948670396
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4 shrink-0" />
                <a href="mailto:prashanthistudio@gmail.com" className="hover:text-white">
                  prashanthistudio@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Prashanthi Digital Studio. All Rights Reserved.</p>
          <Link href="/admin" className="hover:text-white transition">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
