import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

const BOOK_URL = 'http://book.theeyecentre.com';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-brandTeal text-xs font-bold tracking-widest uppercase">Find Us</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Visit The Eye Centre</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: 'Address',        content: <p className="text-gray-600 text-sm">56 High Street, Leicester LE1 5YP</p> },
              { icon: Phone,  label: 'Phone',          content: <a href="tel:01162545632" className="text-gray-600 text-sm hover:text-brandTeal transition-colors">0116 254 5632</a> },
              { icon: Clock,  label: 'Opening Hours',  content: <div className="text-sm text-gray-600 space-y-0.5"><p>Mon – Sat: 9:00am – 5:30pm</p><p className="text-gray-400">Sunday: Closed</p></div> },
            ].map(({ icon: Icon, label, content }) => (
              <div key={label} className="flex gap-4">
                <Icon className="w-5 h-5 text-brandTeal shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{label}</p>
                  {content}
                </div>
              </div>
            ))}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a href="https://maps.google.com/?q=56+High+Street+Leicester+LE1+5YP" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brandTeal border border-brandTeal/30 rounded-full px-5 py-2.5 hover:bg-teal-50 transition-colors">
                <ExternalLink className="w-4 h-4" /> View on Google Maps
              </a>
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-brandTeal text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-teal-700 transition-colors">
                Book Appointment
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl shadow-gray-100 aspect-[4/3] md:h-80 bg-gray-100">
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
  );
}
