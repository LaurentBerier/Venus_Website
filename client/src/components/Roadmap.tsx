import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function Roadmap() {
  const { t } = useLanguage();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-primary" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-accent" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <section id="roadmap" className="py-16 sm:py-24 bg-background relative" data-testid="section-roadmap">
      <div className="absolute inset-0 bg-shimmer pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.roadmap.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase">
            {t.roadmap.title}
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-6 relative">
            {t.roadmap.milestones.map((milestone, index) => (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 transition-all border-glow-cyan"
                data-testid={`card-milestone-${index}`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    {getStatusIcon(milestone.status)}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 tracking-wider uppercase">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-primary">{milestone.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
