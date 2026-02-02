import { NextRequest, NextResponse } from 'next/server';
import { interpretDream } from '@/lib/gemini';
import { findSimilarDreams, extractKeywords } from '@/lib/supabase';

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
                    summary: "이것은 데모 해몽입니다. 당신의 꿈은 탐험과 발견의 주제를 암시합니다. 이미지는 일상 경험을 처리하는 무의식을 반영합니다.",
                    deepInterpretation: "심리학적 관점에서, 이 꿈은 생각과 감정을 정리하는 마음의 방식을 나타냅니다. 당신이 만난 상징들은 현재의 삶의 상황, 열망 또는 우려와 관련이 있을 수 있습니다. 꿈은 종종 의식과 무의식 사이의 다리 역할을 하여 복잡한 감정을 처리하는 데 도움을 줍니다. 실제 AI 분석을 받으려면 Gemini API 키를 설정해주세요.",
                    luckyKeywords: ["발견", "성장", "변화"]
                },
                cached: false,
                demo: true
            });
        }

        // Extract keywords from the dream
        const keywords = extractKeywords(dream);

        // Check for similar dreams in the database (caching logic)
        const similarDreams = await findSimilarDreams(keywords);

        // If we find a very similar dream, return cached interpretation
        if (similarDreams.length > 0) {
            // Simple similarity check - if keywords match significantly
            const cachedDream = similarDreams[0];
            const matchingKeywords = keywords.filter(k =>
                cachedDream.keywords.includes(k)
            );

            // If more than 60% of keywords match, use cached result
            if (matchingKeywords.length / keywords.length > 0.6) {
                console.log('Using cached interpretation');
                return NextResponse.json({
                    interpretation: cachedDream.interpretation,
                    cached: true,
                });
            }
        }

        // No similar dream found, call Gemini API
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
