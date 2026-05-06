'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Eye, Glasses, Droplet, Clock, Heart } from 'lucide-react';

const SERVICES = [
  { icon: Eye,      title: 'Free NHS Eye Tests',           desc: 'Fully funded NHS examinations for eligible patients.' },
  { icon: Glasses,  title: 'Advanced Eye Examinations',    desc: 'Thorough assessments using the latest diagnostic technology.' },
  { icon: Droplet,  title: 'Free Dry Eye Assessment',      desc: 'Expert evaluation and tailored treatment plans.' },
  { icon: Eye,      title: 'Free Contact Lens Assessment', desc: 'Professional fitting for daily, monthly, and specialist lenses.' },
  { icon: Clock,    title: 'No Rush Appointments',         desc: 'We always take the time needed — no clock-watching here.' },
  { icon: Heart,    title: 'Personal, Honest Advice',      desc: 'Recommendations made for you, not for sales targets.' },
];

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-gray-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-brandTeal text-xs font-bold tracking-widest uppercase">What We Offer</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Eye Care Tailored to You</h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            A full range of services delivered with patience, expertise, and genuine care.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brandTeal/30 hover:shadow-lg hover:shadow-teal-50 transition-all duration-300 flex gap-4"
            >
              <div className="shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-teal-50 text-brandTeal flex items-center justify-center group-hover:bg-brandTeal group-hover:text-white transition-colors duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-brandTeal text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-teal-700 transition-colors"
          >
            Browse Our Glasses
          </Link>
        </div>
      </div>
    </section>
  );
}
