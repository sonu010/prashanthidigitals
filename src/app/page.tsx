"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiCamera, FiFilm, FiMonitor, FiStar, FiArrowRight, FiChevronLeft, FiChevronRight, FiSend } from "react-icons/fi";
import { GiDeliveryDrone } from "react-icons/gi";
import { MdOutlineCameraOutdoor } from "react-icons/md";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { cloudinaryUrl, siteImages } from "@/lib/cloudinary";
import { homePageEventTypes } from "@/lib/eventCategories";
import { supabase } from "@/lib/supabase";

const services = [
  {
    icon: FiCamera,
    title: "Photography",
    desc: "Wedding, pre-wedding, birthday, maternity & corporate event photography with 20+ years of expertise.",
    href: "/services",
  },
  {
    icon: FiFilm,
    title: "Videography",
    desc: "Cinematic wedding films, highlight reels, event recording & pre-wedding videos.",
    href: "/services",
  },
  {
    icon: FiMonitor,
    title: "LED Wall Rental",
    desc: "Premium 8ft x 12ft Jona LED screens for weddings, corporate events & stage backdrops.",
    href: "/led-walls",
  },
  {
    icon: GiDeliveryDrone,
    title: "Drone Shooting",
    desc: "Aerial photography & videography for stunning bird's-eye views of weddings, venues & outdoor events.",
    href: "/services",
  },
  {
    icon: MdOutlineCameraOutdoor,
    title: "Jimmy Jib",
    desc: "Smooth, cinematic crane shots for weddings, receptions & stage events using professional Jimmy Jib.",
    href: "/services",
  },
];

interface Testimonial {
  id: string;
  client_name: string;
  event_type: string;
  rating: number;
  review: string;
}

const heroWords = ["Precious Moments", "Wedding Stories", "Celebrations", "Beautiful Memories"];

function useTypewriter(words: string[], typingSpeed = 100, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
          if (charIndex + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setDisplayText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, pauseTime]);

  return displayText;
}

export default function HomePage() {
  const typedText = useTypewriter(heroWords, 80, 2500);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [recentPhotos, setRecentPhotos] = useState<{id: string; url: string; title: string}[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Review form state
  const [reviewForm, setReviewForm] = useState({ client_name: "", event_type: "", rating: 5, review: "" });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    async function loadRecent() {
      try {
        const { data } = await supabase.from("gallery_items").select("id, url, title, source").neq("source", "youtube").order("created_at", { ascending: false }).limit(6);
        if (data) setRecentPhotos(data);
      } catch {}
    }
    async function loadTestimonials() {
      try {
        const { data } = await supabase.from("testimonials").select("id, client_name, event_type, rating, review").eq("is_visible", true).order("created_at", { ascending: false });
        if (data) setTestimonials(data);
      } catch {}
    }
    loadRecent();
    loadTestimonials();
  }, []);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => testimonials.length > 0 ? (prev + 1) % testimonials.length : 0);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => testimonials.length > 0 ? (prev - 1 + testimonials.length) % testimonials.length : 0);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial, testimonials.length]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");
    if (!reviewForm.client_name.trim() || !reviewForm.review.trim()) {
      setReviewError("Please fill in your name and review.");
      return;
    }
    setReviewSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert({
        client_name: reviewForm.client_name.trim(),
        event_type: reviewForm.event_type.trim() || "General",
        rating: reviewForm.rating,
        review: reviewForm.review.trim(),
        is_visible: false,
      });
      if (error) throw error;
      setReviewSubmitted(true);
      setReviewForm({ client_name: "", event_type: "", rating: 5, review: "" });
    } catch {
      setReviewError("Failed to submit. Please try again.");
    }
    setReviewSubmitting(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--accent)] min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/95 to-[#1a1a2e]/70" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${cloudinaryUrl(siteImages.hero, 1920)}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 w-full">
          <div className="max-w-2xl">
            <p className="text-[var(--gold)] font-semibold text-sm md:text-base tracking-wider uppercase mb-3">
              20+ Years of Excellence
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Capturing Your{" "}
              <span className="text-[var(--secondary)] inline-block min-w-[200px] md:min-w-[320px]">
                {typedText}<span className="animate-pulse">|</span>
              </span>{" "}
              Forever
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              Professional photography, cinematic videography &amp; LED wall rental services for weddings, events &amp; celebrations in Hyderabad.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/book" className="bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold text-center hover:bg-[var(--primary-dark)] transition text-sm md:text-base">
                Book Your Event &rarr;
              </Link>
              <Link href="/gallery" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-[#1a1a2e] transition text-sm md:text-base">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About / Owner Section */}
      <section className="py-16 md:py-24 bg-[var(--light-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <FadeInOnScroll direction="left">
              <div className="flex justify-center">
                <div className="relative">
                  <Image src={cloudinaryUrl(siteImages.owner, 500)} alt="Prashanthi Studio - Lead Photographer" width={500} height={600} className="rounded-2xl shadow-2xl object-cover w-full max-w-sm md:max-w-md" />
                  <div className="absolute -bottom-4 -right-4 bg-[var(--primary)] text-white py-3 px-6 rounded-xl shadow-lg">
                    <span className="text-2xl font-bold">20+</span>
                    <span className="block text-xs">Years Experience</span>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll direction="right">
              <div>
                <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-2">Meet Our Photographer</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-4">Thati Sampath</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Founded with a passion for capturing life&apos;s most beautiful moments, Prashanthi Digital Studio has been serving families across Hyderabad for over two decades. Based in Nacharam, we specialize in wedding photography, event videography, and premium LED wall rental services.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  With an eye for detail and a heart for storytelling, every photograph we take tells a unique story. From grand weddings to intimate family celebrations, we bring professionalism, creativity, and warmth to every event.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:gap-3 transition-all">
                  Learn More About Us <FiArrowRight />
                </Link>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-2">What We Offer</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a2e]">Our Services</h2>
            </div>
          </FadeInOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <FadeInOnScroll key={service.title} delay={idx * 150}>
                  <Link href={service.href} className="group bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-[var(--primary)]/20 transition-all block">
                    <div className="text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#1a1a2e] mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[var(--primary)] text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                      Learn More <FiArrowRight />
                    </span>
                  </Link>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="bg-[var(--primary)] py-5 overflow-hidden">
        <div className="flex gap-8 justify-center flex-wrap px-4">
          {homePageEventTypes.map((event) => (
            <span key={event} className="text-white/90 text-sm md:text-base font-medium whitespace-nowrap">
              &#10022; {event}
            </span>
          ))}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-[var(--light-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-2">Our Work</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a2e]">Recent Portfolio</h2>
            </div>
          </FadeInOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {recentPhotos.map((photo, i) => (
              <FadeInOnScroll key={photo.id} delay={i * 100}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                  <Image src={photo.url} alt={photo.title} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                </div>
              </FadeInOnScroll>
            ))}
            {recentPhotos.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400">
                <p className="text-sm">Gallery photos will appear here once uploaded.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition">
              View Full Gallery <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* LED Wall CTA */}
      <section className="py-16 md:py-24 bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <FadeInOnScroll direction="left">
              <div>
                <p className="text-[var(--secondary)] font-semibold text-sm uppercase tracking-wider mb-2">LED Wall Rental</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Make Your Event{" "}<span className="text-[var(--secondary)]">Spectacular</span> with LED Walls
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Premium Jona LED screens available for rent &#8212; perfect for weddings, corporate events, stage backdrops and live streaming. Each screen is 8ft x 12ft and can be split into two 6ft x 8ft panels.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2"><span className="text-[var(--secondary)]">&#10003;</span> 2 LED screens available</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--secondary)]">&#10003;</span> Indoor and outdoor capable</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--secondary)]">&#10003;</span> Setup and dismantling included</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--secondary)]">&#10003;</span> Operator available</li>
                </ul>
                <Link href="/led-walls" className="inline-flex items-center gap-2 bg-[var(--secondary)] text-[#1a1a2e] px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
                  Learn More <FiArrowRight />
                </Link>
              </div>
            </FadeInOnScroll>
            <FadeInOnScroll direction="right">
              <div className="flex justify-center">
                <Image src={cloudinaryUrl(siteImages.ledWall, 600)} alt="LED Wall at event" width={600} height={400} className="rounded-xl shadow-2xl w-full max-w-lg" />
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <p className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider mb-2">Testimonials</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a2e]">What Our Clients Say</h2>
            </div>
          </FadeInOnScroll>

          {testimonials.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              <p>Customer reviews will appear here.</p>
            </div>
          )}

          {/* Desktop grid */}
          {testimonials.length > 0 && (
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.slice(0, 8).map((t, idx) => (
                <FadeInOnScroll key={t.id} delay={idx * 150}>
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition h-full">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.review}&rdquo;</p>
                    <div>
                      <p className="font-semibold text-[#1a1a2e] text-sm">{t.client_name}</p>
                      <p className="text-xs text-gray-400">{t.event_type}</p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          )}

          {/* Mobile carousel */}
          {testimonials.length > 0 && (
            <div className="sm:hidden">
              <div className="relative">
                <div className="overflow-hidden rounded-xl">
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                    {testimonials.map((t) => (
                      <div key={t.id} className="min-w-full px-1">
                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                          <div className="flex gap-1 mb-3">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.review}&rdquo;</p>
                          <div>
                            <p className="font-semibold text-[#1a1a2e] text-sm">{t.client_name}</p>
                            <p className="text-xs text-gray-400">{t.event_type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button onClick={prevTestimonial} className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition" aria-label="Previous testimonial">
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentTestimonial ? "bg-primary w-6" : "bg-gray-300"}`} aria-label={`Go to testimonial ${idx + 1}`} />
                    ))}
                  </div>
                  <button onClick={nextTestimonial} className="p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition" aria-label="Next testimonial">
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Review Submission Form */}
          <FadeInOnScroll>
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#1a1a2e] mb-2">Share Your Experience</h3>
                <p className="text-gray-500 text-sm">Had a great experience with us? We&apos;d love to hear from you!</p>
              </div>
              {reviewSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiStar className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-green-800 mb-1">Thank You!</h4>
                  <p className="text-green-600 text-sm">Your review has been submitted and will appear on our website after approval.</p>
                  <button onClick={() => setReviewSubmitted(false)} className="mt-4 text-sm text-primary font-semibold hover:underline">Submit Another Review</button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                      <input type="text" required value={reviewForm.client_name} onChange={(e) => setReviewForm({ ...reviewForm, client_name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="e.g., Rajesh & Priya" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                      <input type="text" value={reviewForm.event_type} onChange={(e) => setReviewForm({ ...reviewForm, event_type: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="e.g., Wedding Photography" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })} className="focus:outline-none">
                          <FiStar className={`w-7 h-7 transition ${star <= reviewForm.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                    <textarea rows={3} required value={reviewForm.review} onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none" placeholder="Tell us about your experience..." />
                  </div>
                  {reviewError && <p className="text-red-500 text-sm">{reviewError}</p>}
                  <button type="submit" disabled={reviewSubmitting} className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition disabled:opacity-50">
                    <FiSend className="w-4 h-4" />
                    {reviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                  <p className="text-xs text-gray-400 text-center">Your review will be visible after admin approval.</p>
                </form>
              )}
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--primary)] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Book Your Event?</h2>
          <p className="text-white/80 mb-6 text-sm md:text-base">
            Contact us today to check availability and get a customized quote for your special occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book" className="bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Book Now</Link>
            <a href="https://wa.me/919948670396?text=Hi%2C%20I%20want%20to%20book%20an%20event" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[var(--primary)] transition">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
