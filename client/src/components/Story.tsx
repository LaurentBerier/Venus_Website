import { useLanguage } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import osmanPortrait from '@assets/osman-portrait_1763257661242.jpg';

export default function Story() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-16 sm:py-24 bg-background" data-testid="section-story">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider">
                {t.story.subtitle}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                {t.story.title}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              {t.story.content}
            </p>
          </div>

          <Card className="overflow-hidden hover-elevate">
            <div className="aspect-[3/4] relative">
              <img
                src={osmanPortrait}
                alt="Osman Ghazi"
                className="w-full h-full object-cover"
                data-testid="img-osman-portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-2xl font-bold">{t.characters.osman.name}</h3>
                <p className="text-sm text-white/80">{t.characters.osman.title}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
