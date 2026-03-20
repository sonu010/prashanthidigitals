import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import type { Metadata } from "next";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { cloudinaryUrl, siteImages } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "LED Wall Rental | Prashanthi Digital Studio",
  description:
    "Premium Jona LED wall rental for weddings, corporate events & functions in Hyderabad. 8ft x 12ft screens. Indoor & outdoor. Book now!",
};

const useCases = [
  "Wedding ceremony backdrop — live display of couple photos/videos",
  "Stage background for large functions",
  "Slideshow of photos/memories at receptions",
  "Live streaming projection in large venues",
  "Corporate presentations and digital signage",
  "Political campaigns and public announcements",
  "College fests and stage performances",
  "DJ & dance events backdrop",
];

const faqs = [
  {
    q: "What size LED screens do you have?",
    a: "We have 2 LED screens, each measuring 8ft × 12ft. Each screen can be split into two panels of 6ft × 8ft for smaller setups.",
  },
  {
    q: "Can the screens be used outdoors?",
    a: "Yes! Our Jona LED screens are suitable for both indoor and outdoor events. They have high brightness for outdoor visibility.",
  },
  {
    q: "What is included in the rental?",
    a: "The rental includes the LED screen, setup & dismantling at your venue, and basic technical support. An operator can be arranged if needed.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 1-2 weeks in advance, especially during wedding season (October-February). For peak dates, book even earlier.",
  },
  {
    q: "What content can be displayed?",
    a: "You can display photos, videos, live camera feed, presentations, slideshows, social media walls — virtually any digital content.",
  },
  {
    q: "Do you provide content creation?",
    a: "Yes, we can help create photo/video slideshows and montages for your event. This can be combined with our photography service.",
  },
];

export default function LEDWallPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
                LED Wall Rental
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Premium LED Screens for Every Event
              </h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Make your event visually spectacular with our high-quality Jona LED screens.
                Perfect for weddings, corporate events, college fests, and public gatherings.
              </p>
              <Link
                href="/book?service=led-wall"
                className="inline-flex items-center gap-2 bg-secondary text-accent px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
              >
                Get a Quote <FiArrowRight />
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src={cloudinaryUrl(siteImages.ledWall, 600)}
                alt="LED Wall at event"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <FadeInOnScroll>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
              Screen Specifications
            </h2>
            <p className="text-gray-500">Premium Jona LED Technology</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Number of Screens", value: "2 Units" },
              { label: "Full Screen Size", value: "8ft × 12ft each" },
              { label: "Split Configuration", value: "6ft × 8ft (each half)" },
              { label: "Technology", value: "Jona LED Series" },
              { label: "Indoor/Outdoor", value: "Both supported" },
              { label: "Setup Included", value: "Yes — setup & dismantle" },
            ].map((spec) => (
              <div
                key={spec.label}
                className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm"
              >
                <p className="text-primary font-bold text-xl mb-1">{spec.value}</p>
                <p className="text-gray-500 text-sm">{spec.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
              Perfect For
            </h2>
            <p className="text-gray-500">LED walls enhance any event</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {useCases.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <FiCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <FadeInOnScroll>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
              LED Walls in Action
            </h2>
            <p className="text-gray-500">Photos from our past events</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: cloudinaryUrl("prashanthi/led-walls/ledwalls", 600), alt: "LED Wall Setup" },
              { src: cloudinaryUrl("prashanthi/gallery/wedding/cp100199", 600), alt: "LED Wall at Wedding" },
              { src: cloudinaryUrl("prashanthi/gallery/reception/reception-1", 600), alt: "LED Wall at Reception" },
              { src: cloudinaryUrl("prashanthi/gallery/reception/reception-50", 600), alt: "Event LED Display" },
              { src: cloudinaryUrl("prashanthi/gallery/wedding/cp108812", 600), alt: "Stage LED Wall" },
              { src: cloudinaryUrl("prashanthi/gallery/reception/reception-75", 600), alt: "LED Wall Event" },
            ].map((photo, i) => (
              <div
                key={i}
                className="aspect-[4/3] relative rounded-xl overflow-hidden group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* Pricing Overview */}
      <section className="py-16 md:py-24 bg-accent text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Rental Pricing</h2>
            <p className="text-gray-300">
              Flexible pricing based on duration and configuration
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                duration: "4 Hours",
                price: "Contact for Price",
                features: [
                  "1 LED Screen (8×12 ft)",
                  "Setup & Dismantle",
                  "Basic Support",
                ],
              },
              {
                duration: "8 Hours",
                price: "Contact for Price",
                popular: true,
                features: [
                  "1-2 LED Screens",
                  "Setup & Dismantle",
                  "Dedicated Operator",
                  "Content Support",
                ],
              },
              {
                duration: "Full Day",
                price: "Contact for Price",
                features: [
                  "1-2 LED Screens",
                  "Setup & Dismantle",
                  "Dedicated Operator",
                  "Content Creation",
                  "Multi-location setup",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.duration}
                className={`rounded-xl p-6 ${
                  plan.popular
                    ? "bg-secondary text-accent ring-4 ring-yellow-300"
                    : "bg-white/10"
                }`}
              >
                {plan.popular && (
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mt-2 mb-1">{plan.duration}</h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.popular ? "text-accent/70" : "text-gray-400"
                  }`}
                >
                  {plan.price}
                </p>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <FiCheck className="w-4 h-4 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book?service=led-wall"
                  className={`mt-6 block text-center py-2.5 rounded-lg font-semibold text-sm transition ${
                    plan.popular
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-white text-accent hover:bg-gray-100"
                  }`}
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
              >
                <h3 className="font-bold text-accent text-sm mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Book LED Walls for Your Event?
          </h2>
          <p className="text-white/80 mb-6">
            Get a free quote today. We&apos;ll help you choose the right configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book?service=led-wall"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Book LED Wall
            </Link>
            <a
              href="https://wa.me/919948670396?text=Hi%2C%20I%20need%20LED%20wall%20for%20my%20event.%20Please%20share%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
