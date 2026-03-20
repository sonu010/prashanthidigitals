import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { Metadata } from "next";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { cloudinaryUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Services | Prashanthi Digital Studio",
  description:
    "Professional photography, videography & LED wall rental services for weddings, birthdays, corporate events in Hyderabad.",
};

const photographyServices = [
  {
    title: "Wedding Photography",
    desc: "Full-day or multi-day coverage of wedding functions including candid and traditional styles.",
    image: cloudinaryUrl("prashanthi/gallery/wedding/cp100199", 400),
  },
  {
    title: "Pre-Wedding Shoot",
    desc: "Couple photoshoots at stunning outdoor/indoor locations before the wedding day.",
    image: cloudinaryUrl("prashanthi/gallery/prewedding/cp101404", 400),
  },
  {
    title: "Engagement Photography",
    desc: "Coverage of ring ceremony and engagement events with candid and posed shots.",
    image: cloudinaryUrl("prashanthi/gallery/wedding/cp109196", 400),
  },
  {
    title: "Birthday Photography",
    desc: "Kids and adults birthday events — from cake smash to milestone celebrations.",
    image: cloudinaryUrl("prashanthi/gallery/baby-birthday/056a5957", 400),
  },
  {
    title: "Maternity Shoot",
    desc: "Beautiful maternity photography for expecting mothers in studio or outdoor settings.",
    image: cloudinaryUrl("prashanthi/gallery/prewedding/cp101553", 400),
  },
  {
    title: "Baby / Newborn Photography",
    desc: "Studio or home-based shoots for newborns and infants with adorable setups.",
    image: cloudinaryUrl("prashanthi/gallery/cradle-ceremony/dsc06501", 400),
  },
  {
    title: "Religious Ceremonies",
    desc: "Upanayanam, Naming Ceremony, Griha Pravesh, Seemantham & temple events.",
    image: cloudinaryUrl("prashanthi/gallery/mangala-snanam/056a8555", 400),
  },
  {
    title: "Corporate Event Photography",
    desc: "Professional coverage for conferences, seminars, product launches & corporate parties.",
    image: cloudinaryUrl("prashanthi/gallery/reception/reception-1", 400),
  },
  {
    title: "Fashion & Portfolio Shoots",
    desc: "Individual or group fashion photography sessions for models and professionals.",
    image: cloudinaryUrl("prashanthi/gallery/haldi/dsc00032", 400),
  },
];

const videographyServices = [
  {
    title: "Cinematic Wedding Film",
    desc: "Beautiful cinematic coverage of your entire wedding — capturing every emotion.",
  },
  {
    title: "Highlight Reels",
    desc: "Short 3-5 minute wedding highlight videos perfect for sharing on social media.",
  },
  {
    title: "Pre-Wedding Video",
    desc: "Creative pre-wedding videos at scenic locations with music and storytelling.",
  },
  {
    title: "Event Recording",
    desc: "Full event recording for baby showers, naming ceremonies & family functions.",
  },
  {
    title: "Corporate Videography",
    desc: "Professional video coverage for corporate events, seminars & product launches.",
  },
  {
    title: "Live Event Recording",
    desc: "Multi-camera live event recording for large functions and ceremonies.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-accent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">
            What We Do
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            From capturing precious moments to creating spectacular visual experiences —
            we offer a complete range of photography, videography & LED wall services.
          </p>
        </div>
      </section>

      {/* Photography Services */}
      <FadeInOnScroll>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
              📸 Photography Services
            </h2>
            <p className="text-gray-500">
              Professional photography for every occasion
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographyServices.map((service) => (
              <div
                key={service.title}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-accent text-base mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* Videography Services */}
      <FadeInOnScroll>
      <section className="py-16 md:py-24 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-2">
              🎬 Videography Services
            </h2>
            <p className="text-gray-500">
              Cinematic films and professional video coverage
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videographyServices.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-accent text-base mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeInOnScroll>

      {/* LED Wall CTA */}
      <section className="py-16 md:py-24 bg-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🖥️ LED Wall Rental Services
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Looking for LED screens for your event? We offer premium Jona LED walls
            (8ft × 12ft) for weddings, corporate events, and more. Visit our dedicated
            LED Wall page for specs, pricing, and booking.
          </p>
          <Link
            href="/led-walls"
            className="inline-flex items-center gap-2 bg-secondary text-accent px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
          >
            View LED Wall Services <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Book CTA */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-white/80 mb-6">
            We offer flexible combo packages — Photography + Videography + LED Wall.
            Contact us for a personalized quote!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/packages"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              View Packages
            </Link>
            <Link
              href="/book"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
