import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery';

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Our Work</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of our favorite pieces. We take pride in every tattoo we create, focusing on quality, artistry, and collaboration with our clients.
        </p>
      </div>
      <PortfolioGallery />
    </div>
  );
}
