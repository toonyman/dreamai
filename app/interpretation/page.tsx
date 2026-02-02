'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Share2, Save, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n';
import { supabase, saveDream, extractKeywords } from '@/lib/supabase';


interface Interpretation {
    summary: string;
    deepInterpretation: string;
    luckyKeywords: string[];
}

export default function InterpretationPage() {
    const [dreamText, setDreamText] = useState('');
    const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const dream = sessionStorage.getItem('currentDream');
        if (!dream) {
            router.push('/');
            return;
        }

        setDreamText(dream);
        interpretDream(dream);
    }, [router]);

    const interpretDream = async (dream: string) => {
        try {
            setIsLoading(true);

            // Call the API route to get interpretation
            const response = await fetch('/api/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dream }),
            });

            if (!response.ok) throw new Error('Failed to interpret dream');

            const data = await response.json();
            setInterpretation(data.interpretation);
        } catch (error) {
            console.error('Error:', error);
            alert(t('common.error'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert(t('history.signIn'));
            return;
        }

        if (!interpretation) return;

        setIsSaving(true);
        const keywords = extractKeywords(dreamText);
        const saved = await saveDream(user.id, dreamText, interpretation, keywords);

        if (saved) {
            alert(t('common.success'));
        } else {
            alert(t('common.error'));
        }
        setIsSaving(false);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: t('interpretation.title'),
                text: interpretation?.summary || '',
                url: window.location.href,
            });
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Sparkles className="w-16 h-16 text-purple-400 animate-pulse mb-4" />
                    <p className="text-xl text-gray-300">{t('home.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Sidebar Ad Space */}
            <div className="hidden lg:block fixed right-4 top-24 w-48 p-4 glass rounded-lg text-center text-sm text-gray-400">
                [Ad Space - Sidebar]
            </div>

            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t('interpretation.title')}
                </h1>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        {t('interpretation.share')}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {t('interpretation.save')}
                    </button>
                </div>
            </div>

            {/* Dream Description */}
            <div className="glass rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-3 text-purple-300">Your Dream</h2>
                <p className="text-gray-300 leading-relaxed">{dreamText}</p>
            </div>

            {interpretation && (
                <>
                    {/* Summary */}
                    <div className="glass rounded-2xl p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-purple-300">
                            {t('interpretation.summary')}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">{interpretation.summary}</p>
                    </div>

                    {/* Deep Interpretation */}
                    <div className="glass rounded-2xl p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-purple-300">
                            {t('interpretation.deep')}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">{interpretation.deepInterpretation}</p>
                    </div>

                    {/* Lucky Keywords */}
                    <div className="glass rounded-2xl p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-purple-300">
                            {t('interpretation.keywords')}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {interpretation.luckyKeywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 dreamy-gradient rounded-full text-white font-medium"
                                >
                                    ✨ {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Bottom Ad Space */}
            <div className="mt-8 p-4 glass rounded-lg text-center text-sm text-gray-400">
                [Ad Space - Bottom]
            </div>
        </div>
    );
}
