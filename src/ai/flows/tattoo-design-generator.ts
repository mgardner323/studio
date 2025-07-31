'use server';

/**
 * @fileOverview AI tool to generate tattoo design ideas based on user descriptions and style preferences.
 *
 * - tattooDesignGenerator - A function that handles the tattoo design generation process.
 * - TattooDesignGeneratorInput - The input type for the tattooDesignGenerator function.
 * - TattooDesignGeneratorOutput - The return type for the tattooDesignGenerator function.
 */

import { genAI } from '@/ai/genkit';
import { z } from 'zod';

const TattooDesignGeneratorInputSchema = z.object({
  description: z.string().describe('A detailed description of the desired tattoo.'),
  stylePreferences: z.string().describe('The preferred style of the tattoo (e.g., traditional, realism, blackwork).'),
  referenceImage: z
    .string()
    .describe(
      "A reference image for the tattoo idea, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TattooDesignGeneratorInput = z.infer<typeof TattooDesignGeneratorInputSchema>;

const TattooDesignGeneratorOutputSchema = z.object({
  designIdea: z.string().describe('A detailed description of the generated tattoo design idea.'),
  generatedImage: z.string().describe('A generated image of the tattoo design as a data URI.'),
});
export type TattooDesignGeneratorOutput = z.infer<typeof TattooDesignGeneratorOutputSchema>;

export async function tattooDesignGenerator(input: TattooDesignGeneratorInput): Promise<TattooDesignGeneratorOutput> {
  try {
    // Generate design description using text model
    const textModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `You are an expert tattoo artist specializing in generating unique tattoo designs based on user descriptions and style preferences.

Description: ${input.description}
Style Preferences: ${input.stylePreferences}

Please generate a detailed tattoo design idea based on the provided description and style preferences. The design idea should be detailed and visually appealing, suitable for a tattoo. Respond with just the design description.`;

    const textResult = await textModel.generateContent(prompt);
    const designIdea = textResult.response.text();

    // Generate image using image generation model
    const imageModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Convert data URI to part for Gemini
    const referenceImagePart = {
      inlineData: {
        data: input.referenceImage.split(',')[1], // Remove data:image/...;base64, prefix
        mimeType: input.referenceImage.split(';')[0].split(':')[1] // Extract mime type
      }
    };

    const imagePrompt = `Generate a tattoo design based on this reference image, incorporating the following description: ${input.description}, and style preferences: ${input.stylePreferences}`;
    
    const imageResult = await imageModel.generateContent([
      imagePrompt,
      referenceImagePart
    ]);

    // Note: Gemini doesn't directly generate images in the current API
    // For now, we'll return the text description and a placeholder for the image
    // You may need to integrate with a different image generation service
    
    return {
      designIdea: designIdea,
      generatedImage: 'data:image/png;base64,placeholder' // Placeholder - would need actual image generation service
    };
  } catch (error) {
    console.error('Error generating tattoo design:', error);
    throw new Error('Failed to generate tattoo design');
  }
}
