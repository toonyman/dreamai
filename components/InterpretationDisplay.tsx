'use client';

import { useState } from 'react';
import { Sparkles, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

interface Interpretation {
    summary: string;
    deepInterpretation: string;
    luckyKeywords: string[];
    luckyItem: string;
    luckyColor: string;
    luckyNumber: string;
    rarityScore: number;
    rarityTier: string;
}

interface InterpretationDisplayProps {
    dreamText: string;
    interpretation: Interpretation;
}

export default function InterpretationDisplay({ dreamText, interpretation }: InterpretationDisplayProps) {
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation();

    const getTierColor = (tier: string) => {
        const t = tier?.toLowerCase() || '';
        if (t.includes('legendary') || t.includes('전설')) {
            return 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] font-serif italic';
        }
        if (t.includes('epic') || t.includes('서사') || t.includes('에픽')) {
            return 'text-purple-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)] font-serif italic';
        }
        if (t.includes('rare') || t.includes('희귀')) {
            return 'text-blue-400 font-serif italic';
        }
        return 'text-white/40 font-serif italic';
    };

    const getShareUrl = () => {
        return typeof window !== 'undefined' ? window.location.href : '';
    };

    const getShareText = () => {
        return interpretation
            ? `${interpretation.summary}\n\n${getShareUrl()}`
            : t('interpretation.title');
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleShareTwitter = () => {
        const url = encodeURIComponent(getShareUrl());
        const text = encodeURIComponent(getShareText());
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center">
            {/* Header Area */}
            <div className="max-w-4xl w-full text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient-stitch pb-2 text-balance">
                    {t('interpretation.title')}
                </h1>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handleShareTwitter}
                        className="p-3 glass-premium rounded-full border border-black/5 dark:border-white/10 text-black/40 dark:text-white/40 hover:text-purple-600 dark:hover:text-white transition-all shadow-sm"
                    >
                        <Twitter className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => {
                            const url = encodeURIComponent(getShareUrl());
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                        }}
                        className="p-3 glass-premium rounded-full border border-black/5 dark:border-white/10 text-black/40 dark:text-white/40 hover:text-purple-600 dark:hover:text-white transition-all shadow-sm"
                    >
                        <Facebook className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="px-6 py-3 glass-premium rounded-full border border-black/5 dark:border-white/10 flex items-center gap-3 group shadow-sm transition-all"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        ) : (
                            <LinkIcon className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-purple-600 dark:group-hover:text-white transition-colors" />
                        )}
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 group-hover:text-purple-600 dark:group-hover:text-white transition-colors">
                            {copied ? 'Copied' : 'Share URL'}
                        </span>
                    </button>
                </div>
            </div>

            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column - Core Info */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Dream Context */}
                    <div className="glass-card rounded-[2.5rem] p-10 space-y-6 border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-4 opacity-10 dark:opacity-20">
                            <div className="h-px flex-1 bg-black dark:bg-white" />
                            <Sparkles className="w-4 h-4" />
                            <div className="h-px flex-1 bg-black dark:bg-white" />
                        </div>
                        <p className="text-xl md:text-2xl font-light text-black/70 dark:text-white/90 leading-relaxed italic text-center">
                            "{dreamText}"
                        </p>
                    </div>

                    {/* Deep Analysis */}
                    <div className="glass-card rounded-[2.5rem] p-10 md:p-12 space-y-10 border-black/5 dark:border-white/5">
                        <div className="space-y-6">
                            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-purple-600/60 dark:text-purple-400/60">
                                {t('interpretation.summary')}
                            </h2>
                            <p className="text-3xl md:text-4xl font-serif italic text-black dark:text-white leading-[1.3] text-balance">
                                {interpretation.summary}
                            </p>
                        </div>
                        <div className="w-full h-px bg-black/5 dark:bg-white/5" />
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/20 dark:text-white/20">
                                {t('interpretation.deep')}
                            </h3>
                            <p className="text-xl text-black/60 dark:text-white/70 font-light leading-[1.8] text-justify whitespace-pre-wrap">
                                {interpretation.deepInterpretation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Meta Info & Luck */}
                <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                    {/* Rarity Card */}
                    <div className="glass-card rounded-[2.5rem] p-10 overflow-hidden relative group border-black/5 dark:border-white/5">
                        <div className="absolute top-0 right-0 p-8 text-black/5 dark:text-white/5 transition-transform duration-1000 group-hover:rotate-12">
                            <Sparkles className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-2 text-center lg:text-left">
                                <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 dark:text-white/30">
                                    {t('interpretation.rarity_title')}
                                </h3>
                                <div className={`text-5xl font-bold tracking-tight ${getTierColor(interpretation.rarityTier)}`}>
                                    {interpretation.rarityTier || 'Common'}
                                </div>
                                <p className="text-xs text-black/20 dark:text-white/20 font-mono">
                                    Consistency Index: {interpretation.rarityScore || 0}%
                                </p>
                            </div>

                            <div className="flex justify-center lg:justify-start">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="64" cy="64" r="60" className="stroke-black/5 dark:stroke-white/5 fill-none" strokeWidth="4" />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="60"
                                            className="stroke-purple-600/50 fill-none transition-all duration-1000 ease-in-out"
                                            strokeWidth="4"
                                            strokeDasharray={2 * Math.PI * 60}
                                            strokeDashoffset={2 * Math.PI * 60 * (1 - (interpretation.rarityScore || 0) / 100)}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-light text-black dark:text-white">{interpretation.rarityScore || 0}</span>
                                        <span className="text-[8px] font-bold tracking-widest uppercase text-black/20 dark:text-white/20">Tier Score</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Luck Metrics */}
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { label: t('interpretation.lucky_item'), value: interpretation.luckyItem, icon: '✨' },
                            { label: t('interpretation.lucky_color'), value: interpretation.luckyColor, icon: '🎨' },
                            { label: t('interpretation.lucky_number'), value: interpretation.luckyNumber, icon: '🎲' }
                        ].map((item, i) => (
                            <div key={i} className="glass-premium rounded-3xl p-6 flex items-center justify-between group hover:bg-purple-500/5 dark:hover:bg-white/5 transition-colors border-black/5 dark:border-white/10">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-black/20 dark:text-white/20">{item.label}</p>
                                    <p className="text-lg font-medium text-black/70 dark:text-white/80">{item.value}</p>
                                </div>
                                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20 group-hover:opacity-100">{item.icon}</span>
                            </div>
                        ))}
                    </div>

                    {/* Keywords */}
                    <div className="glass-card rounded-[2.5rem] p-10 space-y-6 border-black/5 dark:border-white/5">
                        <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 dark:text-white/30 text-center">
                            {t('interpretation.keywords')}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {interpretation.luckyKeywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-light text-black/50 dark:text-white/60 hover:text-purple-600 dark:hover:text-white hover:border-purple-200 dark:hover:border-white/20 transition-all cursor-default"
                                >
                                    # {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-20 flex flex-col items-center space-y-8">
                <button
                    onClick={() => window.location.href = '/'}
                    className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 group-hover:bg-purple-500/10 dark:group-hover:bg-white/10 transition-colors" />
                    <div className="relative flex items-center space-x-3">
                        <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:animate-pulse" />
                        <span className="text-sm font-medium tracking-[0.2em] uppercase text-black/70 dark:text-white/80">
                            {t('interpretation.analyze_another')}
                        </span>
                    </div>
                </button>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/10 dark:text-white/10">
                    Propelled by DreamAI Quantum
                </p>
            </div>
        </div>
    );
}

