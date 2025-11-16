import Hero from '../Hero';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function HeroExample() {
  return (
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );
}
