import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { SiX, SiFacebook, SiYoutube, SiInstagram, SiDiscord, SiTwitch } from 'react-icons/si';

export default function Community() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const socialLinks = [
    { icon: SiX, label: 'X', url: '#' },
    { icon: SiFacebook, label: 'Facebook', url: '#' },
    { icon: SiYoutube, label: 'YouTube', url: '#' },
    { icon: SiInstagram, label: 'Instagram', url: '#' },
    { icon: SiDiscord, label: 'Discord', url: '#' },
    { icon: SiTwitch, label: 'Twitch', url: '#' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    toast({
      title: 'Enlisted!',
      description: 'Welcome to the colony, survivor.',
    });
    setEmail('');
  };

  return (
    <section id="community" className="py-16 sm:py-24 bg-card relative" data-testid="section-community">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center lg:text-left mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.community.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase">
            {t.community.title}
          </h2>
        </div>

        <Card className="mb-8 border-glow-cyan">
          <CardContent className="p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-foreground tracking-wider uppercase">
              {t.community.newsletter}
            </h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder={t.community.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-subscribe">
                {t.community.subscribe}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-md bg-background hover-elevate active-elevate-2 transition-all"
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <Icon className="h-8 w-8 text-foreground" />
                <span className="text-xs text-foreground/70">{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
