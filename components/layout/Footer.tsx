import Image from 'next/image';
import Link from 'next/link';

const LOGO_URL =
  'https://img1.wsimg.com/isteam/ip/297dd456-b70f-4175-b7e6-7f1aabf6e6b3/blob-0f9c396.png/:/rs=w:630,h:126,cg:true,m/cr=w:630,h:126/qt=q:95';

const BOOK_URL = 'http://book.theeyecentre.com';

export function Footer() {
  return (
    <>
      {/* CTA Banner */}
      <section className="bg-darkGreen py-16 px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
          Your Eyes Deserve Expert Care
        </h2>
        <p className="text-teal-300 text-sm mb-8">Same-day appointments available.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gold text-darkGreen font-bold text-sm px-8 py-3.5 rounded-full hover:brightness-110 transition-all"
          >
            Book Online Now
          </a>
          <a
            href="tel:01162545632"
            className="inline-flex items-center justify-center border border-white/30 text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
          >
            Call 0116 254 5632
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 px-4 sm:px-6 pt-12 pb-8">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          <div>
            <Image src={LOGO_URL} alt="The Eye Centre" width={120} height={24} className="h-8 w-auto mb-4 brightness-0 invert opacity-70" unoptimized />
            <p className="text-gray-500 text-sm leading-relaxed">
              Independent opticians serving Leicester since 1989.
            </p>
          </div>
          <div>
            <p className="text-gray-300 font-semibold text-sm mb-4">Quick Links</p>
            <ul className="space-y-2.5 text-sm text-gray-500">
              {[
                { label: 'Shop Glasses', href: '/shop' },
                { label: 'Book Eye Test', href: BOOK_URL },
                { label: 'NHS Eye Tests', href: '/#services' },
                { label: 'Contact', href: '/#contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-gray-300 font-semibold text-sm mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>56 High Street, Leicester LE1 5YP</li>
              <li><a href="tel:01162545632" className="hover:text-white transition-colors">0116 254 5632</a></li>
              <li>Mon – Sat: 9:00am – 5:30pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} The Eye Centre Leicester. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
