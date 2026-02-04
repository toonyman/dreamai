'use client';

import { useState } from 'react';
import { Sparkles, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

interface Interpretation {
    summary: string;
    deepInterpretation: string;
    luckyKeywords: string[];
}

interface InterpretationDisplayProps {
    dreamText: string;
    interpretation: Interpretation;
}

export default function InterpretationDisplay({ dreamText, interpretation }: InterpretationDisplayProps) {
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation();

    const getShareUrl = () => {
        return typeof window !== 'undefined' ? window.location.href : '';
    };

    const getShareText = () => {
        return interpretation
            ? `${t('interpretation.title')} - ${interpretation.summary.substring(0, 100)}...`
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
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
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
        <div className="container mx-auto px-4 py-20 max-w-4xl relative overflow-hidden">
            {/* Decorative background effects */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

            <div className="mb-12 relative z-10">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-b from-white to-purple-300 bg-clip-text text-transparent text-glow">
                    {t('interpretation.title')}
                </h1>

                {/* Share Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleShareFacebook}
                        className="p-3 glass rounded-full hover:bg-blue-600/20 transition-all border border-blue-500/30 text-white group"
                        title="Share on Facebook"
                    >
                        <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={handleShareTwitter}
                        className="p-3 glass rounded-full hover:bg-white/10 transition-all border border-white/20 text-white group"
                        title="Share on X"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </button>
                    <button
                        onClick={handleShareReddit}
                        className="p-3 glass rounded-full hover:bg-orange-600/20 transition-all border border-orange-500/30 text-white group"
                        title="Share on Reddit"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
                    </button>
                    <button
                        onClick={handleShareLinkedIn}
                        className="p-3 glass rounded-full hover:bg-blue-700/20 transition-all border border-blue-600/30 text-white group"
                        title="Share on LinkedIn"
                    >
                        <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-5 py-3 glass rounded-full hover:bg-white/10 transition-all border border-purple-500/30 text-white min-w-[140px] justify-center"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="text-xs font-bold uppercase tracking-widest">Copied!</span>
                            </>
                        ) : (
                            <>
                                <LinkIcon className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">Copy Link</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-8 relative z-10">
                {/* Dream Description */}
                <div className="glass-mystic rounded-[2rem] p-8 border border-white/10 shadow-xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-purple-200 tracking-[0.1em] uppercase">Your Dream</h2>
                    <p className="text-purple-50/80 leading-relaxed text-lg italic bg-white/5 p-4 rounded-xl border border-white/5 italic">
                        "{dreamText}"
                    </p>
                </div>

                {/* Summary */}
                <div className="glass-mystic rounded-[2rem] p-8 border border-purple-500/20 shadow-2xl relative">
                    <div className="absolute -top-4 -right-4 w-12 h-12 mystic-gradient rounded-full blur-xl opacity-50" />
                    <h2 className="text-xl font-bold mb-4 text-purple-200 tracking-[0.1em] uppercase">
                        {t('interpretation.summary')}
                    </h2>
                    <p className="text-purple-50/90 leading-loose text-lg font-light tracking-wide">{interpretation.summary}</p>
                </div>

                {/* Deep Interpretation */}
                <div className="glass-mystic rounded-[2rem] p-8 border border-white/10 shadow-xl">
                    <h2 className="text-xl font-bold mb-4 text-purple-200 tracking-[0.1em] uppercase">
                        {t('interpretation.deep')}
                    </h2>
                    <div className="w-full h-px bg-gradient-to-r from-purple-500/50 to-transparent mb-6" />
                    <p className="text-purple-50/80 leading-loose text-lg">{interpretation.deepInterpretation}</p>
                </div>

                {/* Lucky Keywords */}
                <div className="glass-mystic rounded-[2rem] p-8 border border-white/10 shadow-xl">
                    <h2 className="text-xl font-bold mb-6 text-purple-200 tracking-[0.1em] uppercase">
                        {t('interpretation.keywords')}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {interpretation.luckyKeywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-6 py-3 mystic-gradient rounded-full text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-110 transition-transform cursor-default"
                            >
                                ✨ {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Back to Home Button */}
            <div className="flex justify-center mt-16 mb-8 relative z-10">
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-10 py-5 glass rounded-2xl text-purple-200 font-bold tracking-widest uppercase transition-all hover:scale-105 hover:bg-white/10 border border-purple-500/30 flex items-center gap-3 shadow-2xl group"
                >
                    <Sparkles className="w-5 h-5 text-mystic-glow group-hover:animate-pulse" />
                    <span>{t('interpretation.analyze_another', 'Analyze Another Dream')}</span>
                </button>
            </div>
        </div>
    );
}
