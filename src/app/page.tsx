import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { Brush, Calendar, Clapperboard } from 'lucide-react';

export default function Home() {
  const featuredWork = [
    { src: 'https://placehold.co/600x800.png', alt: 'A detailed black and grey realism tattoo of a lion on a forearm.', hint: 'lion tattoo' },
    { src: 'https://placehold.co/600x800.png', alt: 'A vibrant American traditional tattoo of a rose and dagger.', hint: 'rose dagger' },
    { src: 'https://placehold.co/600x800.png', alt: 'An intricate geometric dotwork tattoo on a back shoulder.', hint: 'geometric tattoo' },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full text-center py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">The Station Ink</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Crafting timeless tattoos with precision and passion. Specializing in traditional, realism, and blackwork styles.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/booking">Book a Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold">Welcome to The Station</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            At The Station, we believe that tattoos are more than just ink on skin; they are a form of self-expression, a piece of art, and a personal story. Our studio provides a clean, safe, and inspiring environment where your vision can come to life. With years of experience and a dedication to our craft, we work collaboratively with each client to create a unique and meaningful tattoo that you'll be proud to wear for a lifetime.
          </p>
        </div>
      </section>

      <Separator className="w-2/3 mx-auto" />

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-12">Featured Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredWork.map((work, index) => (
              <Card key={index} className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="aspect-[3/4] overflow-hidden">
                    <Image
                      src={work.src}
                      alt={work.alt}
                      width={600}
                      height={800}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={work.hint}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="w-2/3 mx-auto" />
      
      <section className="w-full py-16 md:py-24 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Brush className="w-12 h-12 text-accent" />
              <h3 className="mt-4 text-2xl font-headline font-semibold">Custom Designs</h3>
              <p className="mt-2 text-muted-foreground">Bring your idea, and we'll craft a unique design just for you.</p>
            </div>
            <div className="flex flex-col items-center">
              <Calendar className="w-12 h-12 text-accent" />
              <h3 className="mt-4 text-2xl font-headline font-semibold">Easy Booking</h3>
              <p className="mt-2 text-muted-foreground">Schedule your consultation and appointment through our simple online form.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clapperboard className="w-12 h-12 text-accent" />
              <h3 className="mt-4 text-2xl font-headline font-semibold">AI Design Ideas</h3>
              <p className="mt-2 text-muted-foreground">Use our AI tool to brainstorm and visualize your next tattoo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
