import Header from '../Header';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function HeaderExample() {
  return (
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}
