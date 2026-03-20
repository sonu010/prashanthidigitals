import Image from "next/image";
import Link from "next/link";
import { FiCamera, FiAward, FiUsers, FiHeart, FiArrowRight } from "react-icons/fi";
import type { Metadata } from "next";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { cloudinaryUrl, siteImages } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "About Us | Prashanthi Digital Studio",
  description:
    "Learn about Prashanthi Digital Studio - 20+ years of professional photography, videography & LED wall services in Nacharam, Hyderabad.",
};

const stats = [
  { icon: <FiCamera className="w-6 h-6" />, number: "20+", label: "Years Experience" },
  { icon: <FiUsers className="w-6 h-6" />, number: "5000+", label: "Happy Clients" },
  { icon: <FiHeart className="w-6 h-6" />, number: "3000+", label: "Events Covered" },
  { icon: <FiAward className="w-6 h-6" />, number: "2", label: "LED Screens" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Our Story
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            About Prashanthi Studio
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Two decades of preserving memories, capturing emotions, and delivering
            excellence in photography and event services.
          </p>
        </div>
      </section>

      {/* Owner / Story Section */}
      <FadeInOnScroll>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={cloudinaryUrl(siteImages.owner, 500)}
                  alt="Lead Photographer - Prashanthi Digital Studio"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-secondary text-accent py-3 px-6 rounded-xl shadow-lg">
                  <span className="text-2xl font-bold">Since</span>
                  <span className="block text-xs font-semibold">2003</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
                The Man Behind the Lens
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                With a camera in hand and a vision in mind, the founder of Prashanthi
                Digital Studio started his journey in photography over 20 years ago in
                Nacharam, Hyderabad. What began as a small studio has grown into one of
                the most trusted names for event photography and LED wall services in
                the area.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Having covered thousands of weddings, family celebrations, corporate
                events, and religious ceremonies, he brings a unique blend of traditional
                values and modern techniques to every shoot. His specialty lies in
                understanding the emotions of the moment and capturing them authentically.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                In addition to photography and videography, Prashanthi Studio now also
                offers premium LED wall rental services — bringing large-screen visual
                experiences to weddings, corporate events, and public gatherings across
                Hyderabad.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Explore Our Services <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* Stats */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-white/80 flex justify-center mb-2">{stat.icon}</div>
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.number}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <FadeInOnScroll>
      <section className="py-16 md:py-24 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-3">
              Why Choose Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "20+ Years of Trust",
                desc: "Two decades of consistent quality and professionalism have earned us the trust of thousands of families in Hyderabad.",
              },
              {
                title: "Modern Equipment",
                desc: "We use the latest cameras, lighting, drones, and Jona LED technology to deliver stunning results.",
              },
              {
                title: "Affordable Pricing",
                desc: "Quality services at competitive prices. We offer flexible packages to suit every budget.",
              },
              {
                title: "On-Time Delivery",
                desc: "We understand the excitement of seeing your photos. Quick turnaround times guaranteed.",
              },
              {
                title: "Personalized Service",
                desc: "Every event is unique. We work closely with you to understand your vision and deliver beyond expectations.",
              },
              {
                title: "End-to-End Solutions",
                desc: "From photography to videography to LED walls — get everything you need from one trusted provider.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-bold text-accent mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* Studio Photos */}
      <FadeInOnScroll>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-3">
              Our Studio
            </h2>
            <p className="text-gray-500">Visit us at Nacharam, Hyderabad</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: cloudinaryUrl("prashanthi/gallery/wedding/cp108787", 600), alt: "Wedding photography at Prashanthi Studio" },
              { src: cloudinaryUrl("prashanthi/gallery/reception/reception-50", 600), alt: "Reception event coverage" },
              { src: cloudinaryUrl("prashanthi/gallery/prewedding/cp101427", 600), alt: "Pre-wedding shoot" },
            ].map((photo, i) => (
              <div key={i} className="aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* CTA */}
      <section className="bg-accent py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Let&apos;s Create Beautiful Memories Together
          </h2>
          <p className="text-gray-300 mb-6">
            Book your event today and experience the Prashanthi difference.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition"
          >
            Book Your Event <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
