'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Check, Sun, Moon, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import '../lib/i18n';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

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
                <div className="max-w-7xl mx-auto flex items-center justify-between glass-premium rounded-full px-8 py-4 border border-black/5 dark:border-white/10 shadow-2xl">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center space-x-3">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
                            <Sparkles className="w-8 h-8 text-black dark:text-white relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-gradient-stitch">
                            DreamAI
                        </span>
                    </Link>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/10">
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow-sm text-purple-600' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
                            >
                                <Sun className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-black/40 text-purple-400' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
                            >
                                <Moon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 border-r border-black/5 dark:border-white/5 pr-8">
                            <button
                                onClick={handleShareTwitter}
                                className="p-2 text-black/20 dark:text-white/30 hover:text-purple-600 dark:hover:text-white transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="p-2 text-black/20 dark:text-white/30 hover:text-purple-600 dark:hover:text-white transition-colors relative"
                            >
                                {copied ? <Check className="w-4 h-4 text-purple-400" /> : <LinkIcon className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Language Selector */}
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <button className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 hover:text-purple-600 dark:hover:text-white transition-all">
                                    <Globe className="w-4 h-4" />
                                    {languages.find(l => l.code === i18n.language)?.name || 'Language'}
                                </button>
                                <div className="absolute right-0 mt-6 w-48 glass-premium rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 p-3 bg-white/90 dark:bg-black/60 shadow-xl">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => changeLanguage(lang.code)}
                                            className={`block w-full text-left px-5 py-3 rounded-2xl hover:bg-purple-50 dark:hover:bg-white/5 transition-colors text-xs font-medium tracking-wide ${i18n.language === lang.code ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-black/40 dark:text-white/40'
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Theme Selector (Desktop) */}
                            {mounted && (
                                <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/10 ml-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow-sm text-purple-600' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
                                    >
                                        <Sun className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-black/40 text-purple-400' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'}`}
                                    >
                                        <Moon className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden p-2 text-black/40 dark:text-white/40 hover:text-purple-600 dark:hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex justify-end">
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="relative w-full max-w-xs h-full bg-white/90 dark:bg-black/90 glass-premium border-l border-black/5 dark:border-white/10 p-10 flex flex-col animate-in slide-in-from-right duration-500 shadow-2xl">
                        <button onClick={() => setIsOpen(false)} className="self-end p-4 text-black/40 dark:text-white/40 hover:text-purple-600 dark:hover:text-white mb-12 transition-colors">
                            <X className="w-8 h-8 font-light" />
                        </button>

                        <div className="flex flex-col h-full">
                            <div className="flex-1 space-y-12">
                                <div className="space-y-6">
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/20 dark:text-white/20">Languages</p>
                                    <div className="space-y-2">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    changeLanguage(lang.code);
                                                    setIsOpen(false);
                                                }}
                                                className={`block w-full text-left py-2 text-xl font-light transition-colors ${i18n.language === lang.code ? 'text-purple-600 dark:text-purple-400' : 'text-black/40 dark:text-white/40'
                                                    }`}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6 pt-12 border-t border-black/5 dark:border-white/5">
                                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/20 dark:text-white/20">Connect</p>
                                    <div className="flex gap-6">
                                        <Twitter className="w-5 h-5 text-black/40 dark:text-white/40 cursor-pointer hover:text-purple-600 dark:hover:text-white transition-colors" onClick={handleShareTwitter} />
                                        <LinkIcon className="w-5 h-5 text-black/40 dark:text-white/40 cursor-pointer hover:text-purple-600 dark:hover:text-white transition-colors" onClick={handleCopyLink} />
                                    </div>
                                </div>
                            </div>

                            {/* Theme Toggle Mobile */}
                            {mounted && (
                                <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/20 dark:text-white/20">Appearance</span>
                                    <button
                                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                        className="p-4 glass-premium rounded-2xl border border-black/5 dark:border-white/10 text-black/40 dark:text-white/40 flex items-center gap-4 hover:border-purple-200 dark:hover:border-white/20 transition-all"
                                    >
                                        {theme === 'dark' ? (
                                            <>
                                                <Sun className="w-5 h-5 text-amber-500" />
                                                <span className="text-xs font-medium uppercase tracking-widest text-black/60 dark:text-white/60">Light Mode</span>
                                            </>
                                        ) : (
                                            <>
                                                <Moon className="w-5 h-5 text-purple-600" />
                                                <span className="text-xs font-medium uppercase tracking-widest text-black/60 dark:text-white/60">Dark Mode</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
