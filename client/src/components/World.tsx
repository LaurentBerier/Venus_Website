import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import volcanoImage from '@assets/Venus_SurvivalA_TrailerA_04.00_00_45_24.Still007_1771944920654.jpg';
import cavernImage from '@assets/Venus_SurvivalA_TrailerA_04.00_00_52_10.Still006_1771944920654.jpg';
import cloudImage from '@assets/Venus_SurvivalA_TrailerA_04.00_01_20_08.Still012_1771944920656.jpg';

const locationImages = [volcanoImage, cavernImage, cloudImage];

export default function World() {
  const { t } = useLanguage();

  return (
    <section id="world" className="py-16 sm:py-24 bg-background/90 relative section-divider-glow" data-testid="section-world">
      <div className="absolute inset-0 bg-shimmer pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.world.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
            {t.world.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.world.locations.map((location, index) => (
            <Card
              key={index}
              className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer border-glow-cyan"
              data-testid={`card-location-${index}`}
            >
              <div className="aspect-video relative">
                <img
                  src={locationImages[index]}
                  alt={location.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-lg font-bold text-white tracking-wider uppercase">
                    {location.name}
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-foreground/70 text-sm">
                  {location.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
