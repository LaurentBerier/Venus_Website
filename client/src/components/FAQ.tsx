import { useLanguage } from '@/lib/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-16 sm:py-24 bg-background/90 relative section-divider-glow" data-testid="section-faq">
      <div className="absolute inset-0 bg-shimmer pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.faq.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
            {t.faq.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {t.faq.items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-[hsl(190,85%,50%,0.15)] rounded-md px-6 data-[state=open]:bg-card data-[state=open]:border-glow-cyan"
              data-testid={`accordion-faq-${index}`}
            >
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline tracking-wider">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
