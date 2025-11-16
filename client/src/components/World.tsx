import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export default function World() {
  const { t } = useLanguage();

  return (
    <section id="world" className="py-16 sm:py-24 bg-background" data-testid="section-world">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t.world.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {t.world.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.world.locations.map((location, index) => (
            <Card
              key={index}
              className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer"
              data-testid={`card-location-${index}`}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Location Image Placeholder</span>
                </div>
              </div>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {location.name}
                </h3>
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
