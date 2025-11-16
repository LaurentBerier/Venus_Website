import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Features from '@/components/Features';
import World from '@/components/World';
import Characters from '@/components/Characters';
import Editions from '@/components/Editions';
import Media from '@/components/Media';
import Roadmap from '@/components/Roadmap';
import Community from '@/components/Community';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Story />
      <Features />
      <World />
      <Characters />
      <Editions />
      <Media />
      <Roadmap />
      <Community />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
