import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench, Navigation, Shield, Pickaxe } from 'lucide-react';
import buildImg1 from '@assets/VenusTheLastAscent_Screenshot005A_1779744708156.png';
import buildImg2 from '@assets/VenusTheLastAscent_Screenshot006A_1779744708156.png';
import driveImg from '@assets/VenusTheLastAscent_Screenshot007A_1779744708157.png';
import exploreImg from '@assets/VenusTheLastAscent_Screenshot009A_1779744708157.png';

export default function Characters() {
  const { t } = useLanguage();

  const loopSteps = [
    {
      icon: Wrench,
      image: buildImg1,
      title: t.characters.loop[0].title,
      description: t.characters.loop[0].description,
    },
    {
      icon: Pickaxe,
      image: buildImg2,
      title: t.characters.loop[1].title,
      description: t.characters.loop[1].description,
    },
    {
      icon: Shield,
      image: driveImg,
      title: t.characters.loop[2].title,
      description: t.characters.loop[2].description,
    },
    {
      icon: Navigation,
      image: exploreImg,
      title: t.characters.loop[3].title,
      description: t.characters.loop[3].description,
    },
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

        <div className="mb-10">
          <Card className="overflow-hidden border-glow-cyan">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-[4/3] lg:aspect-auto relative">
                <img
                  src={exploreImg}
                  alt="Player approaching the rolling fortress on Venus"
                  className="w-full h-full object-cover"
                  data-testid="img-fortress-hero"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-4 bg-card">
                <p className="text-primary font-semibold uppercase tracking-widest text-sm">
                  {t.characters.pioneer.title}
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-wider uppercase heading-glow">
                  {t.characters.pioneer.name}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t.characters.pioneer.description}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loopSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden hover-elevate active-elevate-2 transition-all border-glow-cyan"
                data-testid={`card-loop-${index}`}
              >
                <div className="aspect-video relative">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 rounded-md bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/40">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-serif text-base font-bold text-foreground tracking-wider uppercase">
                    {step.title}
                  </h4>
                  <p className="text-foreground/70 text-xs leading-relaxed">
                    {step.description}
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
