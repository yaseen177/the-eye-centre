'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const SHOP_FRONT =
  'https://lh3.googleusercontent.com/p/AF1QipMDxn3vewSv4pvwCH57gcImvuQKxQU10k7n9QSE=s1360-w1360-h1020-rw';
const BOOK_URL = 'http://book.theeyecentre.com';

export function Hero() {
  return (
    <section className="relative min-h-[580px] md:min-h-[680px] flex items-center">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SHOP_FRONT} alt="The Eye Centre shop front" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-xl text-white"
        >
          <span className="inline-block bg-brandTeal/20 border border-brandTeal/40 text-teal-300 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            Premium Eye Care · Leicester
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-tight tracking-tight mb-5">
            Same Day Appointments Available
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Your trusted local independent opticians — unhurried appointments, honest advice, and expert eye care since 1989.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-brandTeal text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-teal-700 transition-colors shadow-lg shadow-teal-900/30"
            >
              Book Your Eye Test Today
            </a>
            <a
              href="tel:01162545632"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              0116 254 5632
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
