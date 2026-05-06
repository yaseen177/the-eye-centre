import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { PracticeOverview } from '@/components/home/PracticeOverview';
import { Services } from '@/components/home/Services';
import { Testimonials } from '@/components/home/Testimonials';
import { ContactSection } from '@/components/home/ContactSection';
import { CartDrawer } from '@/components/shop/CartDrawer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <PracticeOverview />
        <Services />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
