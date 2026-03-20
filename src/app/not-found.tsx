import Link from "next/link";
import { FiCamera, FiHome, FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-light-bg">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="mb-6">
          <FiCamera className="w-16 h-16 text-primary mx-auto opacity-50" />
        </div>
        <h1 className="text-6xl font-bold text-accent mb-2">404</h1>
        <h2 className="text-xl font-bold text-accent mb-4">
          Oops! This page wasn&apos;t captured
        </h2>
        <p className="text-gray-500 mb-8">
          Looks like the page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to our studio!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            <FiHome className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
          >
            Contact Us <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
