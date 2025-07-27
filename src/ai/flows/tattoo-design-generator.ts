'use server';

/**
 * @fileOverview AI tool to generate tattoo design ideas based on user descriptions and style preferences.
 *
 * - tattooDesignGenerator - A function that handles the tattoo design generation process.
 * - TattooDesignGeneratorInput - The input type for the tattooDesignGenerator function.
 * - TattooDesignGeneratorOutput - The return type for the tattooDesignGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return tattooDesignGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tattooDesignGeneratorPrompt',
  input: {schema: TattooDesignGeneratorInputSchema},
  output: {schema: TattooDesignGeneratorOutputSchema},
  prompt: `You are an expert tattoo artist specializing in generating unique tattoo designs based on user descriptions and style preferences.

You will use the provided information to generate a tattoo design idea, providing a detailed textual description and generating an image of the design.

Description: {{{description}}}
Style Preferences: {{{stylePreferences}}}
Reference Image: {{media url=referenceImage}}

Please generate a unique tattoo design idea based on the provided description, style preferences, and reference image. The design idea should be detailed and visually appealing, suitable for a tattoo.
`,
});

const tattooDesignGeneratorFlow = ai.defineFlow(
  {
    name: 'tattooDesignGeneratorFlow',
    inputSchema: TattooDesignGeneratorInputSchema,
    outputSchema: TattooDesignGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.referenceImage}},
        {text: `generate a tattoo design based on this image, incorporating the following description: ${input.description}, and style preferences: ${input.stylePreferences}`},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });
    return {
      designIdea: output?.designIdea || 'No design idea generated.',
      generatedImage: media.url,
    };
  }
);
