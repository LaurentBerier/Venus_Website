import Media from '../Media';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function MediaExample() {
  return (
    <LanguageProvider>
      <Media />
    </LanguageProvider>
  );
}
