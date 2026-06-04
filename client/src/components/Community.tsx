import { useLanguage } from '@/lib/LanguageContext';
import { SiX, SiYoutube, SiInstagram, SiDiscord, SiFacebook, SiTiktok, SiBluesky } from 'react-icons/si';

export default function Community() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: SiX, label: 'X', url: 'https://twitter.com/BWallsStudio' },
    { icon: SiFacebook, label: 'Facebook', url: 'https://www.facebook.com/BreakingWallsStudio' },
    { icon: SiYoutube, label: 'YouTube', url: 'https://www.youtube.com/@BreakingWallsStudio' },
    { icon: SiInstagram, label: 'Instagram', url: 'https://www.instagram.com/breakingwallsstudio' },
    { icon: SiTiktok, label: 'TikTok', url: 'https://www.tiktok.com/@BreakingWallsStudio' },
    { icon: SiDiscord, label: 'Discord', url: 'https://discord.gg/3fgQNhYSS' },
    { icon: SiBluesky, label: 'Bluesky', url: 'https://bsky.app/profile/breakingwalls.bsky.social' },
  ];

  return (
    <section id="community" className="py-16 sm:py-24 bg-card/90 relative section-divider-glow" data-testid="section-community">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center lg:text-left mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.community.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
            {t.community.title}
          </h2>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
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
                aria-label={social.label}
              >
                <Icon className="h-8 w-8 text-foreground" />
                <span className="text-xs text-foreground/70">{social.label}</span>
              </a>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.breakingwalls.co/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
            data-testid="link-studio-website-community"
          >
            Visit breakingwalls.co
          </a>
        </div>
      </div>
    </section>
  );
}
