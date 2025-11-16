import Footer from '../Footer';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function FooterExample() {
  return (
    <LanguageProvider>
      <Footer />
    </LanguageProvider>
  );
}
