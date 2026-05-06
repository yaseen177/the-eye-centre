'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cart';

const LOGO_URL =
  'https://img1.wsimg.com/isteam/ip/297dd456-b70f-4175-b7e6-7f1aabf6e6b3/blob-0f9c396.png/:/rs=w:630,h:126,cg:true,m/cr=w:630,h:126/qt=q:95';

const BOOK_URL = 'http://book.theeyecentre.com';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Eye Tests', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-darkGreen text-white text-xs py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-8 flex-wrap font-medium tracking-wide">
          <span>✓ Trusted Independent Opticians</span>
          <span>✓ Over 35 Years of Experience</span>
          <span>✓ 5.0 Rated by Our Patients</span>
        </div>
      </div>

      {/* Nav */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image src={LOGO_URL} alt="The Eye Centre" width={140} height={28} className="h-9 w-auto object-contain" unoptimized />
          </Link>

          <div className="hidden md:flex gap-7 text-sm font-medium text-gray-500">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-brandTeal transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-brandTeal transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brandTeal text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Book CTA — desktop */}
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex bg-brandTeal text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Book Appointment
            </a>

            {/* Mobile: phone + hamburger */}
            <a href="tel:01162545632" className="md:hidden p-2 text-brandTeal">
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 text-gray-600"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="md:hidden border-t border-gray-100 bg-white px-4 pb-4"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-sm font-medium text-gray-700 border-b border-gray-50 hover:text-brandTeal"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center bg-brandTeal text-white text-sm font-semibold py-3.5 rounded-full hover:bg-teal-700"
              >
                Book Appointment
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
