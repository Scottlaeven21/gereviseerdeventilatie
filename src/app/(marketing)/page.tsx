import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { InfoCarousel } from '@/components/home/InfoCarousel';
import { Intro } from '@/components/home/Intro';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { ContactSection } from '@/components/home/ContactSection';
import { GuaranteeSection } from '@/components/home/GuaranteeSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <InfoCarousel />
      <GuaranteeSection />
      <CategoryGrid />
      <Intro />
      <FeaturedProducts />
      <ContactSection />
    </div>
  );
}
