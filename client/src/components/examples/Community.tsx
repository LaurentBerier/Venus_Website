import Community from '../Community';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function CommunityExample() {
  return (
    <LanguageProvider>
      <Community />
    </LanguageProvider>
  );
}
