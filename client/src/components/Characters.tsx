import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import pioneerImage from '@assets/Venus_SurvivalA_TrailerA_04.00_00_26_14.Still001_1771944920654.jpg';
import engineerImage from '@assets/Venus_SurvivalA_TrailerA_04.00_00_56_10.Still008_1771944920655.jpg';
import explorerImage from '@assets/Venus_SurvivalA_TrailerA_04.00_00_19_27.Still003_1771944920653.jpg';
import pilotImage from '@assets/Venus_SurvivalA_TrailerA_04.00_00_58_26.Still009_1771944920655.jpg';

export default function Characters() {
  const { t } = useLanguage();

  const companions = [
    { name: 'Dr. Vasquez', role: 'Chief Engineer', image: engineerImage },
    { name: 'Kira Nomura', role: 'Field Explorer', image: explorerImage },
    { name: 'Marcus Cole', role: 'Rover Pilot', image: pilotImage },
  ];

  return (
    <section id="characters" className="py-16 sm:py-24 bg-card/90 relative section-divider-glow" data-testid="section-characters">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.characters.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
            {t.characters.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="overflow-hidden hover-elevate border-glow-cyan">
            <div className="aspect-[4/5] relative">
              <img
                src={pioneerImage}
                alt={t.characters.pioneer.name}
                className="w-full h-full object-cover"
                data-testid="img-character-pioneer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-2">
                <h3 className="font-serif text-3xl font-bold tracking-wider uppercase">{t.characters.pioneer.name}</h3>
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">{t.characters.pioneer.title}</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  {t.characters.pioneer.description}
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {companions.map((companion, index) => (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 transition-all cursor-pointer overflow-hidden border-glow-cyan"
                data-testid={`card-companion-${index}`}
              >
                <CardContent className="p-0 flex items-center gap-4">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                    <img
                      src={companion.image}
                      alt={companion.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="py-4 pr-4">
                    <h4 className="font-serif text-lg font-bold text-foreground tracking-wider uppercase">{companion.name}</h4>
                    <p className="text-sm text-primary">{companion.role}</p>
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
