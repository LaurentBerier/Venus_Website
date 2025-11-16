import World from '../World';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function WorldExample() {
  return (
    <LanguageProvider>
      <World />
    </LanguageProvider>
  );
}
