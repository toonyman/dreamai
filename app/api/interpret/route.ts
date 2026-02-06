import { NextRequest, NextResponse } from 'next/server';
import { interpretDream } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    let dreamBody = '';
    try {
        const body = await request.json();
        dreamBody = body.dream || '';
        const type = body.type || 'general';

        if (!dreamBody || typeof dreamBody !== 'string') {
            return NextResponse.json(
                { error: 'Dream description is required' },
                { status: 400 }
            );
        }

        const dream = dreamBody;
        // Check if Gemini API key is configured
        const hasApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '';

        // Simple language detection for demo mode
        const isKoreanInput = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(dream);
        const inputLang = isKoreanInput ? 'ko' : 'en';

        if (!hasApiKey) {
            // Return demo interpretation when API key is not configured
            console.log('🎭 Demo mode - No Gemini API key configured');
            return NextResponse.json({
                interpretation: {
                    summary: isKoreanInput
                        ? "이것은 데모 해석입니다. 당신의 꿈은 탐험과 발견의 테마를 담고 있습니다. 영상들은 당신의 무의식이 일상 경험을 처리하고 있음을 반영합니다."
                        : "This is a demo interpretation. Your dream suggests themes of exploration and discovery. The imagery reflects your subconscious processing daily experiences.",
                    deepInterpretation: isKoreanInput
                        ? "심리학적 관점에서, 이 꿈은 당신의 감정과 생각을 정리하는 마음의 방식을 나타냅니다. 당신이 마주친 상징들은 현재의 생활 상황, 열망 또는 우려와 관련이 있을 수 있습니다. 꿈은 종종 의식과 무의식 사이의 가교 역할을 하며 복잡한 감정을 처리하는 데 도움을 줍니다."
                        : "From a psychological perspective, this dream represents your mind's way of organizing thoughts and emotions. The symbols you encountered may relate to your current life situation, aspirations, or concerns. Dreams often serve as a bridge between conscious and unconscious, helping you process complex feelings.",
                    luckyKeywords: isKoreanInput ? ["발견", "성장", "변화"] : ["discovery", "growth", "transformation"],
                    luckyItem: isKoreanInput ? "나침반" : "Compass",
                    luckyColor: isKoreanInput ? "파란색" : "Blue",
                    luckyNumber: "7",
                    rarityScore: 78,
                    rarityTier: isKoreanInput ? "Rare" : "Rare",
                    detectedLanguage: inputLang
                },
                cached: false,
                demo: true
            });
        }

        // Call Gemini API for interpretation
        console.log(`Calling Gemini API for new interpretation (${type})`);
        const interpretation = await interpretDream(dream, type);

        // Save to Supabase
        let id: string | undefined;
        try {
            const { data, error } = await supabase
                .from('interpretations')
                .insert([
                    {
                        dream,
                        interpretation
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error('Error saving to Supabase:', error);
            } else {
                id = data.id;
            }
        } catch (dbError) {
            console.error('Database operation failed:', dbError);
        }

        return NextResponse.json({
            interpretation,
            id, // Return the ID for sharing
            cached: false,
        });
    } catch (error: any) {
        console.error('Error in interpret API:', error);

        const isKoreanInput = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(dreamBody);
        const inputLang = isKoreanInput ? 'ko' : 'en';

        // Fallback to demo interpretation on error
        return NextResponse.json({
            interpretation: {
                summary: isKoreanInput
                    ? "AI 서비스가 현재 일시적으로 중단되어 제공되는 대체 해석입니다. 당신의 꿈은 회복탄력성과 불확실한 시기에도 의미를 찾는 능력을 암시합니다."
                    : "This is a fallback interpretation because the AI service is currently unavailable. Your dream suggests resilience and the ability to find meaning even in uncertain times.",
                deepInterpretation: isKoreanInput
                    ? "연결 과정에서 일시적인 장애가 발생했습니다. 하지만 이 메시지를 보고 계시다는 것은 당신의 꿈을 이해하고자 하는 의지가 매우 강하다는 것을 의미합니다. 이 '중단'의 상징은 당신이 극복할 준비가 된 현실 세계의 장애를 반영할 수 있습니다."
                    : "The error encountered suggests a temporary disruption in the connection to the collective unconscious (or the API). However, seeing this message means your intent to understand your dreams is strong. This symbol of 'disruption' may reflect obstacles in your waking life that you are ready to overcome.",
                luckyKeywords: isKoreanInput ? ["회복", "인내", "극복"] : ["resilience", "patience", "overcoming"],
                luckyItem: isKoreanInput ? "방패" : "Shield",
                luckyColor: isKoreanInput ? "은색" : "Silver",
                luckyNumber: "1",
                rarityScore: 10,
                rarityTier: isKoreanInput ? "Common" : "Common",
                detectedLanguage: inputLang
            },
            cached: false,
            demo: true,
            fallback: true,
            error: error.message || 'Unknown error'
        });
    }
}
