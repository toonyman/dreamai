
import { useState, useRef, useEffect } from 'react';
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
    const [showShareMenu, setShowShareMenu] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShowShareMenu(false);
            }
        };

        if (showShareMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showShareMenu]);

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
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t('interpretation.title')}
                </h1>

                {/* Share Buttons */}
                <div className="relative" ref={shareMenuRef}>
                    <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <Sparkles className="w-4 h-4" />
                        {t('interpretation.share')}
                    </button>

                    {showShareMenu && (
                        <div className="absolute top-12 left-0 z-10 glass rounded-lg p-4 shadow-xl min-w-[280px]">
                            <div className="grid grid-cols-2 gap-3">
                                {/* Facebook */}
                                <button
                                    onClick={handleShareFacebook}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
                                >
                                    <Facebook className="w-4 h-4" />
                                    <span className="text-sm">Facebook</span>
                                </button>

                                {/* Twitter/X */}
                                <button
                                    onClick={handleShareTwitter}
                                    className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 rounded-lg transition-colors text-white"
                                >
                                    <Twitter className="w-4 h-4" />
                                    <span className="text-sm">X (Twitter)</span>
                                </button>

                                {/* Reddit */}
                                <button
                                    onClick={handleShareReddit}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors text-white"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                                    </svg>
                                    <span className="text-sm">Reddit</span>
                                </button>

                                {/* LinkedIn */}
                                <button
                                    onClick={handleShareLinkedIn}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors text-white"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    <span className="text-sm">LinkedIn</span>
                                </button>

                                {/* Copy Link */}
                                <button
                                    onClick={handleCopyLink}
                                    className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span className="text-sm">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <LinkIcon className="w-4 h-4" />
                                            <span className="text-sm">Copy Link</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Dream Description */}
            <div className="glass rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-3 text-purple-300">Your Dream</h2>
                <p className="text-gray-300 leading-relaxed">{dreamText}</p>
            </div>

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
            {/* Back to Home Button */}
            <div className="flex justify-center mt-12 mb-8">
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all hover:scale-105 flex items-center gap-2"
                >
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>{t('interpretation.analyze_another', 'Analyze Another Dream')}</span>
                </button>
            </div>
        </div>
    );
}
