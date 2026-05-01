import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Eye,
  Glasses,
  Calendar,
  Phone,
  Star,
  Award,
  Clock,
  Heart,
  MapPin,
  Droplet,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

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

const REVIEWS = [
  {
    name: 'Sarah M.',
    text: 'Absolutely brilliant service from start to finish. The staff were incredibly friendly and took real time to understand my needs. Would highly recommend!',
  },
  {
    name: 'James T.',
    text: 'The most thorough eye examination I have ever had. They explained everything clearly and I never felt rushed. Exceptional practice.',
  },
  {
    name: 'Priya K.',
    text: "A brilliant selection of frames and genuinely honest advice. They steered me away from frames that didn't suit me rather than just making a sale.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function App() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevImage = () =>
    setCarouselIndex((i) => (i === 0 ? PRACTICE_IMAGES.length - 1 : i - 1));
  const nextImage = () =>
    setCarouselIndex((i) => (i === PRACTICE_IMAGES.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* Top Bar */}
      <div className="bg-darkGreen text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-6 text-center font-medium tracking-wide">
          <span>Trusted Independent Opticians</span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span>Over 35 Years of Experience</span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span>5.0 Rated by Our Patients</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Glasses className="w-7 h-7 text-brandTeal" />
            <span className="text-lg font-bold tracking-tight text-gray-900 lowercase">
              the eye centre
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-brandTeal transition-colors">Home</a>
            <a href="#services" className="hover:text-brandTeal transition-colors">Eye Tests</a>
            <a href="#services" className="hover:text-brandTeal transition-colors">Glasses</a>
            <a href="#contact" className="hover:text-brandTeal transition-colors">Contact Lenses</a>
          </div>
          <button className="bg-brandTeal text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-teal-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[620px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={SHOP_FRONT}
            alt="The Eye Centre shop front on the high street"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-lg text-white"
          >
            <p className="text-brandTeal font-bold text-xs tracking-widest uppercase mb-3">
              Premium Eye Care in Leicester
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Same Day Appointments Available
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">
              Your trusted local independent opticians. We believe in unhurried appointments,
              honest advice, and expert eye care — because your eyes deserve nothing less.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brandTeal text-white px-7 py-4 rounded font-semibold text-sm hover:bg-teal-700 transition-colors">
                Book Your Eye Test Today
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-white text-white px-7 py-4 rounded font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4" />
                Call Us: 0116 254 5632
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-beige py-8 px-6 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Award className="w-7 h-7 text-brandTeal" />, text: 'Trusted Independent Opticians' },
            { icon: <Star className="w-7 h-7 text-brandTeal" />, text: '5.0 Rated by Local Patients' },
            { icon: <Eye className="w-7 h-7 text-brandTeal" />, text: 'Same Day & NHS Eye Tests Available' },
            { icon: <Calendar className="w-7 h-7 text-brandTeal" />, text: 'Over 35 Years of Experience' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              {item.icon}
              <span className="text-sm font-medium text-gray-700 leading-tight">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-brandTeal font-bold text-xs tracking-widest uppercase mb-3">
              Visit Our Leicester Practice
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-5 text-gray-900">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded-full p-2 shadow transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white rounded-full p-2 shadow transition-colors"
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
              Eye Care Tailored to You
            </h2>
            <p className="text-gray-500 text-lg">
              A full range of services to keep your eyes healthy and your vision clear.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 bg-teal-50 text-brandTeal rounded-full flex items-center justify-center">
                  {service.icon}
                </div>
                <span className="font-semibold text-gray-800 text-sm leading-snug">
                  {service.title}
                </span>
              </motion.div>
            ))}
          </div>

          <button className="bg-brandTeal text-white px-8 py-3.5 rounded font-semibold text-sm hover:bg-teal-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-darkGreen px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 items-start">
            {/* Score */}
            <div className="text-center md:text-left">
              <div className="text-8xl font-extrabold text-white leading-none mb-3">5.0</div>
              <div className="flex gap-1 justify-center md:justify-start mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-teal-300 text-sm font-medium">Based on 200+ Reviews</p>
            </div>

            {/* Review cards */}
            <div className="md:col-span-3 grid md:grid-cols-3 gap-5">
              {REVIEWS.map((review, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 border border-white/10 bg-white/5"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4">
                    "{review.text}"
                  </p>
                  <p className="text-white font-semibold text-sm">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
          {/* Info */}
          <div>
            <p className="text-brandTeal font-bold text-xs tracking-widest uppercase mb-3">
              Find Us
            </p>
            <h2 className="text-3xl font-extrabold mb-7 text-gray-900">
              Visit The Eye Centre
            </h2>
            <div className="space-y-5 text-sm text-gray-600">
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
                  <p>0116 254 5632</p>
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

      {/* Bottom Banner */}
      <div className="bg-darkGreen py-12 px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-5">
          Your Eyes Deserve Expert Care
        </h3>
        <button className="bg-gold text-darkGreen px-9 py-3.5 rounded font-bold text-sm hover:brightness-110 transition-all">
          Book Online Now
        </button>
      </div>

      {/* Footer */}
      <footer className="py-5 bg-gray-950 text-center text-gray-500 text-xs">
        <p>
          &copy; {new Date().getFullYear()} The Eye Centre Leicester. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
