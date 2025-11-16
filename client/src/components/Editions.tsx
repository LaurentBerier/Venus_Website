import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import keyArtImage from '@assets/keyart-deluxe_1763257661241.jpg';

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
    <section id="editions" className="py-16 sm:py-24 bg-background" data-testid="section-editions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t.editions.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {t.editions.title}
          </h2>
        </div>

        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={keyArtImage}
                alt="Game Key Art"
                className="w-full h-full object-cover"
                data-testid="img-keyart"
              />
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {editions.map((edition, index) => (
            <Card
              key={index}
              className={`hover-elevate active-elevate-2 transition-all ${
                edition.featured ? 'ring-2 ring-accent' : ''
              }`}
              data-testid={`card-edition-${index}`}
            >
              {edition.featured && (
                <div className="bg-accent text-accent-foreground text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-serif text-2xl">{edition.name}</CardTitle>
                <p className="text-3xl font-bold text-accent">{edition.price}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {edition.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={edition.featured ? 'default' : 'outline'}
                  onClick={() => console.log(`Pre-order ${edition.name} clicked`)}
                  data-testid={`button-preorder-${index}`}
                >
                  Pre-Order Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-md p-4 max-w-md mx-auto">
          <p className="text-xs text-muted-foreground mb-2 text-center">Advertisement</p>
          <div className="h-64 bg-muted/20 rounded flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Medium Rectangle Ad (300x250)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
