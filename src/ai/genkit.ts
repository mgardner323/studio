import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is required');
}

export const genAI = new GoogleGenerativeAI(apiKey);
