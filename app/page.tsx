'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Facebook, Twitter, Linkedin, Link as LinkIcon, Check, Share2 } from 'lucide-react';
import '../lib/i18n';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [dreamText, setDreamText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [interpretationType, setInterpretationType] = useState('general');
    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dreamText.trim()) return;

        setIsLoading(true);
        sessionStorage.setItem('currentDream', dreamText);
        sessionStorage.setItem('interpretationType', interpretationType);
        router.push('/interpretation');
    };

    const modes = [
        { id: 'general', icon: '🔮', label: 'mode.general', color: 'bg-purple-500/10 border-purple-500/20' },
        { id: 'wealth', icon: '💰', label: 'mode.wealth', color: 'bg-amber-500/10 border-amber-500/20' },
        { id: 'romance', icon: '💘', label: 'mode.romance', color: 'bg-rose-500/10 border-rose-500/20' },
        { id: 'creative', icon: '🎨', label: 'mode.creative', color: 'bg-blue-500/10 border-blue-500/20' },
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20">
            {/* Hero Section */}
            <div className="max-w-4xl w-full text-center mb-16 space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-premium border border-black/5 dark:border-white/10 animate-fade-in shadow-sm">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-purple-900/40 dark:text-purple-200/60">
                        AI-Powered Subconscious Insights
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient-stitch leading-[1.1] pb-2">
                    {t('home.title')}
                </h1>

                <p className="text-xl md:text-2xl text-black/40 dark:text-purple-200/40 font-light max-w-2xl mx-auto leading-relaxed">
                    {t('home.subtitle')}
                </p>
            </div>

            {/* Main Interaction Section */}
            <div className="max-w-5xl w-full glass-card rounded-[3rem] p-1 md:p-2 border-black/5 dark:border-white/5">
                <div className="bg-white/60 dark:bg-black/40 rounded-[2.8rem] p-8 md:p-12 transition-colors duration-500">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Mode Selectors */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-black/20 dark:text-purple-300/40 text-center">
                                Choose Interpretation Lens
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {modes.map((mode) => (
                                    <button
                                        key={mode.id}
                                        type="button"
                                        onClick={() => setInterpretationType(mode.id)}
                                        className={`group relative flex flex-col items-center p-6 rounded-3xl transition-all duration-500 ${interpretationType === mode.id
                                            ? 'bg-purple-500/5 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 glow-purple ring-1 ring-purple-500/20 dark:ring-white/20'
                                            : 'border border-transparent hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/5'
                                            }`}
                                    >
                                        <span className={`text-3xl mb-3 transition-transform duration-500 ${interpretationType === mode.id ? 'scale-110' : 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                                            }`}>
                                            {mode.icon}
                                        </span>
                                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${interpretationType === mode.id ? 'text-purple-700 dark:text-white' : 'text-black/20 dark:text-white/20 group-hover:text-black/40 dark:group-hover:text-white/40'
                                            }`}>
                                            {t(mode.label)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Input */}
                        <div className="relative group">
                            <textarea
                                value={dreamText}
                                onChange={(e) => setDreamText(e.target.value)}
                                placeholder={t('home.placeholder')}
                                className="w-full h-64 md:h-80 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 text-xl font-light text-black dark:text-white placeholder-black/10 dark:placeholder-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all resize-none leading-relaxed"
                                disabled={isLoading}
                            />
                            <div className="absolute bottom-6 right-8 text-black/10 dark:text-white/10 text-xs font-mono">
                                {dreamText.length} characters
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isLoading || !dreamText.trim()}
                                className="group relative px-12 py-6 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 animate-shine-slow opacity-100 group-hover:opacity-90" />
                                <div className="relative flex items-center space-x-4">
                                    {isLoading ? (
                                        <div className="flex items-center space-x-3">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span className="text-lg font-medium tracking-widest uppercase text-white">{t('home.loading')}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-3">
                                            <Sparkles className="w-5 h-5 text-purple-200" />
                                            <span className="text-lg font-medium tracking-widest uppercase text-white">{t('home.submit')}</span>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* About Section */}
            <div className="mt-32 max-w-3xl w-full text-center space-y-8 pb-20">
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent mx-auto" />
                <h2 className="text-2xl md:text-3xl font-serif italic text-black/60 dark:text-purple-100/80">
                    {t('home.about_title')}
                </h2>
                <p className="text-lg text-black/30 dark:text-purple-200/30 leading-loose font-light italic">
                    {t('home.about_description')}
                </p>
                <div className="flex justify-center space-x-6 text-black/20 dark:text-white/20">
                    <Facebook className="w-5 h-5 cursor-pointer hover:text-purple-600 dark:hover:text-white transition-colors" />
                    <Twitter className="w-5 h-5 cursor-pointer hover:text-purple-600 dark:hover:text-white transition-colors" />
                    <Linkedin className="w-5 h-5 cursor-pointer hover:text-purple-600 dark:hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
}

