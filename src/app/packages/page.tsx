import Link from "next/link";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages & Pricing | Prashanthi Digital Studio",
  description:
    "Affordable photography, videography & LED wall rental packages in Hyderabad. Wedding, birthday, corporate event packages available.",
};

const packages = [
  {
    name: "Basic Photography",
    category: "Photography",
    price: "Contact for Price",
    features: [
      "Full-day photography coverage",
      "200+ edited photos",
      "Digital delivery (Google Drive / USB)",
      "Candid + Traditional shots",
    ],
    popular: false,
  },
  {
    name: "Wedding Essential",
    category: "Photography + Videography",
    price: "Contact for Price",
    popular: true,
    features: [
      "Full wedding day photography",
      "Cinematic wedding film",
      "3-5 min highlight reel",
      "500+ edited photos",
      "Digital delivery",
      "1 photo album (50 pages)",
    ],
  },
  {
    name: "Wedding Premium",
    category: "Photography + Video + LED",
    price: "Contact for Price",
    popular: false,
    features: [
      "Multi-day photography coverage",
      "Cinematic film + highlight reel",
      "1 LED Wall (8×12 ft)",
      "1000+ edited photos",
      "Drone photography",
      "2 premium photo albums",
      "Digital delivery + USB",
    ],
  },
  {
    name: "Pre-Wedding Shoot",
    category: "Photography",
    price: "Contact for Price",
    popular: false,
    features: [
      "3-4 hour outdoor/indoor shoot",
      "100+ edited photos",
      "Creative concept planning",
      "2 outfit changes",
      "Digital delivery",
    ],
  },
  {
    name: "Birthday Package",
    category: "Photography + LED Wall",
    price: "Contact for Price",
    popular: false,
    features: [
      "4-hour photography coverage",
      "1 LED Wall display (6×8 ft)",
      "100+ edited photos",
      "Photo slideshow on LED",
      "Digital delivery",
    ],
  },
  {
    name: "LED Wall Only",
    category: "LED Rental",
    price: "Contact for Price",
    popular: false,
    features: [
      "1 or 2 LED screens",
      "Flexible sizes: 8×12 or 6×8 ft",
      "Setup & dismantling",
      "Operator included",
      "4hr / 8hr / Full day options",
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Our Packages
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Packages & Pricing
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose from our carefully curated packages or contact us for a custom quote
            tailored to your event.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-xl p-6 border transition ${
                  pkg.popular
                    ? "border-primary shadow-xl ring-2 ring-primary/20 bg-white"
                    : "border-gray-100 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="mb-4">
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                    {pkg.category}
                  </p>
                  <h3 className="text-lg font-bold text-accent">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-primary mt-2">{pkg.price}</p>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <FiCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition ${
                    pkg.popular
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-100 text-accent hover:bg-primary hover:text-white"
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Don&apos;t see what you&apos;re looking for? We&apos;ll create a package
            tailored to your specific event needs and budget. Just tell us about your
            event and we&apos;ll send you a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition"
            >
              Request Custom Quote <FiArrowRight />
            </Link>
            <a
              href="https://wa.me/919948670396?text=Hi%2C%20I%20need%20a%20custom%20package%20for%20my%20event"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
