import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { Menu, X } from 'lucide-react';
import logoUrl from '@assets/osman-logo_1763257661241.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: t.nav.story, id: 'story' },
    { label: t.nav.features, id: 'features' },
    { label: t.nav.world, id: 'world' },
    { label: t.nav.characters, id: 'characters' },
    { label: t.nav.editions, id: 'editions' },
    { label: t.nav.media, id: 'media' },
    { label: t.nav.roadmap, id: 'roadmap' },
    { label: t.nav.community, id: 'community' },
  ];

  const languages: { code: 'en' | 'fr' | 'ar'; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 hover-elevate active-elevate-2 p-2 rounded-md"
            data-testid="button-logo"
          >
            <img src={logoUrl} alt="Osman Ghazi Logo" className="h-8 sm:h-10 w-auto" />
          </button>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-foreground/80 hover:text-foreground px-3 py-2 rounded-md hover-elevate active-elevate-2 transition-colors"
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 p-1 bg-card rounded-md border border-card-border">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    language === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover-elevate active-elevate-2'
                  }`}
                  data-testid={`button-lang-${lang.code}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={() => scrollToSection('editions')}
              className="hidden sm:inline-flex"
              data-testid="button-preorder-header"
            >
              {t.nav.preOrder}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-card-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover-elevate active-elevate-2"
                data-testid={`mobile-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-border flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-2 text-sm font-medium rounded transition-all ${
                    language === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover-elevate'
                  }`}
                  data-testid={`mobile-lang-${lang.code}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
