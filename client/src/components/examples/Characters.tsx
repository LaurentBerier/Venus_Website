import Characters from '../Characters';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function CharactersExample() {
  return (
    <LanguageProvider>
      <Characters />
    </LanguageProvider>
  );
}
