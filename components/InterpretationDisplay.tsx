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
        switch (tier?.toLowerCase()) {
            case 'legendary': return 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]';
            case 'epic': return 'text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]';
            case 'rare': return 'text-blue-400';
            default: return 'text-gray-400';
        }
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

    const handleShareFacebook = () => {
        const url = encodeURIComponent(getShareUrl());
        const text = encodeURIComponent(getShareText());
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    };

    const handleShareTwitter = () => {
        const url = encodeURIComponent(getShareUrl());
        const text = encodeURIComponent(getShareText());
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    const handleShareReddit = () => {
        const url = encodeURIComponent(getShareUrl());
        const title = encodeURIComponent(getShareText());
        window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
    };

    const handleShareLinkedIn = () => {
        const url = encodeURIComponent(getShareUrl());
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };

    return (
        <div className="container mx-auto px-4 pt-24 pb-8 md:pt-32 md:pb-12 max-w-7xl relative overflow-hidden">
            {/* Decorative background effects */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

            <div className="mb-8 relative z-10 text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-b from-white to-purple-300 bg-clip-text text-transparent text-glow inline-block">
                    {t('interpretation.title')}
                </h1>

                {/* Share Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={handleShareFacebook}
                        className="p-2.5 glass rounded-full hover:bg-blue-600/20 transition-all border border-blue-500/30 text-white group"
                        title="Share on Facebook"
                    >
                        <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={handleShareTwitter}
                        className="p-2.5 glass rounded-full hover:bg-white/10 transition-all border border-white/20 text-white group"
                        title="Share on X"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </button>
                    <button
                        onClick={handleShareReddit}
                        className="p-2.5 glass rounded-full hover:bg-orange-600/20 transition-all border border-orange-500/30 text-white group"
                        title="Share on Reddit"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
                    </button>
                    <button
                        onClick={handleShareLinkedIn}
                        className="p-2.5 glass rounded-full hover:bg-blue-700/20 transition-all border border-blue-600/30 text-white group"
                        title="Share on LinkedIn"
                    >
                        <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2.5 glass rounded-full hover:bg-white/10 transition-all border border-purple-500/30 text-white min-w-[120px] justify-center"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Copied!</span>
                            </>
                        ) : (
                            <>
                                <LinkIcon className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Copy Link</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="space-y-4 md:space-y-6">
                    {/* Rarity Tier Card */}
                    <div className="glass-mystic rounded-3xl p-5 md:p-6 border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.2)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-xs font-bold text-purple-200 uppercase tracking-[0.3em] mb-2">{t('interpretation.rarity_title', 'Dream Rarity')}</h2>
                                <div className={`text-4xl font-black font-cinzel ${getTierColor(interpretation.rarityTier)} uppercase tracking-wider mb-1`}>
                                    {interpretation.rarityTier || 'Common'}
                                </div>
                                <p className="text-purple-200/60 text-xs">
                                    {interpretation.rarityScore ? `Top ${100 - interpretation.rarityScore}% of dreams` : 'Unique Dream'}
                                </p>
                            </div>
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="44" className="stroke-white/10 fill-none" strokeWidth="6" />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="44"
                                        className={`fill-none transition-all duration-1000 ease-out ${getTierColor(interpretation.rarityTier).split(' ')[0]} stroke-current`}
                                        strokeWidth="6"
                                        strokeDasharray={2 * Math.PI * 44}
                                        strokeDashoffset={2 * Math.PI * 44 * (1 - (interpretation.rarityScore || 0) / 100)}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{interpretation.rarityScore || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dream Description */}
                    <div className="glass-mystic rounded-3xl p-5 md:p-6 border border-white/10 shadow-xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-bold mb-3 text-purple-200 tracking-[0.1em] uppercase">Your Dream</h2>
                        <p className="text-purple-50/80 leading-relaxed text-base italic bg-white/5 p-4 rounded-xl border border-white/5 italic">
                            "{dreamText}"
                        </p>
                    </div>

                    {/* Summary */}
                    <div className="glass-mystic rounded-3xl p-5 md:p-6 border border-purple-500/20 shadow-2xl relative">
                        <div className="absolute -top-4 -right-4 w-12 h-12 mystic-gradient rounded-full blur-xl opacity-50" />
                        <h2 className="text-lg font-bold mb-3 text-purple-200 tracking-[0.1em] uppercase">
                            {t('interpretation.summary')}
                        </h2>
                        <p className="text-purple-50/90 leading-relaxed text-base font-light tracking-wide">{interpretation.summary}</p>
                    </div>

                    {/* Lucky Data Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <div className="glass-mystic rounded-2xl p-4 border border-white/10 text-center group hover:bg-white/5 transition-colors">
                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🎁</div>
                            <h3 className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-1">{t('interpretation.lucky_item')}</h3>
                            <p className="text-lg text-white font-medium">{interpretation.luckyItem || "Magic Wand"}</p>
                        </div>
                        <div className="glass-mystic rounded-2xl p-4 border border-white/10 text-center group hover:bg-white/5 transition-colors">
                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🎨</div>
                            <h3 className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-1">{t('interpretation.lucky_color')}</h3>
                            <p className="text-lg text-white font-medium">{interpretation.luckyColor || "Mystic Purple"}</p>
                        </div>
                        <div className="glass-mystic rounded-2xl p-4 border border-white/10 text-center group hover:bg-white/5 transition-colors">
                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🍀</div>
                            <h3 className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-1">{t('interpretation.lucky_number')}</h3>
                            <p className="text-xl text-white font-bold font-cinzel">{interpretation.luckyNumber || "7"}</p>
                        </div>
                    </div>

                    {/* Deep Interpretation */}
                    <div className="glass-mystic rounded-3xl p-5 md:p-6 border border-white/10 shadow-xl">
                        <h2 className="text-lg font-bold mb-3 text-purple-200 tracking-[0.1em] uppercase">
                            {t('interpretation.deep')}
                        </h2>
                        <div className="w-full h-px bg-gradient-to-r from-purple-500/50 to-transparent mb-4" />
                        <p className="text-purple-50/80 leading-relaxed text-base">{interpretation.deepInterpretation}</p>
                    </div>

                    {/* Lucky Keywords */}
                    <div className="glass-mystic rounded-3xl p-5 md:p-6 border border-white/10 shadow-xl">
                        <h2 className="text-lg font-bold mb-4 text-purple-200 tracking-[0.1em] uppercase">
                            {t('interpretation.keywords')}
                        </h2>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {interpretation.luckyKeywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 mystic-gradient rounded-full text-white text-sm font-medium shadow-[0_0_10px_rgba(139,92,246,0.2)] hover:scale-105 transition-transform cursor-default"
                                >
                                    ✨ {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Home Button */}
            <div className="flex justify-center mt-12 mb-8 relative z-10">
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-4 glass rounded-xl text-purple-200 font-bold tracking-widest uppercase transition-all hover:scale-105 hover:bg-white/10 border border-purple-500/30 flex items-center gap-3 shadow-xl group text-sm"
                >
                    <Sparkles className="w-4 h-4 text-mystic-glow group-hover:animate-pulse" />
                    <span>{t('interpretation.analyze_another', 'Analyze Another Dream')}</span>
                </button>
            </div>
        </div>
    );
}
