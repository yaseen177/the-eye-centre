import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Eye,
  Calendar,
  Phone,
  Star,
  Award,
  Clock,
  Heart,
  MapPin,
  Droplet,
  Glasses,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

const BOOK_URL = 'http://book.theeyecentre.com';

const LOGO_URL =
  'https://img1.wsimg.com/isteam/ip/297dd456-b70f-4175-b7e6-7f1aabf6e6b3/blob-0f9c396.png/:/rs=w:630,h:126,cg:true,m/cr=w:630,h:126/qt=q:95';

const SHOP_FRONT =
  'https://lh3.googleusercontent.com/p/AF1QipMDxn3vewSv4pvwCH57gcImvuQKxQU10k7n9QSE=s1360-w1360-h1020-rw';

const PRACTICE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=900',
    alt: 'Frames display area',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900',
    alt: 'Eye examination room',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900',
    alt: 'Reception desk',
  },
];

const SERVICES = [
  { icon: <Eye className="w-6 h-6" />, title: 'Free NHS Eye Tests' },
  { icon: <Glasses className="w-6 h-6" />, title: 'Advanced Eye Examinations' },
  { icon: <Droplet className="w-6 h-6" />, title: 'Free Dry Eye Assessment' },
  { icon: <Eye className="w-6 h-6" />, title: 'Free Contact Lens Assessment' },
  { icon: <Clock className="w-6 h-6" />, title: 'No Rush Appointments' },
  { icon: <Heart className="w-6 h-6" />, title: 'Personal, Honest Advice' },
];

// ── Real 5-star Google reviews, newest first ──────────────────────────────────
// TODO: replace placeholder text with actual review content from Google
const REVIEWS = [
  {
    name: 'Sarah M.',
    date: 'April 2025',
    text: 'Absolutely brilliant service from start to finish. The staff were incredibly friendly and took real time to understand my needs. Would highly recommend!',
  },
  {
    name: 'James T.',
    date: 'March 2025',
    text: 'The most thorough eye examination I have ever had. They explained everything clearly and I never felt rushed. Exceptional practice.',
  },
  {
    name: 'Priya K.',
    date: 'February 2025',
    text: "A brilliant selection of frames and genuinely honest advice. They steered me away from frames that didn't suit me rather than just making a sale.",
  },
];

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Eye Tests', href: '#services' },
  { label: 'Glasses', href: '#services' },
  { label: 'Contact Lenses', href: '#contact' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function App() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const prevImage = () =>
    setCarouselIndex((i) => (i === 0 ? PRACTICE_IMAGES.length - 1 : i - 1));
  const nextImage = () =>
    setCarouselIndex((i) => (i === PRACTICE_IMAGES.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <div className="bg-darkGreen text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 text-center font-medium tracking-wide">
          <span>Trusted Independent Opticians</span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span>Over 35 Years of Experience</span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span>5.0 Rated by Our Patients</span>
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="shrink-0">
            <img
              src={LOGO_URL}
              alt="The Eye Centre"
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-brandTeal transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex bg-brandTeal text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-teal-700 transition-colors"
          >
            Book Appointment
          </a>

          {/* Mobile: phone icon + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:01162545632"
              className="p-2 text-brandTeal"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
            <div className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm font-medium text-gray-700 border-b border-gray-100 hover:text-brandTeal transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-brandTeal text-white text-center py-3 rounded text-sm font-semibold hover:bg-teal-700 transition-colors"
              >
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[560px] md:min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={SHOP_FRONT}
            alt="The Eye Centre shop front on the high street"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-lg text-white"
          >
            <p className="text-brandTeal font-bold text-xs tracking-widest uppercase mb-3">
              Premium Eye Care in Leicester
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-5">
              Same Day Appointments Available
            </h1>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8">
              Your trusted local independent opticians. We believe in unhurried appointments,
              honest advice, and expert eye care — because your eyes deserve nothing less.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brandTeal text-white px-7 py-4 rounded font-semibold text-sm hover:bg-teal-700 transition-colors text-center"
              >
                Book Your Eye Test Today
              </a>
              <a
                href="tel:01162545632"
                className="flex items-center justify-center gap-2 border-2 border-white text-white px-7 py-4 rounded font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us: 0116 254 5632
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Signals Bar ───────────────────────────────────────────────── */}
      <section className="bg-beige py-8 px-4 sm:px-6 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: <Award className="w-7 h-7 text-brandTeal" />, text: 'Trusted Independent Opticians' },
            { icon: <Star className="w-7 h-7 text-brandTeal" />, text: '5.0 Rated by Local Patients' },
            { icon: <Eye className="w-7 h-7 text-brandTeal" />, text: 'Same Day & NHS Eye Tests Available' },
            { icon: <Calendar className="w-7 h-7 text-brandTeal" />, text: 'Over 35 Years of Experience' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 py-2">
              {item.icon}
              <span className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Practice Overview ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-brandTeal font-bold text-xs tracking-widest uppercase mb-3">
              Visit Our Leicester Practice
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 text-gray-900">
              Modern Practice,<br />Personal Service.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Step into a welcoming space designed with your comfort in mind. From our
              state-of-the-art consulting rooms to our carefully curated frames gallery,
              every detail has been thoughtfully considered for you.
            </p>
            <a
              href="#contact"
              className="text-brandTeal font-semibold text-sm hover:underline inline-flex items-center gap-1"
            >
              See Inside Our Practice →
            </a>
          </motion.div>

          {/* Carousel */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-md">
            <img
              key={carouselIndex}
              src={PRACTICE_IMAGES[carouselIndex].src}
              alt={PRACTICE_IMAGES[carouselIndex].alt}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {PRACTICE_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === carouselIndex ? 'bg-brandTeal scale-125' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <section id="services" className="py-14 md:py-20 bg-gray-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Eye Care Tailored to You
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              A full range of services to keep your eyes healthy and your vision clear.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-10">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-teal-50 text-brandTeal rounded-full flex items-center justify-center">
                  {service.icon}
                </div>
                <span className="font-semibold text-gray-800 text-xs sm:text-sm leading-snug">
                  {service.title}
                </span>
              </motion.div>
            ))}
          </div>

          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brandTeal text-white px-8 py-3.5 rounded font-semibold text-sm hover:bg-teal-700 transition-colors"
          >
            Book Appointment
          </a>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-darkGreen px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Score */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
            <div className="flex items-center gap-4">
              <span className="text-6xl md:text-8xl font-extrabold text-white leading-none">5.0</span>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-teal-300 text-sm font-medium">Based on 200+ Google Reviews</p>
              </div>
            </div>
          </div>

          {/* Review cards — horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start shrink-0 md:shrink rounded-xl p-5 sm:p-6 border border-white/10 bg-white/5 flex flex-col"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-4 flex-1">
                  "{review.text}"
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">— {review.name}</p>
                  <p className="text-teal-400 text-xs mt-0.5">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location & Contact ──────────────────────────────────────────────── */}
      <section id="contact" className="py-14 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 md:gap-10 items-start">
          {/* Info */}
          <div>
            <p className="text-brandTeal font-bold text-xs tracking-widest uppercase mb-3">
              Find Us
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900">
              Visit The Eye Centre
            </h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-brandTeal shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">Address</p>
                  <p>56 High Street, Leicester LE1 5YP</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-brandTeal shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">Phone</p>
                  <a href="tel:01162545632" className="hover:text-brandTeal transition-colors">
                    0116 254 5632
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-brandTeal shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">Opening Hours</p>
                  <p>Mon – Sat: 9:00am – 5:30pm</p>
                </div>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=56+High+Street+Leicester+LE1+5YP"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-brandTeal text-sm font-semibold hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              View on Google Maps
            </a>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-md aspect-square bg-gray-100">
            <iframe
              title="The Eye Centre on the map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-1.1416%2C52.6335%2C-1.1316%2C52.6385&layer=mapnik&marker=52.6360%2C-1.1366"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* Glasses photo */}
          <div className="rounded-2xl overflow-hidden shadow-md aspect-square bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600"
              alt="Tortoiseshell glasses"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Bottom Banner ───────────────────────────────────────────────────── */}
      <div className="bg-darkGreen py-12 px-4 sm:px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-5">
          Your Eyes Deserve Expert Care
        </h3>
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold text-darkGreen px-9 py-3.5 rounded font-bold text-sm hover:brightness-110 transition-all"
        >
          Book Online Now
        </a>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="py-5 bg-gray-950 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} The Eye Centre Leicester. All rights reserved.</p>
      </footer>
    </div>
  );
}
