import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Palette, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">About The Station</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Art, passion, and a commitment to quality in every tattoo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
                Welcome to The Station, a private tattoo studio where artistry and personal expression converge. Founded on a passion for timeless design and meticulous craftsmanship, our studio is more than just a place to get tattooed—it's a creative sanctuary.
            </p>
            <p>
                Our journey began with a simple goal: to create a comfortable, inspiring space where clients feel heard and valued. We believe the best tattoos come from a collaborative process, blending your unique vision with our artistic expertise. We are heavily influenced by both classic and contemporary art, from the bold lines of American traditional to the subtle shading of modern realism.
            </p>
            <p>
                At The Station, we are dedicated to providing a unique and personal experience for every client. Whether it's your first tattoo or an addition to your collection, we're here to guide you through the process and create a piece of art you'll cherish forever.
            </p>
        </div>
        <div>
          <Card className="overflow-hidden shadow-lg">
            <Image
              src="https://placehold.co/800x600.png"
              alt="A stylish and clean tattoo studio interior with a tattoo bed and equipment."
              width={800}
              height={600}
              className="object-cover w-full h-full"
              data-ai-hint="tattoo studio"
            />
          </Card>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary">Our Philosophy</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <Card>
                <CardHeader className="items-center">
                    <Palette className="w-10 h-10 text-accent mb-2" />
                    <CardTitle className="font-headline">Artistic Integrity</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    We approach every tattoo as a unique piece of art, ensuring the highest level of detail and creativity.
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="items-center">
                    <ShieldCheck className="w-10 h-10 text-accent mb-2" />
                    <CardTitle className="font-headline">Hygiene & Safety</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    Your health is our top priority. We adhere to the strictest hygiene standards, using single-use needles and sterilized equipment.
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="items-center">
                    <Sparkles className="w-10 h-10 text-accent mb-2" />
                    <CardTitle className="font-headline">Client Collaboration</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    We work closely with you to bring your vision to life, ensuring a result that you'll love for years to come.
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
