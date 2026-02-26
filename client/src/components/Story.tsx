import { useLanguage } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import storyImage from '@assets/Venus_SurvivalA_TrailerA_04.00_00_26_14.Still001_1771944920654.jpg';

export default function Story() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-16 sm:py-24 bg-background/90 relative section-divider-glow" data-testid="section-story">
      <div className="absolute inset-0 bg-shimmer pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                {t.story.subtitle}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
                {t.story.title}
              </h2>
            </div>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              {t.story.content}
            </p>
          </div>

          <Card className="overflow-hidden hover-elevate border-glow-cyan">
            <div className="aspect-[16/9] relative">
              <img
                src={storyImage}
                alt="The Pioneer"
                className="w-full h-full object-cover"
                data-testid="img-story-portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-2xl font-bold tracking-wider uppercase">{t.characters.pioneer.name}</h3>
                <p className="text-sm text-primary">{t.characters.pioneer.title}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
