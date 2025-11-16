import Story from '../Story';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function StoryExample() {
  return (
    <LanguageProvider>
      <Story />
    </LanguageProvider>
  );
}
