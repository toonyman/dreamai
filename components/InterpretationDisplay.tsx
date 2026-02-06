'use client';

import { Sparkles, Share2, Facebook, Twitter, Link as LinkIcon, Check, Copy, ChevronRight, Star, Moon, Sun, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface InterpretationDisplayProps {
    dreamText: string;
    interpretation: {
        summary: string;
        deepInterpretation: string;
        luckyKeywords: string[];
        luckyItem: string;
        luckyColor: string;
        luckyNumber: string;
        rarityScore: number;
        rarityTier: string;
    };
}

export default function InterpretationDisplay({ dreamText, interpretation }: InterpretationDisplayProps) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(interpretation.deepInterpretation);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const handleShareTwitter = () => {
        const text = `Dream interpretation: ${interpretation.summary}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleShareFacebook = () => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-32 md:py-48">
            <div className="space-y-16">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                            <Sparkles className="w-3 h-3" />
                            {interpretation.rarityTier} Vision
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                            {t('interpretation.title')}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleShareTwitter} className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/60 hover:text-white">
                            <Twitter className="w-4 h-4" />
                        </button>
                        <button onClick={handleShareFacebook} className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/60 hover:text-white">
                            <Facebook className="w-4 h-4" />
                        </button>
                        <button onClick={handleCopy} className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/60 hover:text-white relative">
                            {copied ? <Check className="w-4 h-4 text-purple-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-12 gap-12">
                    {/* Left Panel: The Dream */}
                    <div className="md:col-span-5 space-y-8">
                        <div className="glass-premium rounded-[2.5rem] p-10 space-y-8 border-white/10 bg-white/[0.03]">
                            <div className="flex items-center gap-4 text-white/30">
                                <Moon className="w-4 h-4" />
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">The Original Vision</span>
                            </div>
                            <blockquote className="text-xl md:text-2xl font-light leading-relaxed italic text-white/90">
                                "{dreamText}"
                            </blockquote>
                        </div>

                        <div className="glass-premium rounded-[2.5rem] p-10 space-y-6 border-white/10 bg-white/[0.03]">
                            <div className="flex items-center justify-between text-white/30">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Metaphysical Rarity</span>
                                <Star className="w-4 h-4" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-end justify-between h-8">
                                    <span className="text-4xl font-light text-white tracking-tighter">{interpretation.rarityScore}</span>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">Intensity Index</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-shine"
                                        style={{ width: `${interpretation.rarityScore}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: The Insights */}
                    <div className="md:col-span-7 space-y-12">
                        {/* Summary */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-purple-400/60">Core Essence</h3>
                            <p className="text-2xl font-medium leading-relaxed text-white">
                                {interpretation.summary}
                            </p>
                        </div>

                        {/* Deep Interpretation */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-purple-400/60">Deep Decoding</h3>
                            <p className="text-lg font-light leading-loose text-white/80 whitespace-pre-wrap">
                                {interpretation.deepInterpretation}
                            </p>
                        </div>

                        {/* Symbolic Anchors */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="glass-premium p-6 rounded-3xl space-y-4 border-white/10 bg-white/[0.03]">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">Lucky Item</span>
                                <div className="text-lg font-medium text-white">{interpretation.luckyItem}</div>
                            </div>
                            <div className="glass-premium p-6 rounded-3xl space-y-4 border-white/10 bg-white/[0.03]">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">Lucky Color</span>
                                <div className="text-lg font-medium text-white">{interpretation.luckyColor}</div>
                            </div>
                            <div className="glass-premium p-6 rounded-3xl space-y-4 border-white/10 bg-white/[0.03]">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">Lucky Number</span>
                                <div className="text-lg font-medium text-white">{interpretation.luckyNumber}</div>
                            </div>
                            <div className="glass-premium p-6 rounded-3xl space-y-4 border-white/10 bg-white/[0.03]">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">Dream Symbols</span>
                                <div className="flex flex-wrap gap-2">
                                    {interpretation.luckyKeywords.map((kw, i) => (
                                        <span key={i} className="text-sm text-purple-300">#{kw}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
                            <button onClick={() => window.location.href = '/'} className="flex-1 px-8 py-5 glass-premium rounded-2xl flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white hover:bg-white/5 transition-all">
                                <RefreshCw className="w-4 h-4" />
                                Decode Another Dream
                            </button>
                            <button onClick={handleCopy} className="flex-1 px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-all">
                                <Copy className="w-4 h-4" />
                                Copy Interpretation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
