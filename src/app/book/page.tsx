"use client";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

const eventTypes = [
  "Wedding",
  "Birthday",
  "Pre-Wedding",
  "Engagement",
  "Corporate Event",
  "Religious Ceremony",
  "LED Wall Only",
  "Combo Package",
  "Other",
];

const budgetRanges = [
  "Under ₹10,000",
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000+",
  "Flexible / Not Sure",
];

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    venue: "",
    city: "Hyderabad",
    services: [] as string[],
    days: "1",
    guestCount: "",
    budget: "",
    notes: "",
  });

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: Send to API endpoint which stores in DB & sends notifications
    console.log("Booking submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-32">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-green-50 rounded-2xl p-10">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-accent mb-3">
              Booking Request Sent!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your enquiry. We&apos;ll contact you shortly on your phone
              number to confirm the details and availability.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/919948670396?text=Hi%2C%20I%20just%20submitted%20a%20booking%20request%20on%20your%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Chat on WhatsApp
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    eventType: "",
                    eventDate: "",
                    venue: "",
                    city: "Hyderabad",
                    services: [],
                    days: "1",
                    guestCount: "",
                    budget: "",
                    notes: "",
                  });
                }}
                className="text-primary font-semibold hover:underline"
              >
                Submit Another Booking
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Book Now
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Book Your Event
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Fill in the details below and we&apos;ll get back to you with availability and
            a customized quote.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-accent text-lg mb-4">Personal Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="+91 9988776655"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="your@email.com (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-accent text-lg mb-4">Event Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type *
                  </label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Venue / Location
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Venue name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Hyderabad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Days
                  </label>
                  <select
                    value={formData.days}
                    onChange={(e) =>
                      setFormData({ ...formData, days: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((d) => (
                      <option key={d} value={d}>
                        {d} Day{d > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Approx. Guest Count
                  </label>
                  <input
                    type="text"
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData({ ...formData, guestCount: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="e.g., 200"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-accent text-lg mb-4">Services Required</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Photography", "Videography", "LED Wall", "Combo Package"].map(
                  (service) => (
                    <label
                      key={service}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                        formData.services.includes(service)
                          ? "border-primary bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="text-sm font-medium">{service}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Budget & Notes */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-accent text-lg mb-4">
                Budget & Additional Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range (optional)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes / Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                    placeholder="Tell us about any specific requirements..."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition"
            >
              Submit Booking Request
            </button>
            <p className="text-center text-gray-400 text-xs">
              We&apos;ll contact you within 2-4 hours to confirm availability.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
