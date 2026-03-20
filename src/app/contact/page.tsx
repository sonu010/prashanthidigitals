"use client";
import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Get in Touch
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions or want to book? Reach out to us via phone, WhatsApp, or the
            form below.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-accent mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FiMapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent text-sm">Address</h3>
                    <p className="text-gray-600 text-sm">
                      Prashanthi Digital Studio
                      <br />
                      Nacharam, Hyderabad
                      <br />
                      Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FiPhone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent text-sm">Phone</h3>
                    <a
                      href="tel:+919948670396"
                      className="text-gray-600 text-sm hover:text-primary"
                    >
                      +91 9948670396
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <FaWhatsapp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent text-sm">WhatsApp</h3>
                    <a
                      href="https://wa.me/919948670396"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-green-600"
                    >
                      +91 9948670396 (Click to chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FiMail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent text-sm">Email</h3>
                    <a
                      href="mailto:prashanthistudio@gmail.com"
                      className="text-gray-600 text-sm hover:text-primary"
                    >
                      prashanthistudio@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FiClock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent text-sm">Working Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Mon - Sat: 9:00 AM - 10:30 PM
                      <br />
                      Sun : 10:00 AM - 10:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-200">
                <GoogleMapEmbed />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold text-accent mb-6">Send us a Message</h2>
              {submitted ? (
                <div className="bg-green-50 rounded-xl p-10 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-accent mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-sm">
                    Thank you! We&apos;ll respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        placeholder="+91 9948670396"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="your@email.com (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option value="">Select a topic</option>
                      <option>Photography Enquiry</option>
                      <option>Videography Enquiry</option>
                      <option>LED Wall Rental</option>
                      <option>Package / Pricing</option>
                      <option>General Question</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                      placeholder="Tell us about your event or enquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
