import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { message, dreamContext, chatHistory } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Check apiKey
        const hasApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '';

        if (!hasApiKey) {
            // Demo response
            return NextResponse.json({
                response: "This is a demo response. To chat with the AI about your dream specifically, please configure your Gemini API key."
            });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

        const systemPrompt = `
You are a mystical and wise dream interpreter AI.
You are currently discussing a user's dream.

Context:
Dream Description: "${dreamContext.dreamDescription}"
Initial Interpretation Summary: "${dreamContext.initialinterpretation}"

Your goal is to answer the user's follow-up questions about their dream with insight, empathy, and a touch of mystery.
Keep your answers concise (2-3 sentences) but meaningful.
Maintain a supportive and mystical tone.
If the user asks about lucky numbers or items again, feel free to elaborate on why they were chosen.

CRITICAL: Reply in the SAME language as the user's latest message. If the user writes in Korean, reply in Korean. If Spanish, reply in Spanish. Do not default to English.
`;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "I understand. I am ready to explore the depths of this dream with you." }],
                },
                ...chatHistory.map((msg: any) => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }],
                })),
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({ response });

    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Failed to generate chat response' },
            { status: 500 }
        );
    }
}
