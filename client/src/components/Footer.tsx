import { useLanguage } from '@/lib/LanguageContext';
import { SiX, SiYoutube, SiInstagram, SiDiscord } from 'react-icons/si';
import logoImage from '@assets/VenusTheLastAscent_LogoWhite_Bold_Alpha_4096x1024_1779740028478.png';

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: 'en' | 'fr'; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
  ];

  const socialLinks = [
    { icon: SiX, label: 'X', url: '#' },
    { icon: SiYoutube, label: 'YouTube', url: 'https://youtu.be/pBjmzr_CL8s' },
    { icon: SiInstagram, label: 'Instagram', url: '#' },
    { icon: SiDiscord, label: 'Discord', url: '#' },
  ];

  return (
    <footer className="bg-card/90 border-t border-[hsl(190,85%,50%,0.1)]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logoImage} alt="Venus: The Last Ascent" className="h-10 w-auto mb-4" />
            <p className="text-sm text-foreground/70">
              Build a rolling fortress, survive Venus, and fight your way to the last city above the clouds.
            </p>
            <p className="text-xs text-foreground/50 mt-2">
              Breaking Walls &mdash; Montreal, Canada
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  data-testid="link-privacy"
                >
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  data-testid="link-terms"
                >
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a
                  href="https://store.steampowered.com/app/2640150/Venus_The_Last_Ascent/?beta=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  data-testid="link-steam-footer"
                >
                  Steam Page
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">Language</h3>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-2 text-sm font-medium rounded transition-all ${
                    language === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover-elevate'
                  }`}
                  data-testid={`footer-lang-${lang.code}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[hsl(190,85%,50%,0.1)]">
          <p className="text-sm text-foreground/60">{t.footer.copyright}</p>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
