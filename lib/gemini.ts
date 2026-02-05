import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface DreamInterpretation {
    summary: string;
    deepInterpretation: string;
    luckyKeywords: string[];
    luckyItem: string;
    luckyColor: string;
    luckyNumber: string;
    rarityScore: number;
    rarityTier: string; // "Common", "Rare", "Epic", "Legendary"
}

export type InterpretationType = 'general' | 'wealth' | 'romance' | 'creative';

export async function interpretDream(dreamDescription: string, type: InterpretationType = 'general'): Promise<DreamInterpretation> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        let focusPrompt = "Analyze this dream from a general psychological perspective.";
        if (type === 'wealth') {
            focusPrompt = "Analyze this dream focusing on financial luck, success, and wealth opportunities. Interpret symbols in the context of money and career.";
        } else if (type === 'romance') {
            focusPrompt = "Analyze this dream focusing on love, relationships, and emotional connections. Interpret symbols in the context of romance and dating.";
        } else if (type === 'creative') {
            focusPrompt = "Analyze this dream as a source of creative inspiration. Interpret abstract symbols to spark artistic or innovative ideas.";
        }

        const prompt = `${focusPrompt}

CRITICAL LANGUAGE INSTRUCTION:
1. Detect the language of the Dream description below.
2. If the dream is in KOREAN, the ENTIRE JSON response (summary, deepInterpretation, luckyKeywords, luckyItem, luckyColor) MUST be in KOREAN.
3. If the dream is in another language (Spanish, Japanese, etc.), response MUST be in that SAME language.
4. Only use English if the dream is in English.

Required Output Fields:
1) summary: A brief summary (2-3 sentences)
2) deepInterpretation: A deep interpretation based on the focus area (4-5 sentences)
3) luckyKeywords: Three lucky keywords or symbols
4) luckyItem: A specific lucky item related to the dream
5) luckyColor: A lucky color
6) luckyNumber: A lucky number
7) rarityScore: A "Rarity Score" (0-100) based on importance.
8) rarityTier: "Common", "Rare", "Epic", or "Legendary"

Dream description: "${dreamDescription}"

REMINDER: The output language MUST MATCH the language of the dream description above.

Please respond ONLY with valid JSON in this exact format:
{
  "summary": "your summary here",
  "deepInterpretation": "your deep interpretation here",
  "luckyKeywords": ["keyword1", "keyword2", "keyword3"],
  "luckyItem": "item name",
  "luckyColor": "color name",
  "luckyNumber": "number",
  "rarityScore": 85,
  "rarityTier": "Epic"
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
