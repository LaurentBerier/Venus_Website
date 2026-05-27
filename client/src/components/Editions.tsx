import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import keyArtImage from '@assets/VenusTheLastAscent_KeyArtHorizontal_01_1779741673571.jpg';

const STEAM_URL = 'https://store.steampowered.com/app/2640150/Venus_The_Last_Ascent/?beta=0';

export default function Editions() {
  const { t } = useLanguage();

  const editions = [
    {
      name: t.editions.standard.name,
      price: t.editions.standard.price,
      items: t.editions.standard.items,
      featured: false,
    },
    {
      name: t.editions.deluxe.name,
      price: t.editions.deluxe.price,
      items: t.editions.deluxe.items,
      featured: true,
    },
    {
      name: t.editions.collectors.name,
      price: t.editions.collectors.price,
      items: t.editions.collectors.items,
      featured: false,
    },
  ];

  return (
    <section id="editions" className="py-16 sm:py-24 bg-background/90 relative section-divider-glow" data-testid="section-editions">
      <div className="absolute inset-0 bg-shimmer pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.editions.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
            {t.editions.title}
          </h2>
        </div>

        <div className="mb-12">
          <Card className="overflow-hidden border-glow-cyan">
            <div className="aspect-video relative">
              <img
                src={keyArtImage}
                alt="Venus: The Last Ascent - Key Art"
                className="w-full h-full object-cover"
                data-testid="img-keyart"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {editions.map((edition, index) => (
            <Card
              key={index}
              className={`hover-elevate active-elevate-2 transition-all ${
                edition.featured ? 'ring-2 ring-primary border-glow-cyan' : ''
              }`}
              data-testid={`card-edition-${index}`}
            >
              {edition.featured && (
                <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold uppercase tracking-wider">
                  Full Game
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-serif text-2xl tracking-wider uppercase">{edition.name}</CardTitle>
                <p className="text-3xl font-bold text-primary">{edition.price}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {edition.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={edition.featured ? 'default' : 'outline'}
                  onClick={() => window.open(STEAM_URL, '_blank')}
                  data-testid={`button-preorder-${index}`}
                >
                  Get It Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
