"use client";

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { tattooDesignGenerator, type TattooDesignGeneratorOutput } from '@/ai/flows/tattoo-design-generator';
import Image from 'next/image';
import { Loader2, Sparkles, UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const designFormSchema = z.object({
  description: z.string().min(10, { message: 'Please provide a more detailed description.' }),
  stylePreferences: z.string({ required_error: 'Please select a style.' }),
  referenceImage: z.any().refine(file => file?.length > 0, 'A reference image is required.'),
});

type DesignFormValues = z.infer<typeof designFormSchema>;

const tattooStyles = [
  "Traditional", "Realism", "Blackwork", "Geometric", "Fine Line", "Watercolor", "Japanese", "Tribal"
];

const fileToDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export function DesignGeneratorForm() {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TattooDesignGeneratorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<DesignFormValues>({
    resolver: zodResolver(designFormSchema),
  });
  
  const onSubmit = async (data: DesignFormValues) => {
    if (!executeRecaptcha) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "reCAPTCHA not available. Please try again.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
        // Execute reCAPTCHA
        const token = await executeRecaptcha('design_generator_submit');
        console.log("reCAPTCHA token:", token);

        const referenceImage = data.referenceImage[0];
        const imageDataURI = await fileToDataURI(referenceImage);

        // Here you would verify the reCAPTCHA token on your backend before processing
        const aiResult = await tattooDesignGenerator({
            description: data.description,
            stylePreferences: data.stylePreferences,
            referenceImage: imageDataURI,
        });
        
        setResult(aiResult);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Error Generating Design',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue('referenceImage', event.target.files);
    } else {
      setFileName("");
      form.setValue('referenceImage', null);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Create Your Design</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A majestic owl with its wings spread, perched on a crescent moon." {...field} rows={4}/>
                    </FormControl>
                    <FormDescription>The more detail, the better the result.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stylePreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tattoo style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tattooStyles.map(style => (
                          <SelectItem key={style} value={style}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="referenceImage"
                render={() => (
                  <FormItem>
                    <FormLabel>Reference Image</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                        <div className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md bg-card hover:bg-muted transition-colors">
                            {fileName ? (
                                <div className="flex flex-col items-center text-green-600">
                                    <CheckCircle className="w-8 h-8"/>
                                    <span className="mt-2 text-sm font-medium text-center break-all px-2">{fileName}</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-muted-foreground">
                                    <UploadCloud className="w-8 h-8"/>
                                    <span className="mt-2 text-sm font-medium">Click to upload an image</span>
                                </div>
                            )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Generate Design</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
            <p className="font-semibold">Generating your tattoo design...</p>
            <p className="text-sm text-center">This can take a moment. Please wait.</p>
          </div>
        )}
        {error && (
            <Card className="w-full bg-destructive/10 border-destructive/50">
                <CardHeader className="items-center text-center">
                    <AlertCircle className="w-12 h-12 text-destructive" />
                    <CardTitle className="text-destructive font-headline text-xl">Generation Failed</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-destructive/80">
                    <p>We couldn't generate the design. Please try again or adjust your prompt.</p>
                    <p className="text-xs mt-2">{error}</p>
                </CardContent>
            </Card>
        )}
        {result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Your AI-Generated Design</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg border">
                <Image
                  src={result.generatedImage}
                  alt="Generated tattoo design"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg font-headline">Design Idea</h4>
                <p className="text-muted-foreground">{result.designIdea}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && !error && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center border-2 border-dashed rounded-lg">
                <Sparkles className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold font-headline">Your design will appear here</h3>
                <p className="text-muted-foreground mt-2">Fill out the form to get started.</p>
            </div>
        )}
      </div>
    </div>
  );
}
