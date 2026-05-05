import { useState, useEffect } from 'react';
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
  Check,
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
  { icon: <Eye className="w-5 h-5" />,      title: 'Free NHS Eye Tests',           desc: 'Fully funded NHS examinations available for eligible patients.' },
  { icon: <Glasses className="w-5 h-5" />,  title: 'Advanced Eye Examinations',    desc: 'Thorough assessments using the latest diagnostic technology.' },
  { icon: <Droplet className="w-5 h-5" />,  title: 'Free Dry Eye Assessment',      desc: 'Expert evaluation and tailored treatment plans for dry eye.' },
  { icon: <Eye className="w-5 h-5" />,      title: 'Free Contact Lens Assessment', desc: 'Professional fitting for daily, monthly, and specialist lenses.' },
  { icon: <Clock className="w-5 h-5" />,    title: 'No Rush Appointments',         desc: 'We always take the time needed — no clock-watching here.' },
  { icon: <Heart className="w-5 h-5" />,    title: 'Personal, Honest Advice',      desc: 'Recommendations made for you, not for sales targets.' },
];

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
  { label: 'Home',           href: '#'        },
  { label: 'Eye Tests',      href: '#services' },
  { label: 'Glasses',        href: '#services' },
  { label: 'Contact Lenses', href: '#contact'  },
];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function BookBtn({ className = '', children = 'Book Appointment' }: { className?: string; children?: string }) {
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ${className}`}
    >
      {children}
    </a>
  );
}

export default function App() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const prevImage = () =>
    setCarouselIndex((i) => (i === 0 ? PRACTICE_IMAGES.length - 1 : i - 1));
  const nextImage = () =>
    setCarouselIndex((i) => (i === PRACTICE_IMAGES.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">

      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <div className="bg-darkGreen text-white text-xs py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-8 text-center font-medium tracking-wide flex-wrap">
          <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-teal-400" />Trusted Independent Opticians</span>
          <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-teal-400" />Over 35 Years of Experience</span>
          <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-teal-400" />5.0 Rated by Our Patients</span>
        </div>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#" className="shrink-0">
            <img src={LOGO_URL} alt="The Eye Centre" className="h-9 w-auto object-contain" />
          </a>

          <div className="hidden md:flex gap-7 text-sm font-medium text-gray-500">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="hover:text-brandTeal transition-colors duration-150 py-1"
              >
                {l.label}
              </a>
            ))}
          </div>

          <BookBtn className="hidden md:inline-flex bg-brandTeal text-white text-sm px-5 py-2.5 hover:bg-teal-700 shadow-sm">
            Book Appointment
          </BookBtn>

          <div className="flex items-center gap-1 md:hidden">
            <a href="tel:01162545632" className="p-2.5 text-brandTeal" aria-label="Call us">
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2.5 text-gray-600"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-100 bg-white px-4 pb-5"
          >
            <div className="flex flex-col pt-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3.5 text-sm font-medium text-gray-700 border-b border-gray-50 hover:text-brandTeal transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <BookBtn className="mt-4 bg-brandTeal text-white text-sm py-3.5 w-full hover:bg-teal-700">
                Book Appointment
              </BookBtn>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[580px] md:min-h-[680px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={SHOP_FRONT}
            alt="The Eye Centre shop front"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
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
              <BookBtn className="bg-brandTeal text-white text-sm px-7 py-3.5 hover:bg-teal-700 shadow-lg shadow-teal-900/30">
                Book Your Eye Test Today
              </BookBtn>
              <a
                href="tel:01162545632"
                className="flex items-center justify-center gap-2 border border-white/40 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                0116 254 5632
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Bar ───────────────────────────────────────────────────────── */}
      <section className="bg-beige border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-200">
            {[
              { icon: <Award className="w-5 h-5" />,    text: 'Trusted Independent Opticians'      },
              { icon: <Star className="w-5 h-5" />,     text: '5.0 Rated by Local Patients'        },
              { icon: <Eye className="w-5 h-5" />,      text: 'Same Day & NHS Eye Tests'           },
              { icon: <Calendar className="w-5 h-5" />, text: 'Over 35 Years of Experience'        },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 py-5 px-4 sm:px-6 text-center sm:text-left">
                <span className="text-brandTeal shrink-0">{item.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practice Overview ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className="text-brandTeal text-xs font-bold tracking-widest uppercase">
              Visit Our Leicester Practice
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-5">
              Modern Practice,<br />Personal Service.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Step into a welcoming, unhurried environment designed around your comfort. From our state-of-the-art consulting rooms to our curated frames gallery, every detail has been considered for you.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brandTeal hover:gap-3 transition-all duration-200"
            >
              See Inside Our Practice
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Carousel */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-xl shadow-gray-200">
            <motion.img
              key={carouselIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={PRACTICE_IMAGES[carouselIndex].src}
              alt={PRACTICE_IMAGES[carouselIndex].alt}
              className="w-full h-full object-cover"
            />
            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-md transition-all duration-150 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2.5 shadow-md transition-all duration-150 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
              {PRACTICE_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === carouselIndex ? 'bg-brandTeal w-5 h-2' : 'bg-white/60 w-2 h-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 md:py-28 bg-gray-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="text-brandTeal text-xs font-bold tracking-widest uppercase">What We Offer</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Eye Care Tailored to You
            </h2>
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
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brandTeal/30 hover:shadow-lg hover:shadow-teal-50 transition-all duration-300 flex gap-4"
              >
                <div className="shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-teal-50 text-brandTeal flex items-center justify-center group-hover:bg-brandTeal group-hover:text-white transition-colors duration-300">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <BookBtn className="bg-brandTeal text-white text-sm px-8 py-3.5 hover:bg-teal-700 shadow-sm">
              Book Appointment
            </BookBtn>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-darkGreen px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-12">
            <div>
              <span className="text-teal-400 text-xs font-bold tracking-widest uppercase">Patient Reviews</span>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-5xl md:text-7xl font-bold text-white leading-none">5.0</span>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-teal-300 text-xs mt-1 font-medium">Based on 200+ Google Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cards — scroll on mobile, grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-5 md:overflow-visible scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="min-w-[300px] sm:min-w-[340px] md:min-w-0 snap-start shrink-0 md:shrink-[unset] bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/10 transition-colors duration-200"
              >
                {/* Large quote mark */}
                <span className="text-5xl font-serif text-brandTeal/60 leading-none mb-3 select-none">"</span>
                <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-5">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brandTeal/20 border border-brandTeal/30 flex items-center justify-center shrink-0">
                    <span className="text-teal-300 text-xs font-bold">{r.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-teal-400 text-xs">{r.date}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-gold fill-gold" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location & Contact ──────────────────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="mb-12"
          >
            <span className="text-brandTeal text-xs font-bold tracking-widest uppercase">Find Us</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Visit The Eye Centre
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Info */}
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="w-5 h-5 text-brandTeal shrink-0" />,
                  label: 'Address',
                  content: <p className="text-gray-600 text-sm">56 High Street, Leicester LE1 5YP</p>,
                },
                {
                  icon: <Phone className="w-5 h-5 text-brandTeal shrink-0" />,
                  label: 'Phone',
                  content: (
                    <a href="tel:01162545632" className="text-gray-600 text-sm hover:text-brandTeal transition-colors">
                      0116 254 5632
                    </a>
                  ),
                },
                {
                  icon: <Clock className="w-5 h-5 text-brandTeal shrink-0" />,
                  label: 'Opening Hours',
                  content: (
                    <div className="text-sm text-gray-600 space-y-0.5">
                      <p>Mon – Sat: 9:00am – 5:30pm</p>
                      <p className="text-gray-400">Sunday: Closed</p>
                    </div>
                  ),
                },
              ].map((row, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-0.5">{row.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{row.label}</p>
                    {row.content}
                  </div>
                </div>
              ))}

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=56+High+Street+Leicester+LE1+5YP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brandTeal border border-brandTeal/30 rounded-full px-5 py-2.5 hover:bg-teal-50 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Google Maps
                </a>
                <BookBtn className="bg-brandTeal text-white text-sm px-5 py-2.5 hover:bg-teal-700">
                  Book Appointment
                </BookBtn>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-100 aspect-[4/3] md:aspect-auto md:h-80 bg-gray-100">
              <iframe
                title="The Eye Centre location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-1.1416%2C52.6335%2C-1.1316%2C52.6385&layer=mapnik&marker=52.6360%2C-1.1366"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ───────────────────────────────────────────────── */}
      <section className="bg-darkGreen py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Your Eyes Deserve Expert Care
          </h2>
          <p className="text-teal-300 text-sm mb-8">Same-day appointments available — no long waiting lists.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BookBtn className="bg-gold text-darkGreen text-sm font-bold px-8 py-3.5 hover:brightness-110 shadow-lg shadow-black/20">
              Book Online Now
            </BookBtn>
            <a
              href="tel:01162545632"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Call 0116 254 5632
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-950 px-4 sm:px-6 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <img src={LOGO_URL} alt="The Eye Centre" className="h-8 w-auto object-contain brightness-0 invert mb-4 opacity-80" />
              <p className="text-gray-500 text-sm leading-relaxed">
                Independent opticians serving Leicester since 1989. Expert eye care, personal service.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-gray-300 font-semibold text-sm mb-4">Quick Links</p>
              <ul className="space-y-2.5 text-sm text-gray-500">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-white transition-colors duration-150">{l.label}</a>
                  </li>
                ))}
                <li>
                  <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-150">Book Appointment</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-gray-300 font-semibold text-sm mb-4">Contact</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>56 High Street, Leicester LE1 5YP</li>
                <li>
                  <a href="tel:01162545632" className="hover:text-white transition-colors duration-150">0116 254 5632</a>
                </li>
                <li>Mon – Sat: 9:00am – 5:30pm</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} The Eye Centre Leicester. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
