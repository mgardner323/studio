"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const portfolioItems = [
  { id: 1, src: 'https://placehold.co/800x1000.png', alt: 'Fine line floral tattoo on forearm', style: 'Fine Line', hint: 'floral tattoo' },
  { id: 2, src: 'https://placehold.co/800x1000.png', alt: 'Geometric wolf head tattoo on thigh', style: 'Geometric', hint: 'geometric wolf' },
  { id: 3, src: 'https://placehold.co/800x1000.png', alt: 'Japanese style dragon sleeve', style: 'Japanese', hint: 'dragon sleeve' },
  { id: 4, src: 'https://placehold.co/800x1000.png', alt: 'Blackwork skull and roses tattoo', style: 'Blackwork', hint: 'skull roses' },
  { id: 5, src: 'https://placehold.co/800x1000.png', alt: 'Realistic lion portrait on chest', style: 'Realism', hint: 'lion portrait' },
  { id: 6, src: 'https://placehold.co/800x1000.png', alt: 'American traditional eagle tattoo', style: 'Traditional', hint: 'eagle tattoo' },
  { id: 7, src: 'https://placehold.co/800x1000.png', alt: 'Watercolor style hummingbird tattoo', style: 'Watercolor', hint: 'hummingbird tattoo' },
  { id: 8, src: 'https://placehold.co/800x1000.png', alt: 'Intricate mandala back piece', style: 'Mandala', hint: 'mandala back' },
  { id: 9, src: 'https://placehold.co/800x1000.png', alt: 'Minimalist wave tattoo on ankle', style: 'Minimalist', hint: 'wave tattoo' },
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
