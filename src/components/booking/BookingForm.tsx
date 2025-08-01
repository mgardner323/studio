"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  artist: z.string({ required_error: "Please select an artist." }),
  description: z.string().min(10, { message: "Please provide a detailed description." }),
  placement: z.string().min(2, { message: "Please specify the placement." }),
  size: z.string().min(1, { message: "Please specify the approximate size." }),
  referenceImage: z.any().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const artists = [
  { value: "artist1", label: "Artist 1", email: "artist1@thestationink.com" },
  { value: "artist2", label: "Artist 2", email: "artist2@thestationink.com" },
];

export function BookingForm() {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      artist: "",
      description: "",
      placement: "",
      size: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (!executeRecaptcha) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "reCAPTCHA not available. Please try again.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('booking_form_submit');
      
      // Get the selected artist's email
      const selectedArtist = artists.find(artist => artist.value === data.artist);
      const artistEmail = selectedArtist?.email || "contact@thestationink.com";
      
      // Simulate API call with reCAPTCHA token verification
      console.log("Booking submission data:", data);
      console.log("Selected artist email:", artistEmail);
      console.log("reCAPTCHA token:", token);
      
      // Here you would verify the token on your backend
      // The referenceImage would be uploaded to Firebase Storage here.
      // For this example, we'll just simulate a delay.
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Consultation Request Sent!",
        description: "Thank you for your interest. We will get back to you within 2-3 business days.",
      });
      form.reset();
      setFileName("");
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jane.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Artist</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your preferred artist" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {artists.map(artist => (
                    <SelectItem key={artist.value} value={artist.value}>
                      {artist.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tattoo Idea / Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., A realistic lion with a geometric crown, surrounded by roses..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="placement"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Placement on Body</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Left forearm" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Approximate Size (in inches)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 4x6" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="referenceImage"
          render={({ field }) => (
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
                                    <span className="mt-2 text-sm font-medium">Click to upload or drag & drop</span>
                                </div>
                            )}
                        </div>
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Request"}
        </Button>
      </form>
    </Form>
  );
}
