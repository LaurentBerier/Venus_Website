import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast({
      title: 'Transmission Sent!',
      description: 'We\'ll respond to your frequency soon.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-card relative" data-testid="section-contact">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.contact.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase">
            {t.contact.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-glow-cyan">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    required
                    data-testid="input-contact-message"
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-send-message">
                  {t.contact.send}
                </Button>
              </form>
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
                  High-resolution assets, logos, and media kit for press and content creators
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => console.log('Download press kit')}
                data-testid="button-download-presskit"
              >
                <Download className="mr-2 h-4 w-4" />
                {t.contact.downloadPress}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
