import Editions from '../Editions';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function EditionsExample() {
  return (
    <LanguageProvider>
      <Editions />
    </LanguageProvider>
  );
}
