import { DesignGeneratorForm } from "@/components/design-generator/DesignGeneratorForm";

export default function DesignGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">AI Tattoo Design Generator</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Unleash your creativity. Describe your idea, choose a style, and upload a reference to see what our AI can come up with.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <DesignGeneratorForm />
      </div>
    </div>
  );
}
