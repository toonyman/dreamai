'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import InterpretationDisplay from '@/components/InterpretationDisplay';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { Metadata } from 'next';

/* 
// Note: generateMetadata is ignored in 'use client' pages in some Next.js versions.
// If metadata is critical, consider splitting this into a separate Page (Server) and Client Component.
*/

export default function InterpretationIdPage({ params }: { params: { id: string } }) {
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
                    .eq('id', params.id)
                    .single();

                if (dbData) {
                    setData(dbData);
                    setInterpretation(dbData.interpretation);
                    // Assume initial language is the one detected in the saved interpretation
                    setCurrentLang(dbData.interpretation?.detectedLanguage || 'en');
                }
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

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

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <Sparkles className="w-12 h-12 text-purple-400/20 animate-pulse" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="glass-card rounded-[3rem] p-12 text-center space-y-8">
                    <h1 className="text-4xl font-bold text-white">Dream Lost in Mist</h1>
                    <p className="text-white/40">The dream interpretation you are looking for has faded.</p>
                    <button onClick={() => window.location.href = '/'} className="px-8 py-4 glass rounded-xl text-white font-bold tracking-widest uppercase border border-white/5 hover:bg-white/10 transition-all">
                        Return to Reality
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
                    <div className="glass-premium px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 shadow-2xl">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">Translating Vision...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

