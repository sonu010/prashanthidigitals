"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919948670396?text=Hi%2C%20I%20am%20interested%20in%20your%20photography%20%2F%20LED%20wall%20services.%20Please%20share%20more%20details."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce"
      aria-label="Chat on WhatsApp"
      style={{ animationDuration: "2s", animationIterationCount: "3" }}
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}
