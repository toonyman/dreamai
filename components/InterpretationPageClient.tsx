'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import InterpretationDisplay from '@/components/InterpretationDisplay';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

export default function InterpretationPageClient({ id }: { id: string }) {
    const [data, setData] = useState<any>(null);
    const [interpretation, setInterpretation] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTranslating, setIsTranslating] = useState(false);
    const [currentLang, setCurrentLang] = useState('');
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dbData } = await supabase
                    .from('interpretations')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (dbData) {
                    setData(dbData);
                    const result = dbData.interpretation;
                    setInterpretation(result);

                    const detected = result?.detectedLanguage || (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(dbData.dream) ? 'ko' : 'en');
                    setCurrentLang(detected);

                    // Sync UI language with the dream language initially
                    if (i18n.language !== detected) {
                        i18n.changeLanguage(detected);
                    }
                }
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

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

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="glass-card rounded-[3rem] p-12 text-center space-y-8 border-white/10 bg-black/60 shadow-2xl">
                    <h1 className="text-4xl font-bold text-white">{t('interpretation.connection_severed')}</h1>
                    <p className="text-white/40">{t('interpretation.mystic_energies')}</p>
                    <button onClick={() => window.location.href = '/'} className="px-8 py-4 glass-premium rounded-xl text-white/60 hover:text-white font-bold tracking-widest uppercase border border-white/10 hover:bg-white/5 transition-all">
                        {t('interpretation.return_threshold')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={isTranslating ? 'opacity-50 pointer-events-none transition-opacity duration-500' : 'transition-opacity duration-500'}>
            <InterpretationDisplay
                dreamText={data.dream}
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
