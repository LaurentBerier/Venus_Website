import Roadmap from '../Roadmap';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function RoadmapExample() {
  return (
    <LanguageProvider>
      <Roadmap />
    </LanguageProvider>
  );
}
