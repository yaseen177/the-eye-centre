'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=900', alt: 'Frames display' },
  { src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900', alt: 'Eye examination room' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900', alt: 'Reception desk' },
];

export function PracticeOverview() {
  const [idx, setIdx] = useState(0);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-brandTeal text-xs font-bold tracking-widest uppercase">Visit Our Leicester Practice</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-5">
            Modern Practice,<br />Personal Service.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Step into a welcoming, unhurried environment. From our state-of-the-art consulting rooms to our curated frames gallery, every detail has been considered for you.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brandTeal hover:gap-3 transition-all duration-200">
            See Inside Our Practice <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xl shadow-gray-200">
          <motion.img
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            src={IMAGES[idx].src}
            alt={IMAGES[idx].alt}
            className="w-full h-full object-cover"
          />
          <button onClick={() => setIdx((i) => (i === 0 ? IMAGES.length - 1 : i - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-md transition-all hover:scale-105">
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button onClick={() => setIdx((i) => (i === IMAGES.length - 1 ? 0 : i + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-md transition-all hover:scale-105">
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
            {IMAGES.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`rounded-full transition-all duration-200 ${i === idx ? 'bg-brandTeal w-5 h-2' : 'bg-white/60 w-2 h-2'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
