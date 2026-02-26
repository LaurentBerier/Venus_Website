import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Building2, Cpu, Car, CloudLightning, Users } from 'lucide-react';

const icons = [Shield, Building2, Cpu, Car, CloudLightning, Users];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 sm:py-24 bg-card/90 relative section-divider-glow" data-testid="section-features">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.features.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
            {t.features.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 transition-all cursor-pointer border-glow-cyan"
                data-testid={`card-feature-${index}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground tracking-wider uppercase">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
