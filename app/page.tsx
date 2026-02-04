'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Facebook, Twitter, Linkedin, Link as LinkIcon, Check, Share2 } from 'lucide-react';
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
        <div className="container mx-auto px-4 py-20 max-w-4xl relative overflow-hidden">
            {/* Decorative floating elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            {/* Hero Section */}
            <div className="text-center mb-16 relative z-10">
                <div className="inline-flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full scale-150 animate-pulse" />
                    <Sparkles className="w-20 h-20 text-mystic-glow relative z-10 animate-float" />
                </div>
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent text-glow drop-shadow-2xl">
                    {t('home.title')}
                </h1>
                <p className="text-xl text-purple-200/80 mb-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                    {t('home.subtitle')}
                </p>
            </div>

            {/* Dream Input Form */}
            <div className="glass-mystic rounded-[2.5rem] p-10 shadow-2xl mb-16 relative z-10 border border-white/10 group hover:border-purple-500/30 transition-all duration-500">
                <form onSubmit={handleSubmit} className="relative">
                    <textarea
                        value={dreamText}
                        onChange={(e) => setDreamText(e.target.value)}
                        placeholder={t('home.placeholder')}
                        className="w-full h-56 bg-white/5 border border-white/5 rounded-3xl p-6 text-white text-lg placeholder-purple-300/30 focus:outline-none focus:ring-1 focus:ring-purple-500/50 resize-none transition-all"
                        disabled={isLoading}
                    />

                    <button
                        type="submit"
                        disabled={isLoading || !dreamText.trim()}
                        className="mt-8 w-full mystic-gradient text-white font-bold py-5 px-10 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                <span className="uppercase tracking-widest">{t('home.loading')}</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-6 h-6 animate-pulse" />
                                <span className="text-lg uppercase tracking-widest">{t('home.submit')}</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* About Section for SEO */}
            <div className="glass rounded-[2rem] p-10 text-center max-w-3xl mx-auto border border-white/5 relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-purple-200 tracking-[0.2em] uppercase">
                    {t('home.about_title')}
                </h2>
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-6" />
                <p className="text-purple-100/60 leading-loose text-lg font-light italic">
                    {t('home.about_description')}
                </p>
            </div>
        </div>
    );
}
