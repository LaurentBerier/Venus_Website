import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Play } from 'lucide-react';
import heroImage from '@assets/VenusTheLastAscent_KeyArtHorizontal_01_1779741673571.jpg';
import mobileHeroImage from '@assets/VenusTheLastAscent_KeyArtVertical_01_notitle.jpg';
import logoImage from '@assets/VenusTheLastAscent_LogoWhite_Bold_Alpha_4096x1024_1779740028478.png';

const TRAILER_ID = '7JImB9CAwy0';
const STEAM_URL = 'https://store.steampowered.com/app/2640150/Venus_The_Last_Ascent/?beta=0';
const YOUTUBE_ORIGIN = 'https://www.youtube.com';

function sendYouTubeCommand(iframe: HTMLIFrameElement | null, func: string, args: string[]) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({
      event: 'command',
      func,
      args,
    }),
    YOUTUBE_ORIGIN,
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const [showTrailer, setShowTrailer] = useState(false);
  const backgroundVideoRef = useRef<HTMLIFrameElement>(null);
  const trailerVideoRef = useRef<HTMLIFrameElement>(null);

  const youtubeEmbedOrigin =
    typeof window === 'undefined' ? 'https://venusthelastascent.com' : window.location.origin;

  const backgroundVideoSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: TRAILER_ID,
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
      iv_load_policy: '3',
      disablekb: '1',
      hd: '1',
      vq: 'hd1080',
      origin: youtubeEmbedOrigin,
    });

    return `${YOUTUBE_ORIGIN}/embed/${TRAILER_ID}?${params.toString()}`;
  }, [youtubeEmbedOrigin]);

  const trailerVideoSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      enablejsapi: '1',
      hd: '1',
      vq: 'hd1080',
      origin: youtubeEmbedOrigin,
    });

    return `${YOUTUBE_ORIGIN}/embed/${TRAILER_ID}?${params.toString()}`;
  }, [youtubeEmbedOrigin]);

  const requestBestVideoQuality = (iframe: HTMLIFrameElement | null) => {
    sendYouTubeCommand(iframe, 'setPlaybackQuality', ['highres']);
    sendYouTubeCommand(iframe, 'setPlaybackQuality', ['hd1080']);
  };

  useEffect(() => {
    const qualityInterval = window.setInterval(
      () => requestBestVideoQuality(backgroundVideoRef.current),
      2500,
    );
    const stopQualityRequests = window.setTimeout(
      () => window.clearInterval(qualityInterval),
      15000,
    );

    return () => {
      window.clearInterval(qualityInterval);
      window.clearTimeout(stopQualityRequests);
    };
  }, []);

  useEffect(() => {
    if (!showTrailer) {
      return;
    }

    const qualityInterval = window.setInterval(
      () => requestBestVideoQuality(trailerVideoRef.current),
      2500,
    );
    const stopQualityRequests = window.setTimeout(
      () => window.clearInterval(qualityInterval),
      15000,
    );

    return () => {
      window.clearInterval(qualityInterval);
      window.clearTimeout(stopQualityRequests);
    };
  }, [showTrailer]);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-top md:hidden"
        style={{ backgroundImage: `url(${mobileHeroImage})` }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          ref={backgroundVideoRef}
          src={backgroundVideoSrc}
          title="Venus: The Last Ascent - Background Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="eager"
          onLoad={() => requestBestVideoQuality(backgroundVideoRef.current)}
          style={{ border: 'none' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.4)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(25,90%,55%,0.4)] to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 w-full">
          <h1 className="sr-only">{t.hero.title}</h1>

          <img
            src={logoImage}
            alt="Venus: The Last Ascent"
            className="w-full max-w-2xl h-auto mx-auto animate-fade-in"
            decoding="async"
            fetchPriority="high"
            data-testid="img-hero-logo"
          />

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
              asChild
              size="lg"
              className="bg-accent text-accent-foreground border border-accent-border min-w-[200px] border-glow-orange"
              data-testid="button-preorder-hero"
            >
              <a href={STEAM_URL} target="_blank" rel="noopener noreferrer">
                {t.nav.preOrder}
              </a>
            </Button>
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
              ref={trailerVideoRef}
              src={trailerVideoSrc}
              title="Venus: The Last Ascent - Trailer"
              className="w-full h-full rounded-md border border-[hsl(190,85%,50%,0.3)]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
              allowFullScreen
              onLoad={() => requestBestVideoQuality(trailerVideoRef.current)}
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
