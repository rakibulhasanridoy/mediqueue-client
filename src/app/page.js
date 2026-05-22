import FeaturedTutors from '@/components/FeaturedTutors';
import Features from '@/components/Features';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedTutors />

      <Features />
    </div>
  );
}
