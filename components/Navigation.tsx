'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, Twitter, Facebook, Link as LinkIcon, Check, Sparkles, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function Navigation() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
        return typeof window !== 'undefined' ? window.location.href : 'https://dreamai.vercel.app';
    };

    const getShareText = () => {
        return i18n.language === 'ko'
            ? 'WhoAmI.zip: 당신의 영혼을 압축 해제하세요. 얼굴 분석, 꿈 해몽, MBTI 분위기까지!'
            : 'WhoAmI.zip: Unzip Your Soul. Face scanning, Dream decoding, and MBTI vibes.';
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

    const handleShareFacebook = () => {
        const url = encodeURIComponent(getShareUrl());
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-4 transition-all duration-500">
                <div className="max-w-7xl mx-auto flex items-center justify-between glass-premium rounded-full px-6 py-2.5 border border-white/10 shadow-2xl">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center space-x-3">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
                            <Sparkles className="w-8 h-8 text-white relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gradient-stitch">
                            WhoAmI.zip
                        </span>
                    </Link>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex items-center space-x-6 mr-4 border-r border-white/10 pr-6">
                            <Link href="/dream-analysis" className="text-sm font-medium tracking-wider uppercase text-white/50 hover:text-purple-400 transition-all">
                                {t('nav.dream')}
                            </Link>
                            <Link href="/mbti" className="text-sm font-medium tracking-wider uppercase text-white/50 hover:text-mystic-night-gold transition-all">
                                {t('nav.mbti')}
                            </Link>
                            <Link href="/soulmate" className="text-sm font-medium tracking-wider uppercase text-white/50 hover:text-pink-400 transition-all">
                                {t('nav.soulmate')}
                            </Link>
                            <Link href="/face-passport" className="text-sm font-medium tracking-wider uppercase text-white/50 hover:text-cyan-400 transition-all">
                                {t('nav.face')}
                            </Link>
                            <Link href="/past-life" className="text-sm font-medium tracking-wider uppercase text-white/50 hover:text-amber-500 transition-all">
                                {t('nav.pastlife')}
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 border-r border-white/10 pr-8">
                            <button
                                onClick={handleShareTwitter}
                                className="p-2 text-white/40 hover:text-white transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleShareFacebook}
                                className="p-2 text-white/40 hover:text-white transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="p-2 text-white/40 hover:text-white transition-colors relative"
                            >
                                {copied ? <Check className="w-5 h-5 text-purple-400" /> : <LinkIcon className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Language Selector */}
                        <div className="relative group">
                            <button className="flex items-center gap-3 text-sm font-medium tracking-wider uppercase text-white/50 hover:text-white transition-all">
                                <Globe className="w-4 h-4" />
                                {languages.find(l => l.code === i18n.language)?.name || 'Language'}
                            </button>
                            <div className="absolute right-0 mt-6 w-48 glass-premium rounded-[2.5rem] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 p-3 bg-black/80 backdrop-blur-3xl">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`block w-full text-left px-5 py-3 rounded-2xl hover:bg-white/5 transition-colors text-sm font-medium tracking-wide ${i18n.language === lang.code ? 'text-purple-400 font-bold' : 'text-white/60 hover:text-white'
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
                        className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />
                    <div className="relative w-full max-w-[280px] h-full bg-black/90 glass-premium border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
                        {/* Header with Close Button */}
                        <div className="sticky top-0 z-20 bg-black/40 backdrop-blur-3xl px-8 py-6 flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-8 pb-12 space-y-12">
                            <div className="space-y-6 pt-4">
                                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 border-b border-white/10 pb-2">Menu</p>
                                <div className="space-y-4">
                                    <Link href="/dream-analysis" onClick={() => setIsOpen(false)} className="block text-2xl font-light text-white/80 hover:text-purple-400 transition-colors leading-tight">{t('nav.dream')}</Link>
                                    <Link href="/mbti" onClick={() => setIsOpen(false)} className="block text-2xl font-light text-white/80 hover:text-mystic-night-gold transition-colors leading-tight">{t('nav.mbti')}</Link>
                                    <Link href="/soulmate" onClick={() => setIsOpen(false)} className="block text-2xl font-light text-white/80 hover:text-pink-400 transition-colors leading-tight">{t('nav.soulmate')}</Link>
                                    <Link href="/face-passport" onClick={() => setIsOpen(false)} className="block text-2xl font-light text-white/80 hover:text-cyan-400 transition-colors leading-tight">{t('nav.face')}</Link>
                                    <Link href="/past-life" onClick={() => setIsOpen(false)} className="block text-2xl font-light text-white/80 hover:text-amber-500 transition-colors leading-tight">{t('nav.pastlife')}</Link>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 border-b border-white/10 pb-2">Languages</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                changeLanguage(lang.code);
                                                setIsOpen(false);
                                            }}
                                            className={`block w-full text-left px-5 py-3 rounded-2xl text-lg font-medium transition-all ${i18n.language === lang.code
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                                                : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                                                }`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 border-t border-white/10 pt-8">
                                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Connect</p>
                                <div className="flex gap-6">
                                    <button onClick={handleShareTwitter} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                                        <Twitter className="w-6 h-6" />
                                    </button>
                                    <button onClick={handleShareFacebook} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                                        <Facebook className="w-6 h-6" />
                                    </button>
                                    <button onClick={handleCopyLink} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                                        <LinkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
