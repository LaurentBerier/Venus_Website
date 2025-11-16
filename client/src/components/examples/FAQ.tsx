import FAQ from '../FAQ';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function FAQExample() {
  return (
    <LanguageProvider>
      <FAQ />
    </LanguageProvider>
  );
}
