'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, History, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <nav className="glass border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        <span className="text-2xl">✨</span>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            DreamAI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            <Home className="w-4 h-4" />
                            {t('nav.home')}
                        </Link>
                        <Link
                            href="/history"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${pathname === '/history' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            <History className="w-4 h-4" />
                            {t('nav.history')}
                        </Link>

                        {/* Language Selector */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white transition-colors">
                                <Globe className="w-4 h-4" />
                                {t('nav.language')}
                            </button>
                            <div className="absolute right-0 mt-2 w-40 glass rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`block w-full text-left px-4 py-2 hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg ${i18n.language === lang.code ? 'text-purple-400' : 'text-gray-300'
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
                        className="md:hidden p-2 rounded-lg hover:bg-white/10"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-lg hover:bg-white/10"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('nav.home')}
                        </Link>
                        <Link
                            href="/history"
                            className="block px-3 py-2 rounded-lg hover:bg-white/10"
                            onClick={() => setIsOpen(false)}
                        >
                            {t('nav.history')}
                        </Link>
                        <div className="pt-2 border-t border-white/10">
                            <p className="px-3 py-2 text-sm text-gray-400">{t('nav.language')}</p>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        changeLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`block w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 ${i18n.language === lang.code ? 'text-purple-400' : 'text-gray-300'
                                        }`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
