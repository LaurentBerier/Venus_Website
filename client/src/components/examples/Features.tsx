import Features from '../Features';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function FeaturesExample() {
  return (
    <LanguageProvider>
      <Features />
    </LanguageProvider>
  );
}
