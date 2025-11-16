import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import heroImage from '@assets/hero-rider_1763257661241.jpg';
import keyArtImage from '@assets/keyart-deluxe_1763257661241.jpg';
import osmanPortrait from '@assets/osman-portrait_1763257661242.jpg';

export default function Media() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const screenshots = [
    { src: heroImage, alt: 'Epic horseback riding across Anatolian landscapes' },
    { src: keyArtImage, alt: 'Osman Ghazi character showcase' },
    { src: osmanPortrait, alt: 'Close-up of the legendary founder' },
    { src: heroImage, alt: 'Cinematic gameplay screenshot' },
    { src: keyArtImage, alt: 'Battle scene preview' },
    { src: osmanPortrait, alt: 'Character detail' },
  ];

  return (
    <section id="media" className="py-16 sm:py-24 bg-card" data-testid="section-media">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            {t.media.subtitle}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {t.media.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {screenshots.map((screenshot, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 transition-all"
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
