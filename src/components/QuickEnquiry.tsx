"use client";
import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import PhoneInput from "@/components/PhoneInput";

export default function QuickEnquiry() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    event_type: "",
    event_date: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const { error: insertErr } = await supabase.from("enquiries").insert({
      name: form.name,
      phone: form.phone ? "+91" + form.phone : null,
      event_type: form.event_type || null,
      event_date: form.event_date || null,
      message: form.message || null,
      status: "new",
    });
    setSending(false);
    if (insertErr) {
      setError("Could not send. Please call us directly.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setForm({ name: "", phone: "", event_type: "", event_date: "", message: "" });
    }, 3000);
  };

  return (
    <>
      {/* Floating Enquiry Button — right side, above WhatsApp */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all hover:scale-110"
        aria-label="Quick Enquiry"
      >
        {open ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
      </button>

      {/* Slide-in Form */}
      {open && (
        <div className="fixed bottom-40 right-6 z-50 bg-white rounded-xl shadow-2xl w-[calc(100%-3rem)] max-w-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-3">
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
              {error && (
                <p className="text-xs text-red-500 bg-red-50 rounded px-2 py-1">{error}</p>
              )}
              <input
                type="text"
                placeholder="Your Name *"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <PhoneInput
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                required
                placeholder="9988776655"
              />
              <select
                value={form.event_type}
                onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-600"
              >
                <option value="">Event Type</option>
                <option>Wedding Photography</option>
                <option>Birthday Party</option>
                <option>Pre-Wedding Shoot</option>
                <option>Corporate Event</option>
                <option>Baby Shower</option>
                <option>Engagement</option>
                <option>Drone Photography</option>
                <option>Jimmy Jib Videography</option>
                <option>LED Wall Rental</option>
                <option>Passport / ID Photo</option>
                <option>Other</option>
              </select>
              <input
                type="date"
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-600"
              />
              <textarea
                placeholder="Message (optional)"
                rows={2}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-dark transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? "Sending..." : <><FiSend className="w-4 h-4" /> Send Enquiry</>}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
