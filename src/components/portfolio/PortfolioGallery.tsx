"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const portfolioItems = [
  { id: 1, src: 'https://placehold.co/800x1000.png', alt: 'A vibrant watercolor tattoo of a phoenix on a back', style: 'Watercolor', hint: 'phoenix tattoo' },
  { id: 2, src: 'https://placehold.co/800x1000.png', alt: 'A detailed black and grey portrait of a woman with flowers in her hair', style: 'Realism', hint: 'woman portrait' },
  { id: 3, src: 'https://placehold.co/800x1000.png', alt: 'A traditional Japanese dragon sleeve tattoo in full color', style: 'Japanese', hint: 'dragon sleeve' },
  { id: 4, src: 'https://placehold.co/800x1000.png', alt: 'A bold blackwork tattoo of a geometric stag on a chest', style: 'Blackwork', hint: 'geometric stag' },
  { id: 5, src: 'https://placehold.co/800x1000.png', alt: 'A fine line tattoo of a solar system on an arm', style: 'Fine Line', hint: 'solar system' },
  { id: 6, src: 'https://placehold.co/800x1000.png', alt: 'A classic American traditional tattoo of a ship on the high seas', style: 'Traditional', hint: 'ship tattoo' },
  { id: 7, src: 'https://placehold.co/800x1000.png', alt: 'A surrealist tattoo of an eye morphing into a galaxy', style: 'Surrealism', hint: 'surreal eye' },
  { id: 8, src: 'https://placehold.co/800x1000.png', alt: 'An intricate mandala tattoo on a thigh with dotwork shading', style: 'Mandala', hint: 'mandala dotwork' },
  { id: 9, src: 'https://placehold.co/800x1000.png', alt: 'A biomechanical tattoo with exposed gears and wiring on a leg', style: 'Biomechanical', hint: 'biomechanical leg' },
];

export function PortfolioGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {portfolioItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
            onClick={() => setSelectedImage(item)}
          >
            <CardContent className="p-0">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={1000}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  data-ai-hint={item.hint}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 border-0">
          {selectedImage && (
            <div className="relative">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={1000}
                className="object-contain w-full h-full rounded-lg"
                data-ai-hint={selectedImage.hint}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
