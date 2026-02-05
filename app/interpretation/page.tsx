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
    const [error, setError] = useState(false);
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

    const interpretDream = async (dream: string, type: string) => {
        try {
            setIsLoading(true);
            setError(false);

            // Call the API route to get interpretation
            const response = await fetch('/api/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dream, type }),
            });

            if (!response.ok) throw new Error('Failed to interpret dream');

            const data = await response.json();

            // If fallback is true, use client-side localized demo data
            if (data.fallback) {
                const isKorean = i18n.language === 'ko';
                setInterpretation({
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
                    fallback: true
                });
            } else {
                setInterpretation(data.interpretation);
            }

            // Update URL with ID for sharing if available
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
            <div className="container mx-auto px-4 py-20 max-w-4xl relative z-10">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                        <Sparkles className="w-20 h-20 text-mystic-glow animate-float relative z-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4 font-cinzel tracking-widest text-glow uppercase">
                        Gazing into the subconscious...
                    </h2>
                    <p className="text-purple-200/60 animate-pulse font-light tracking-wide">{t('home.loading')}</p>
                </div>
            </div>
        );
    }

    if (error || !interpretation) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-4xl text-center relative z-10">
                <div className="glass-mystic rounded-[2rem] p-12 border border-red-500/30">
                    <h2 className="text-3xl font-bold text-red-300 mb-4 font-cinzel">Connection Severed</h2>
                    <p className="text-purple-200/60 text-lg mb-8">The mystic energies are turbulent. We could not interpret your dream at this moment.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold tracking-widest uppercase transition-all"
                    >
                        Return to Reality
                    </button>
                </div>
            </div>
        );
    }

    return (
        <InterpretationDisplay
            dreamText={dreamText}
            interpretation={interpretation}
        />
    );
}
