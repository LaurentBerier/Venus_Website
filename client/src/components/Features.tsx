import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Sword, Map, Crown, BookOpen, TrendingUp, Users } from 'lucide-react';

const icons = [Sword, Map, Crown, BookOpen, TrendingUp, Users];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-16 sm:py-24 bg-card" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t.features.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {t.features.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 transition-all cursor-pointer"
                data-testid={`card-feature-${index}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">
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
