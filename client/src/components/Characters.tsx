import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import osmanPortrait from '@assets/osman-portrait_1763257661242.jpg';

export default function Characters() {
  const { t } = useLanguage();

  const companions = [
    { name: 'Ertuğrul Bey', role: 'Father & Mentor' },
    { name: 'Malhun Hatun', role: 'Beloved Wife' },
    { name: 'Turgut Alp', role: 'Loyal Commander' },
  ];

  return (
    <section id="characters" className="py-16 sm:py-24 bg-card" data-testid="section-characters">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t.characters.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {t.characters.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="overflow-hidden hover-elevate">
            <div className="aspect-[4/5] relative">
              <img
                src={osmanPortrait}
                alt={t.characters.osman.name}
                className="w-full h-full object-cover"
                data-testid="img-character-osman"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-2">
                <h3 className="font-serif text-3xl font-bold">{t.characters.osman.name}</h3>
                <p className="text-accent font-semibold">{t.characters.osman.title}</p>
                <p className="text-sm text-white/90 leading-relaxed">
                  {t.characters.osman.description}
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {companions.map((companion, index) => (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 transition-all cursor-pointer"
                data-testid={`card-companion-${index}`}
              >
                <CardContent className="p-0 flex items-center gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-center text-muted-foreground px-2">Character Portrait</span>
                  </div>
                  <div className="py-4 pr-4">
                    <h4 className="font-serif text-lg font-bold text-foreground">{companion.name}</h4>
                    <p className="text-sm text-foreground/70">{companion.role}</p>
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
