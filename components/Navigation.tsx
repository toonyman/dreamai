'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    const pathname = usePathname();
    const { t, i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'ko', name: '한국어' },
        { code: 'es', name: 'Español' },
        { code: 'ja', name: '日本語' },
    ];

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
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
        <>
            <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 bg-black/20 backdrop-blur-md transition-all duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-mystic-500/50 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                                <span className="text-3xl relative z-10 animate-float">🔮</span>
                            </div>
                            <span className="text-2xl font-bold tracking-[0.2em] bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent uppercase font-cinzel">
                                DreamAI
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {/* Share Icons */}
                            <div className="flex items-center gap-2 border-r border-white/10 pr-6">
                                <button
                                    onClick={handleShareFacebook}
                                    className="p-2 text-purple-200/50 hover:text-white transition-colors"
                                    title="Share on Facebook"
                                >
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleShareTwitter}
                                    className="p-2 text-purple-200/50 hover:text-white transition-colors"
                                    title="Share on X"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </button>
                                <button
                                    onClick={handleShareReddit}
                                    className="p-2 text-purple-200/50 hover:text-white transition-colors"
                                    title="Share on Reddit"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
                                </button>
                                <button
                                    onClick={handleShareLinkedIn}
                                    className="p-2 text-purple-200/50 hover:text-white transition-colors"
                                    title="Share on LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleCopyLink}
                                    className="p-2 text-purple-200/50 hover:text-white transition-colors relative"
                                    title="Copy Link"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <LinkIcon className="w-4 h-4" />}
                                    {copied && <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-400 uppercase tracking-tighter">Copied</span>}
                                </button>
                            </div>

                            {/* Language Selector */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-purple-200/50 hover:text-white transition-all">
                                    <Globe className="w-4 h-4" />
                                    {t('nav.language')}
                                </button>
                                <div className="absolute right-0 mt-4 w-48 glass-mystic rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`block w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium ${i18n.language === lang.code ? 'text-mystic-400 bg-white/5' : 'text-purple-100/60'
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-3 rounded-full bg-white/5 text-purple-200 hover:text-white transition-colors border border-white/10"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            {
                isOpen && (
                    <div className="md:hidden fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-auto">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Box */}
                        <div className="relative w-full max-w-sm glass-mystic rounded-3xl p-6 border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.5)] animate-in zoom-in-95 fade-in duration-200 z-[101]">
                            {/* Close Button inside the box */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 text-purple-200/50 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-6 mt-2">
                                {/* Share Section */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-200/40 text-center">Share DreamAI</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <button onClick={handleShareFacebook} className="p-3 text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"><Facebook className="w-5 h-5" /></button>
                                        <button onClick={handleShareTwitter} className="p-3 text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></button>
                                        <button onClick={handleShareReddit} className="p-3 text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg></button>
                                        <button onClick={handleShareLinkedIn} className="p-3 text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"><Linkedin className="w-5 h-5" /></button>
                                        <button onClick={handleCopyLink} className="flex-1 flex items-center justify-center gap-2 py-3 bg-mystic-600/30 text-white rounded-xl text-xs font-bold uppercase tracking-widest border border-mystic-500/30">
                                            {copied ? 'Copied!' : <><LinkIcon className="w-4 h-4" /> Link</>}
                                        </button>
                                    </div>
                                </div>

                                {/* Language Selector */}
                                <div className="space-y-3 pt-6 border-t border-white/10">
                                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-200/40 text-center">{t('nav.language')}</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    changeLanguage(lang.code);
                                                    setIsOpen(false);
                                                }}
                                                className={`px-4 py-3 rounded-xl text-center text-xs font-bold tracking-widest uppercase transition-all border ${i18n.language === lang.code
                                                    ? 'bg-mystic-600/20 text-mystic-300 border-mystic-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                                                    : 'bg-white/5 text-purple-100/60 border-white/5 hover:bg-white/10'
                                                    }`}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
