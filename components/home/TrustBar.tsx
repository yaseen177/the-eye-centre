import { Award, Star, Eye, Calendar } from 'lucide-react';

const ITEMS = [
  { icon: Award,    text: 'Trusted Independent Opticians'    },
  { icon: Star,     text: '5.0 Rated by Local Patients'      },
  { icon: Eye,      text: 'Same Day & NHS Eye Tests'          },
  { icon: Calendar, text: 'Over 35 Years of Experience'       },
];

export function TrustBar() {
  return (
    <section className="bg-beige border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-200">
          {ITEMS.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 py-5 px-4 sm:px-6 text-center sm:text-left"
            >
              <Icon className="w-5 h-5 text-brandTeal shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
