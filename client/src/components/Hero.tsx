import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Play } from 'lucide-react';
import heroImage from '@assets/hero-rider_1763257661241.jpg';
import logoUrl from '@assets/osman-logo_1763257661241.png';

import Os_ProfilePicture_trans from "@assets/Os_ProfilePicture_trans.png";

export default function Hero() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <img
            src={Os_ProfilePicture_trans}
            alt="Osman Ghazi Logo"
            className="mx-auto h-32 sm:h-40 md:h-48 w-auto animate-fade-in"
            data-testid="img-hero-logo"
          />
          
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-in">
            {t.hero.title}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto animate-fade-in">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Button
              size="lg"
              variant="outline"
              className="bg-background/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 min-w-[200px]"
              onClick={() => console.log('Watch Trailer clicked')}
              data-testid="button-watch-trailer"
            >
              <Play className="mr-2 h-5 w-5" />
              {t.nav.watchTrailer}
            </Button>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent-border min-w-[200px]"
              onClick={() => document.getElementById('editions')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-preorder-hero"
            >
              {t.nav.preOrder}
            </Button>
          </div>

          <div className="pt-8">
            <div className="bg-card/10 backdrop-blur-sm border border-card-border rounded-md p-4 max-w-3xl mx-auto">
              <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
              <div className="h-20 sm:h-24 bg-muted/20 rounded flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Leaderboard Ad Placeholder (728x90)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
