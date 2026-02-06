'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
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
        return 'DreamAI - AI-Powered Dream Interpretation. Unlock your subconscious.';
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
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 transition-all duration-500">
                <div className="max-w-7xl mx-auto flex items-center justify-between glass-premium rounded-full px-8 py-4 border border-white/10 shadow-2xl">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative">
                        <div className="absolute -inset-2 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="text-2xl relative z-10">✨</span>
                        <span className="text-xl font-bold tracking-[0.3em] font-serif italic text-white group-hover:text-purple-200 transition-colors uppercase">
                            DreamAI
                        </span>
                    </Link>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-2 border-r border-white/5 pr-8">
                            <button
                                onClick={handleShareTwitter}
                                className="p-2 text-white/30 hover:text-white transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="p-2 text-white/30 hover:text-white transition-colors relative"
                            >
                                {copied ? <Check className="w-4 h-4 text-purple-400" /> : <LinkIcon className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Language Selector */}
                        <div className="relative group">
                            <button className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-all">
                                <Globe className="w-4 h-4" />
                                {languages.find(l => l.code === i18n.language)?.name || 'Language'}
                            </button>
                            <div className="absolute right-0 mt-6 w-48 glass-premium rounded-[2rem] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 p-3 bg-black/60">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`block w-full text-left px-5 py-3 rounded-2xl hover:bg-white/5 transition-colors text-xs font-medium tracking-wide ${i18n.language === lang.code ? 'text-purple-400 bg-white/5' : 'text-white/40'
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
                        onClick={() => setIsOpen(true)}
                        className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="relative w-full max-w-xs h-full bg-black/90 glass-premium border-l border-white/10 p-10 flex flex-col animate-in slide-in-from-right duration-500">
                        <button onClick={() => setIsOpen(false)} className="self-end p-4 text-white/40 hover:text-white mb-12">
                            <X className="w-8 h-8 font-light" />
                        </button>

                        <div className="flex flex-col space-y-12">
                            <div className="space-y-6">
                                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">Languages</p>
                                <div className="space-y-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLanguage(lang.code);
                                                setIsOpen(false);
                                            }}
                                            className={`block w-full text-left py-2 text-xl font-light transition-colors ${i18n.language === lang.code ? 'text-purple-400' : 'text-white/40'
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 pt-12 border-t border-white/5">
                                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">Connect</p>
                                <div className="flex gap-6">
                                    <Twitter className="w-5 h-5 text-white/40" onClick={handleShareTwitter} />
                                    <LinkIcon className="w-5 h-5 text-white/40" onClick={handleCopyLink} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

