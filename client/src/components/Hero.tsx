import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Play } from 'lucide-react';
import heroImage from '@assets/Venus_Hero_1771945354304.jpg';

export default function Hero() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.4)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(25,90%,55%,0.4)] to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider animate-fade-in text-glow-cyan uppercase" data-testid="text-hero-title">
            {t.hero.title}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto animate-fade-in tracking-wide">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Button
              size="lg"
              variant="outline"
              className="bg-background/20 backdrop-blur-md border-[hsl(190,85%,50%,0.4)] text-white min-w-[200px] border-glow-cyan"
              onClick={() => setShowTrailer(true)}
              data-testid="button-watch-trailer"
            >
              <Play className="mr-2 h-5 w-5" />
              {t.nav.watchTrailer}
            </Button>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground border border-accent-border min-w-[200px] border-glow-orange"
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
        <div className="w-6 h-10 border-2 border-[hsl(190,85%,50%,0.5)] rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-[hsl(190,85%,50%,0.5)] rounded-full" />
        </div>
      </div>

      {showTrailer && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
          data-testid="modal-trailer"
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src="https://www.youtube.com/embed/_Pu2hAu-vy8?autoplay=1&rel=0"
              title="Venus: Build Your Destiny - Trailer"
              className="w-full h-full rounded-md border border-[hsl(190,85%,50%,0.3)]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm tracking-wider uppercase"
              data-testid="button-close-trailer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
