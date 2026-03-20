"use client";
import { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

export default function QuickEnquiry() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, send to API
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating Enquiry Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all"
        aria-label="Quick Enquiry"
      >
        {open ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
      </button>

      {/* Slide-in Form */}
      {open && (
        <div className="fixed bottom-20 left-6 z-50 bg-white rounded-xl shadow-2xl w-[calc(100%-3rem)] max-w-sm border border-gray-200 overflow-hidden">
          <div className="bg-primary text-white px-5 py-3">
            <h3 className="font-bold text-base">Quick Enquiry</h3>
            <p className="text-xs opacity-80">We&apos;ll get back to you shortly!</p>
          </div>

          {submitted ? (
            <div className="p-6 text-center">
              <div className="text-green-500 text-4xl mb-2">✓</div>
              <p className="font-semibold text-gray-800">Thank you!</p>
              <p className="text-sm text-gray-500">We&apos;ll contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-600">
                <option value="">Event Type</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Pre-Wedding</option>
                <option>Corporate Event</option>
                <option>LED Wall Only</option>
                <option>Other</option>
              </select>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-600"
              />
              <textarea
                placeholder="Message (optional)"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
