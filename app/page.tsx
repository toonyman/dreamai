'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import '../lib/i18n';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [dreamText, setDreamText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dreamText.trim()) return;

        setIsLoading(true);

        // Store dream in session storage for the interpretation page
        sessionStorage.setItem('currentDream', dreamText);

        // Navigate to interpretation page
        router.push('/interpretation');
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Header Ad Space */}
            <div className="mb-8 p-4 glass rounded-lg text-center text-sm text-gray-400">
                [Ad Space - Header]
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center mb-6">
                    <Sparkles className="w-16 h-16 text-purple-400" />
                </div>
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t('home.title')}
                </h1>
                <p className="text-xl text-gray-300">
                    {t('home.subtitle')}
                </p>
            </div>

            {/* Dream Input Form */}
            <div className="glass rounded-2xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={dreamText}
                        onChange={(e) => setDreamText(e.target.value)}
                        placeholder={t('home.placeholder')}
                        className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        disabled={isLoading}
                    />

                    <button
                        type="submit"
                        disabled={isLoading || !dreamText.trim()}
                        className="mt-6 w-full dreamy-gradient text-white font-semibold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                {t('home.loading')}
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                {t('home.submit')}
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Bottom Ad Space */}
            <div className="mt-8 p-4 glass rounded-lg text-center text-sm text-gray-400">
                [Ad Space - Bottom]
            </div>
        </div>
    );
}
