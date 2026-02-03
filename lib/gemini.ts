import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface DreamInterpretation {
    summary: string;
    deepInterpretation: string;
    luckyKeywords: string[];
}

export async function interpretDream(dreamDescription: string): Promise<DreamInterpretation> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

        const prompt = `Analyze this dream from a psychological perspective.
IMPORTANT: Detect the language of the dream description below and provide the response in that SAME language.

Provide:
1) A brief summary (2-3 sentences)
2) A deep interpretation explaining the psychological meaning and symbolism (4-5 sentences)
3) Three lucky keywords or symbols from the dream

Dream description: "${dreamDescription}"

Please respond ONLY with valid JSON in this exact format:
{
  "summary": "your summary here",
  "deepInterpretation": "your deep interpretation here",
  "luckyKeywords": ["keyword1", "keyword2", "keyword3"]
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response (in case there's extra text)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Invalid response format from AI');
        }

        const interpretation: DreamInterpretation = JSON.parse(jsonMatch[0]);

        return interpretation;
    } catch (error) {
        console.error('Error interpreting dream:', error);
        throw new Error('Failed to interpret dream. Please try again.');
    }
}
