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
import StarField from '@/components/StarField';
import NebulaField from '@/components/NebulaField';
import BlackHoleField from '@/components/BlackHoleField';
import AmbientEffects from '@/components/AmbientEffects';

function SectionGroup({ bg, children }: { bg: 'stars' | 'nebula' | 'blackhole'; children: React.ReactNode }) {
  return (
    <div className="relative isolate">
      <div className="absolute inset-0 overflow-hidden -z-10">
        {bg === 'stars' && <StarField />}
        {bg === 'nebula' && <NebulaField />}
        {bg === 'blackhole' && <BlackHoleField />}
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <AmbientEffects />

      <div className="relative" style={{ zIndex: 2 }}>
        <Header />
        <main id="main-content">
          <SectionGroup bg="stars">
            <Hero />
            <Story />
            <Features />
          </SectionGroup>

          <SectionGroup bg="nebula">
            <World />
            <Characters />
          </SectionGroup>

          <SectionGroup bg="blackhole">
            <Editions />
            <Media />
          </SectionGroup>

          <SectionGroup bg="stars">
            <Roadmap />
            <Community />
            <FAQ />
            <Contact />
            <Footer />
          </SectionGroup>
        </main>
      </div>
    </div>
  );
}
