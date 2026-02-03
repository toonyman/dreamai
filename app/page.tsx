'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Facebook, Twitter, Linkedin, Link as LinkIcon, Check, Share2 } from 'lucide-react';
import '../lib/i18n';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [dreamText, setDreamText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
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

    const getShareUrl = () => {
        return typeof window !== 'undefined' ? window.location.origin : 'https://dreamai.vercel.app';
    };

    const getShareText = () => {
        return 'DreamAI - Free AI-Powered Dream Interpretation. Discover the hidden meanings in your dreams!';
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
            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center mb-6">
                    <Sparkles className="w-16 h-16 text-purple-400" />
                </div>
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t('home.title')}
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                    {t('home.subtitle')}
                </p>

                {/* Share Button */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <button
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                            <span>Share Website</span>
                        </button>

                        {showShareMenu && (
                            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-10 glass rounded-lg p-4 shadow-xl min-w-[280px]">
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
                                            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
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
            </div>

            {/* Dream Input Form */}
            <div className="glass rounded-2xl p-8 shadow-2xl mb-12">
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

            {/* About Section for SEO */}
            <div className="glass rounded-2xl p-8 text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">
                    {t('home.about_title')}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                    {t('home.about_description')}
                </p>
            </div>
        </div>
    );
}
