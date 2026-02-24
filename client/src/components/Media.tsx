import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import img1 from '@assets/Venus_SurvivalA_TrailerA_04.00_00_18_23.Still002_1771944920653.jpg';
import img2 from '@assets/Venus_SurvivalA_TrailerA_04.00_00_28_05.Still004_1771944920654.jpg';
import img3 from '@assets/Venus_SurvivalA_TrailerA_04.00_00_32_21.Still005_1771944920654.jpg';
import img4 from '@assets/Venus_SurvivalA_TrailerA_04.00_00_45_24.Still007_1771944920654.jpg';
import img5 from '@assets/Venus_SurvivalA_TrailerA_04.00_01_02_02.Still010_1771944920655.jpg';
import img6 from '@assets/Venus_SurvivalA_TrailerA_04.00_01_15_13.Still011_1771944920655.jpg';

export default function Media() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const screenshots = [
    { src: img1, alt: 'Crash site on Venus surface with burning wreckage' },
    { src: img2, alt: 'Energy weapon in action against alien crystals' },
    { src: img3, alt: 'Holographic vehicle construction blueprint' },
    { src: img4, alt: 'Massive mobile base with lava flows in background' },
    { src: img5, alt: 'Co-op construction of a large mobile fortress' },
    { src: img6, alt: 'Venus sunset with base silhouette and energy beam' },
  ];

  return (
    <section id="media" className="py-16 sm:py-24 bg-card relative" data-testid="section-media">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.media.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase">
            {t.media.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {screenshots.map((screenshot, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all border-glow-cyan"
              onClick={() => setSelectedImage(screenshot.src)}
              data-testid={`card-screenshot-${index}`}
            >
              <div className="aspect-video relative">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden" data-testid="dialog-image-viewer">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            data-testid="button-close-modal"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size preview"
              className="w-full h-auto"
              data-testid="img-modal-preview"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
