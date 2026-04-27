import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Glasses,
  UploadCloud,
  Calendar,
  ChevronRight,
  Phone,
} from 'lucide-react';

export default function App() {
  // State to manage our gallery images (mix of stock placeholders and user uploads)
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800', // Modern glasses
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800', // Eye exam
  ]);

  // Handle front-end image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages([imageUrl, ...images]); // Adds the new image to the start of the gallery
    }
  };

  // Animation variants for staggered fading
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brandAccent selection:text-brandPrimary">
      {/* Navigation - Glassmorphism effect */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-8 h-8 text-brandPrimary" />
            <span className="text-xl font-bold tracking-tight">
              The Eye Centre
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a
              href="#services"
              className="hover:text-brandPrimary transition-colors"
            >
              Services
            </a>
            <a
              href="#gallery"
              className="hover:text-brandPrimary transition-colors"
            >
              Practice Gallery
            </a>
          </div>
          <button className="bg-brandPrimary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            Vision,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandPrimary to-blue-400">
              redefined.
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 font-light leading-relaxed">
            Experience world-class eye care in the heart of Leicester. Advanced
            diagnostics meet unparalleled designer eyewear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
              <Calendar className="w-5 h-5" />
              Schedule Exam
            </button>
            <button className="flex items-center justify-center gap-2 bg-brandAccent text-brandPrimary px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-100 transition-colors">
              <Phone className="w-5 h-5" />
              0116 XXX XXXX
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Exceptional Clinical Care
            </h2>
            <p className="text-gray-500 text-lg">
              Tailored optical solutions using state-of-the-art 2026 technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Comprehensive Eye Tests',
                icon: <Eye className="w-8 h-8" />,
                desc: 'Advanced OCT 3D scanning and thorough ocular health assessments.',
              },
              {
                title: 'Designer Frames',
                icon: <Glasses className="w-8 h-8" />,
                desc: 'Curated collections from the world’s leading fashion houses.',
              },
              {
                title: 'Contact Lens Fitting',
                icon: <ChevronRight className="w-8 h-8" />,
                desc: 'Expert fittings for daily, monthly, and specialist myopia control lenses.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-brandAccent text-brandPrimary rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery & Upload Section */}
      <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              The Practice
            </h2>
            <p className="text-gray-500 text-lg">
              A modern environment designed for your comfort.
            </p>
          </div>

          {/* Upload Button */}
          <label className="cursor-pointer flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            <UploadCloud className="w-5 h-5" />
            <span className="font-medium text-sm">Upload Photo</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Dynamic Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 relative group"
            >
              <img
                src={src}
                alt="Practice Gallery"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} The Eye Centre Leicester. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
