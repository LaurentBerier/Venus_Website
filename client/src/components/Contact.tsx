import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2 } from 'lucide-react';

const PRESS_KIT_URL = 'https://breakingwalls.notion.site/Press-Kit-36b4306583c6809aa562ccea0bfad029';
const CONTACT_EMAIL = 'info@breakingwalls.co';

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || t.contact.errorDescription);
      }

      toast({
        title: t.contact.sentTitle,
        description: t.contact.sentDescription,
      });
      setFormData({ name: '', email: '', message: '', company: '' });
    } catch (error) {
      toast({
        title: t.contact.errorTitle,
        description: error instanceof Error ? error.message : t.contact.errorDescription,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-card/90 relative section-divider-glow" data-testid="section-contact">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.contact.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
            {t.contact.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-glow-cyan">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                    {t.contact.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="input-contact-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                    {t.contact.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="input-contact-email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                    {t.contact.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    minLength={10}
                    required
                    data-testid="input-contact-message"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-send-message"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    t.contact.send
                  )}
                </Button>
              </form>
              <p className="text-xs text-foreground/50 mt-4 text-center">
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate active-elevate-2 transition-all border-glow-orange">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full space-y-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Download className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2 tracking-wider uppercase">
                  {t.contact.press}
                </h3>
                <p className="text-foreground/70 text-sm mb-6">
                  High-resolution assets, logos, screenshots, and media kit for press and content creators
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                data-testid="button-download-presskit"
              >
                <a href={PRESS_KIT_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  {t.contact.downloadPress}
                </a>
              </Button>
              <p className="text-xs text-foreground/50">
                Press contact: Nathanael Dufour
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
