import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Sarah M.', date: 'April 2025', text: 'Absolutely brilliant service from start to finish. The staff were incredibly friendly and took real time to understand my needs. Would highly recommend!' },
  { name: 'James T.', date: 'March 2025', text: 'The most thorough eye examination I have ever had. They explained everything clearly and I never felt rushed. Exceptional practice.' },
  { name: 'Priya K.', date: 'February 2025', text: "A brilliant selection of frames and genuinely honest advice. They steered me away from frames that didn't suit me rather than just making a sale." },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-darkGreen px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-12">
          <div>
            <span className="text-teal-400 text-xs font-bold tracking-widest uppercase">Patient Reviews</span>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-5xl md:text-7xl font-bold text-white leading-none">5.0</span>
              <div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}</div>
                <p className="text-teal-300 text-xs mt-1 font-medium">Based on 200+ Google Reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-5 md:overflow-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((r) => (
            <div key={r.name} className="min-w-[300px] sm:min-w-[340px] md:min-w-0 snap-start shrink-0 md:shrink-[unset] bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/10 transition-colors">
              <span className="text-5xl font-serif text-brandTeal/60 leading-none mb-3 select-none">&ldquo;</span>
              <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-5">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brandTeal/20 border border-brandTeal/30 flex items-center justify-center shrink-0">
                  <span className="text-teal-300 text-xs font-bold">{r.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-teal-400 text-xs">{r.date}</p>
                </div>
                <div className="ml-auto flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-gold fill-gold" />)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
