"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLinks = () => (
    <>
      <Link href="/about" className="hover:text-gray-900">About Us</Link>
      <Link href="/coaching" className="hover:text-gray-900">Coaching</Link>
      <Link href="/resources" className="hover:text-gray-900">Resources</Link>
      <Link href="/teams" className="hover:text-gray-900">For Teams</Link>
      <a href="#celeste" className="hover:text-gray-900">Talk with Celeste</a>
    </>
  );

  return (
    <header
      className={`sticky top-0 z-40 transition border-b ${
        scrolled ? "bg-white/90 backdrop-blur border-gray-200" : "bg-white border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Brand */}
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Fortivida
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <NavLinks />
        </nav>

        {/* Right actions */}
        <div className="ml-auto hidden md:flex items-center gap-3">
          <Link
            href="/signup"
            className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Start Free
          </Link>
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Log In
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto md:hidden inline-flex items-center justify-center rounded-md border border-gray-200 p-2"
          aria-label="Open menu"
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-1">
            <div className="h-0.5 w-5 bg-gray-800" />
            <div className="h-0.5 w-5 bg-gray-800" />
            <div className="h-0.5 w-5 bg-gray-800" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 text-gray-700">
            <NavLinks />
            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-center"
              >
                Start Free
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition text-center"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
