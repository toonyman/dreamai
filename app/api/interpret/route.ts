import { NextRequest, NextResponse } from 'next/server';
import { interpretDream } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const { dream } = await request.json();

        if (!dream || typeof dream !== 'string') {
            return NextResponse.json(
                { error: 'Dream description is required' },
                { status: 400 }
            );
        }

        // Check if Gemini API key is configured
        const hasApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '';

        if (!hasApiKey) {
            // Return demo interpretation when API key is not configured
            console.log('🎭 Demo mode - No Gemini API key configured');
            return NextResponse.json({
                interpretation: {
                    summary: "This is a demo interpretation. Your dream suggests themes of exploration and discovery. The imagery reflects your subconscious processing daily experiences.",
                    deepInterpretation: "From a psychological perspective, this dream represents your mind's way of organizing thoughts and emotions. The symbols you encountered may relate to your current life situation, aspirations, or concerns. Dreams often serve as a bridge between conscious and unconscious, helping you process complex feelings. To receive actual AI analysis, please configure your Gemini API key.",
                    luckyKeywords: ["discovery", "growth", "transformation"]
                },
                cached: false,
                demo: true
            });
        }

        // Call Gemini API for interpretation
        console.log('Calling Gemini API for new interpretation');
        const interpretation = await interpretDream(dream);

        return NextResponse.json({
            interpretation,
            cached: false,
        });
    } catch (error) {
        console.error('Error in interpret API:', error);
        return NextResponse.json(
            { error: 'Failed to interpret dream' },
            { status: 500 }
        );
    }
}
