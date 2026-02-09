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
        // Normalize language codes (e.g., 'en-US' -> 'en')
        const target = i18n.language?.split('-')[0];
        const current = currentLang?.split('-')[0];

        if (!interpretation || !target || target === current || isLoading || isTranslating) return;

        const translateContent = async () => {
            try {
                setIsTranslating(true);
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        interpretation,
                        targetLanguage: target
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setInterpretation(data.interpretation);
                    setCurrentLang(target);
                } else {
                    // Even if it fails, we set currentLang to target to prevent infinite re-try loops
                    // unless you want it to keep trying. Usually better to stop and let user try again.
                    setCurrentLang(target);
                }
            } catch (err) {
                console.error('Translation failed:', err);
                setCurrentLang(target);
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
            const result = data.interpretation;

            // Determine the language of the result
            const isKoreanInput = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(dream);
            const detected = result.detectedLanguage || (isKoreanInput ? 'ko' : 'en');

            // Critical Point 1: Sync UI language with the dream language initially
            if (i18n.language !== detected) {
                await i18n.changeLanguage(detected);
            }

            setInterpretation(result);
            setCurrentLang(detected);

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
                    <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full scale-[3] animate-pulse" />
                    <Sparkles className="w-16 h-16 text-purple-400 animate-float-slow transition-colors relative z-10" />
                </div>
                <h2 className="text-xl font-light tracking-[0.4em] uppercase text-white/40 mb-2 animate-pulse">
                    {t('home.loading')}
                </h2>
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-purple-400/40">
                    {t('interpretation.transcending')}
                </p>
            </div>
        );
    }

    if (error || !interpretation) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="glass-card rounded-[3rem] p-12 md:p-16 max-w-xl w-full text-center space-y-8 border-white/10 bg-black/60 shadow-2xl">
                    <div className="text-4xl grayscale opacity-20">📡</div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">{t('interpretation.connection_severed')}</h2>
                        <p className="text-white/40 font-light leading-relaxed">
                            {t('interpretation.mystic_energies')}
                        </p>
                    </div>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold tracking-[0.2em] uppercase text-white/60 transition-all font-bold"
                    >
                        {t('interpretation.return_threshold')}
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
                    <div className="glass-premium px-8 py-4 rounded-full flex items-center gap-4 border border-white/20 shadow-2xl bg-black/80 backdrop-blur-xl">
                        <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-ping" />
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">{t('interpretation.translating_vision')}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

