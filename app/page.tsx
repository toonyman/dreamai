'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Facebook, Twitter, Linkedin } from 'lucide-react';
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
        { id: 'general', icon: '🔮', label: 'mode.general' },
        { id: 'wealth', icon: '💰', label: 'mode.wealth' },
        { id: 'romance', icon: '💘', label: 'mode.romance' },
        { id: 'creative', icon: '🎨', label: 'mode.creative' },
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20">
            {/* Hero Section */}
            <div className="max-w-4xl w-full text-center mb-16 space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-premium border border-white/10 animate-fade-in shadow-xl">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
                        AI-Powered Subconscious Insights
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gradient-stitch leading-[1.1] pb-2">
                    {t('home.title')}
                </h1>

                <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                    {t('home.subtitle')}
                </p>
            </div>

            {/* Main Interaction Section */}
            <div className="max-w-5xl w-full glass-card rounded-[3rem] p-1 md:p-2">
                <div className="bg-black/60 rounded-[2.8rem] p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Mode Selectors */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-white/30 text-center">
                                Choose Interpretation Lens
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {modes.map((mode) => (
                                    <button
                                        key={mode.id}
                                        type="button"
                                        onClick={() => setInterpretationType(mode.id)}
                                        className={`group relative flex flex-col items-center p-6 rounded-3xl transition-all duration-500 ${interpretationType === mode.id
                                            ? 'bg-white/10 border border-white/20 glow-purple ring-1 ring-white/30 scale-[1.02]'
                                            : 'border border-transparent hover:bg-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <span className={`text-3xl mb-3 transition-transform duration-500 ${interpretationType === mode.id ? 'scale-110 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                                            }`}>
                                            {mode.icon}
                                        </span>
                                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${interpretationType === mode.id ? 'text-white' : 'text-white/30 group-hover:text-white/50'
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
                                className="w-full h-64 md:h-80 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-10 text-xl font-light text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all resize-none leading-relaxed"
                                disabled={isLoading}
                            />
                            <div className="absolute bottom-6 right-8 text-white/20 text-xs font-mono">
                                {dreamText.length} characters
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isLoading || !dreamText.trim()}
                                className="group relative px-12 py-6 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl"
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
                                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
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
            <div className="mt-40 max-w-3xl w-full text-center space-y-8 pb-20">
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent mx-auto" />
                <h2 className="text-2xl md:text-3xl font-serif italic text-white/80">
                    {t('home.about_title')}
                </h2>
                <p className="text-lg text-white/40 leading-loose font-light italic max-w-2xl mx-auto">
                    {t('home.about_description')}
                </p>
                <div className="flex justify-center space-x-8 text-white/30">
                    <Facebook className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                    <Twitter className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                    <Linkedin className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
}
