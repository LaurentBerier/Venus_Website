import Contact from '../Contact';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function ContactExample() {
  return (
    <LanguageProvider>
      <Contact />
    </LanguageProvider>
  );
}
