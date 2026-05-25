import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import img1 from '@assets/VenusTheLastAscent_Screenshot001A_1779741685978.png';
import img2 from '@assets/VenusTheLastAscent_Screenshot002A_1779741685978.png';
import img3 from '@assets/VenusTheLastAscent_Screenshot003A_1779741685978.png';
import img4 from '@assets/VenusTheLastAscent_Screenshot004A_1779741685978.png';
import img5 from '@assets/VenusTheLastAscent_Screenshot005A_1779741685979.png';
import img6 from '@assets/VenusTheLastAscent_Screenshot006A_1779741685979.png';
import img7 from '@assets/VenusTheLastAscent_Screenshot007A_1779741685979.png';
import img8 from '@assets/VenusTheLastAscent_Screenshot008A_1779741685979.png';
import img9 from '@assets/VenusTheLastAscent_Screenshot009A_1779741685980.png';
import img10 from '@assets/VenusTheLastAscent_Screenshot010A_1779741685980.png';
import img11 from '@assets/VenusTheLastAscent_Screenshot011A_1779741685980.png';
import img12 from '@assets/VenusTheLastAscent_Screenshot012A_1779741685980.png';

export default function Media() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const screenshots = [
    { src: img1, alt: 'Venus: The Last Ascent - Screenshot 1' },
    { src: img2, alt: 'Venus: The Last Ascent - Screenshot 2' },
    { src: img3, alt: 'Venus: The Last Ascent - Screenshot 3' },
    { src: img4, alt: 'Venus: The Last Ascent - Screenshot 4' },
    { src: img5, alt: 'Venus: The Last Ascent - Screenshot 5' },
    { src: img6, alt: 'Venus: The Last Ascent - Screenshot 6' },
    { src: img7, alt: 'Venus: The Last Ascent - Screenshot 7' },
    { src: img8, alt: 'Venus: The Last Ascent - Screenshot 8' },
    { src: img9, alt: 'Venus: The Last Ascent - Screenshot 9' },
    { src: img10, alt: 'Venus: The Last Ascent - Screenshot 10' },
    { src: img11, alt: 'Venus: The Last Ascent - Screenshot 11' },
    { src: img12, alt: 'Venus: The Last Ascent - Screenshot 12' },
  ];

  return (
    <section id="media" className="py-16 sm:py-24 bg-card/90 relative section-divider-glow" data-testid="section-media">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(190,85%,50%,0.2)] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">
            {t.media.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-wide uppercase heading-glow">
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
