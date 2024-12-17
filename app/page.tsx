import { HeroSection } from '@/components/landing/hero-section';
import { DifferentiatorsSection } from '@/components/landing/differentiators-section';
import { TechnicalDepthSection } from '@/components/landing/technical-depth-section';
import { CTASection } from '@/components/landing/cta-section';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <DifferentiatorsSection />
      <TechnicalDepthSection />
      <CTASection />
    </main>
  );
}