'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InterpretationDisplay from '@/components/InterpretationDisplay';
import '../../lib/i18n';


interface Interpretation {
    summary: string;
    deepInterpretation: string;
    luckyKeywords: string[];
    luckyItem: string;
    luckyColor: string;
    luckyNumber: string;
    rarityScore: number;
    rarityTier: string;
    fallback?: boolean; // Added check for fallback
}

export default function InterpretationPage() {
    const [dreamText, setDreamText] = useState('');
    const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTranslating, setIsTranslating] = useState(false);
    const [error, setError] = useState(false);
    const [currentLang, setCurrentLang] = useState('');
    const router = useRouter();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const dream = sessionStorage.getItem('currentDream');
        const type = sessionStorage.getItem('interpretationType');
        if (!dream) {
            router.push('/');
            return;
        }

        setDreamText(dream);
        interpretDream(dream, type || 'general');
    }, [router]);

    // Handle translation when language changes
    useEffect(() => {
        if (!interpretation || !i18n.language || i18n.language === currentLang || isLoading || isTranslating) return;

        const translateContent = async () => {
            try {
                setIsTranslating(true);
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        interpretation,
                        targetLanguage: i18n.language
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setInterpretation(data.interpretation);
                    // Match currentLang to i18n.language after successful translation
                    setCurrentLang(i18n.language);
                }
            } catch (err) {
                console.error('Translation failed:', err);
            } finally {
                setIsTranslating(false);
            }
        };

        translateContent();
    }, [i18n.language, interpretation, currentLang, isLoading, isTranslating]);

    const interpretDream = async (dream: string, type: string) => {
        try {
            setIsLoading(true);
            setError(false);

            const response = await fetch('/api/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dream, type }),
            });

            if (!response.ok) throw new Error('Failed to interpret dream');

            const data = await response.json();

            if (data.fallback) {
                const isKorean = i18n.language === 'ko';
                const fallbackData = {
                    summary: isKorean
                        ? "이 꿈은 당신의 내면 깊은 곳에 있는 잠재력을 나타냅니다. 현재의 상황에서 새로운 기회가 다가오고 있음을 암시하며, 긍정적인 변화를 받아들일 준비가 되어 있다는 신호입니다."
                        : "This dream represents the potential deep within you. It suggests that new opportunities are approaching in your current situation, and it is a sign that you are ready to accept positive changes.",
                    deepInterpretation: isKorean
                        ? "꿈속의 상징들은 당신의 무의식이 성장을 갈망하고 있음을 보여줍니다. 특히 감정적인 부분에서 큰 해방감을 느낄 수 있는 사건이 생길 수 있으며, 이는 당신의 커리어 나 대인 관계에서 중요한 전환점이 될 것입니다. 두려워하지 말고 직관을 따르세요."
                        : "The symbols in your dream show that your subconscious is longing for growth. In particular, an event may occur where you can feel a great sense of liberation emotionally, which will be a major turning point in your career or interpersonal relationships. Do not be afraid and follow your intuition.",
                    luckyKeywords: isKorean ? ["기회", "변화", "직관"] : ["Opportunity", "Change", "Intuition"],
                    luckyItem: isKorean ? "오래된 열쇠" : "Old Key",
                    luckyColor: isKorean ? "남색" : "Indigo",
                    luckyNumber: "7",
                    rarityScore: 85,
                    rarityTier: "Epic",
                    detectedLanguage: isKorean ? 'ko' : 'en',
                    fallback: true
                };
                setInterpretation(fallbackData);
                setCurrentLang(isKorean ? 'ko' : 'en');
            } else {
                setInterpretation(data.interpretation);
                // Important: Set the current color to the language Gemini actually detected/returned
                setCurrentLang(data.interpretation.detectedLanguage || i18n.language);
            }

            if (data.id) {
                const newUrl = `/interpretation/${data.id}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full scale-[3] animate-pulse" />
                    <Sparkles className="w-16 h-16 text-purple-400/40 animate-float-slow transition-colors relative z-10" />
                </div>
                <h2 className="text-xl font-light tracking-[0.4em] uppercase text-white/40 mb-2 animate-pulse">
                    {t('home.loading')}
                </h2>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400/20">
                    Transcending the veil...
                </p>
            </div>
        );
    }

    if (error || !interpretation) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="glass-card rounded-[3rem] p-12 md:p-16 max-w-xl w-full text-center space-y-8">
                    <div className="text-4xl grayscale opacity-20">📡</div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">Connection Severed</h2>
                        <p className="text-white/40 font-light leading-relaxed">
                            The mystic energies are turbulent. We could not bridge the gap to your subconscious at this moment.
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 transition-all"
                    >
                        Return to Threshold
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={isTranslating ? 'opacity-50 pointer-events-none transition-opacity duration-500' : 'transition-opacity duration-500'}>
            <InterpretationDisplay
                dreamText={dreamText}
                interpretation={interpretation}
            />
            {isTranslating && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]">
                    <div className="glass-premium px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 shadow-2xl">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">Translating Vision...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

