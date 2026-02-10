'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { History, Sparkles, Share2, Download, RefreshCw, Scroll, Shield, Calendar, User, Search, Globe, Library } from 'lucide-react';
import html2canvas from 'html2canvas';
import { pastLifeFigures, HistoricalFigure } from '@/lib/pastLifeData';

export default function PastLifePage() {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState<'male' | 'female' | ''>('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [result, setResult] = useState<{ figure: HistoricalFigure; summary: any } | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const loadingTexts = [
        t('pastlife.loading_1'),
        t('pastlife.loading_2'),
        t('pastlife.loading_3')
    ];

    const generateHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    };

    const handleStart = async () => {
        if (!name || !birthDate || !gender) return;
        setIsAnalyzing(true);
        setLoadingStep(0);

        // Loading animation steps
        const stepInterval = setInterval(() => {
            setLoadingStep(prev => (prev < 2 ? prev + 1 : prev));
        }, 1500);

        // Deterministic matching
        const seed = `${name}-${birthDate}-${gender}`;
        const hash = generateHash(seed);
        const figureIndex = hash % pastLifeFigures.length;
        const figure = pastLifeFigures[figureIndex];

        // Fetch Wikipedia info
        try {
            const lng = i18n.language === 'ko' ? 'ko' : 'en';
            const wikiTitle = lng === 'ko' ? figure.wikiTitleKo : figure.wikiTitleEn;
            const res = await fetch(`https://${lng}.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`);
            const summary = await res.json();

            // Artificial delay for UX
            await new Promise(resolve => setTimeout(resolve, 4500));

            setResult({ figure, summary });
        } catch (error) {
            console.error('Failed to fetch wiki data:', error);
            // Fallback result if API fails
            setResult({ figure, summary: { displaytitle: figure.id, extract: "An influential figure in human history." } });
        } finally {
            clearInterval(stepInterval);
            setIsAnalyzing(false);
        }
    };

    const downloadResult = async () => {
        if (resultRef.current) {
            const canvas = await html2canvas(resultRef.current, {
                backgroundColor: '#0a0a0a',
                scale: 2,
                useCORS: true,
                logging: false
            });
            const link = document.createElement('a');
            link.download = `past-life-${name}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    const handleShareTwitter = () => {
        if (!result) return;
        const figureName = result.summary.displaytitle || result.figure.id;
        const text = t('pastlife.share_text', { name: figureName });
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div className="min-h-screen text-amber-50/90 pt-24 md:pt-32 pb-20 px-4 relative overflow-hidden bg-[#0a0a0a]">
            {/* Background Decorative */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/papyros.png')] rotate-180" />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/10" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="text-center space-y-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-premium border border-amber-500/20 shadow-xl mx-auto"
                    >
                        <History className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-amber-200/50">
                            Astral Archive
                        </span>
                    </motion.div>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-500 to-amber-800 uppercase">
                            {t('pastlife.title')}
                        </h1>
                        <p className="text-lg md:text-xl text-amber-200/40 font-light max-w-xl mx-auto leading-relaxed italic">
                            {t('pastlife.subtitle')}
                        </p>
                    </div>
                </header>

                <main className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!result && !isAnalyzing ? (
                            <motion.div
                                key="entry-form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="glass-premium rounded-[3rem] border border-amber-900/30 p-8 md:p-12 space-y-10 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none" />

                                <div className="space-y-8 relative">
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-500/60 uppercase ml-2">
                                            <User className="w-3 h-3" /> {t('pastlife.name_label')}
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="..."
                                            className="w-full bg-amber-950/20 border-b-2 border-amber-900/50 px-4 py-4 text-2xl font-serif focus:border-amber-500 transition-all outline-none text-amber-100 placeholder:opacity-20"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-500/60 uppercase ml-2">
                                                <Calendar className="w-3 h-3" /> {t('pastlife.birth_label')}
                                            </label>
                                            <input
                                                type="date"
                                                value={birthDate}
                                                onChange={(e) => setBirthDate(e.target.value)}
                                                className="w-full bg-amber-950/20 border-b-2 border-amber-900/50 px-4 py-4 text-xl focus:border-amber-500 transition-all outline-none text-amber-100 dark:[color-scheme:dark]"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-500/60 uppercase ml-2">
                                                <Shield className="w-3 h-3" /> {t('pastlife.gender_label')}
                                            </label>
                                            <div className="flex gap-4">
                                                {(['male', 'female'] as const).map((g) => (
                                                    <button
                                                        key={g}
                                                        onClick={() => setGender(g)}
                                                        className={`flex-1 py-4 rounded-2xl border transition-all font-bold tracking-widest text-xs uppercase ${gender === g
                                                            ? 'bg-amber-800/40 border-amber-500 text-amber-100'
                                                            : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {t(`pastlife.${g}`)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        disabled={!name || !birthDate || !gender}
                                        onClick={handleStart}
                                        className="w-full py-6 rounded-full bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 text-amber-100 font-bold text-lg tracking-[0.2em] shadow-[0_0_30px_rgba(180,83,9,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale disabled:pointer-events-none"
                                    >
                                        <Search className="w-6 h-6" />
                                        {t('pastlife.btn_start')}
                                    </button>
                                </div>
                            </motion.div>
                        ) : isAnalyzing ? (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center space-y-12 py-20"
                            >
                                <div className="relative">
                                    <div className="w-32 h-32 border-4 border-amber-500/20 rounded-full animate-spin-slow" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <History className="w-12 h-12 text-amber-500 animate-pulse" />
                                    </div>
                                    <div className="absolute -inset-4 border border-amber-500/10 rounded-full animate-reverse-spin" />
                                </div>
                                <div className="space-y-4 text-center">
                                    <motion.p
                                        key={loadingStep}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-2xl font-serif text-amber-200 tracking-wide"
                                    >
                                        {loadingTexts[loadingStep]}
                                    </motion.p>
                                    <div className="w-48 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 4.5, ease: "linear" }}
                                            className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-8"
                            >
                                <div
                                    ref={resultRef}
                                    className="glass-premium rounded-[3rem] border border-amber-900/30 overflow-hidden relative shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/papyros.png')] opacity-20 pointer-events-none" />
                                    <div className="p-8 md:p-12 space-y-10 relative">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black tracking-[0.5em] text-amber-500/60 uppercase">{t('pastlife.result_header')}</p>
                                                <h2 className="text-3xl font-serif text-amber-100">Archive #{(generateHash(name) % 99999).toString().padStart(5, '0')}</h2>
                                            </div>
                                            <Library className="w-8 h-8 text-amber-800" />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-10 items-center">
                                            <div className="relative group">
                                                <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-4 border-amber-900/50 shadow-2xl">
                                                    {result?.summary?.originalimage?.source ? (
                                                        <img
                                                            src={result.summary.originalimage.source}
                                                            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                                                            alt={result.figure.id}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-amber-950/40 flex items-center justify-center">
                                                            <User className="w-20 h-20 text-amber-900/50" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <span className="text-xs font-bold tracking-widest text-amber-500/80 uppercase">{result?.figure.era}</span>
                                                        <h3
                                                            className="text-2xl font-bold font-serif text-white"
                                                            dangerouslySetInnerHTML={{ __html: result?.summary.displaytitle }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-amber-500/60 italic font-light">{t('pastlife.desc_intro')}</p>
                                                    <div className="h-px w-12 bg-amber-500/30" />
                                                </div>
                                                <p className="text-lg leading-relaxed text-amber-100/80 font-serif">
                                                    {result?.summary.extract}
                                                </p>
                                                <div className="pt-6 border-t border-amber-900/30 grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-amber-500/40 uppercase tracking-widest">Aura Category</p>
                                                        <p className="text-sm font-bold text-amber-200 uppercase">{result?.figure.category}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-amber-500/40 uppercase tracking-widest">Resonance Path</p>
                                                        <p className="text-sm font-bold text-amber-200 uppercase">{name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-8 border-t border-amber-900/10 text-[10px] text-amber-900/60 uppercase tracking-[0.3em] font-bold">
                                            <span>WhoAmI.zip Astral Laboratory</span>
                                            <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> Time-Space Secured</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                    <button
                                        onClick={downloadResult}
                                        className="px-10 py-5 rounded-full bg-amber-700 text-amber-50 font-bold text-lg hover:bg-amber-600 transition-colors flex items-center gap-3 shadow-2xl border border-amber-500/30"
                                    >
                                        <Download className="w-5 h-5" />
                                        {t('pastlife.save')}
                                    </button>
                                    <button
                                        onClick={handleShareTwitter}
                                        className="px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold flex items-center gap-3 hover:bg-white/10 transition-colors shadow-lg"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        TWITTER
                                    </button>
                                    <button
                                        onClick={() => { setResult(null); setName(''); }}
                                        className="text-amber-500/40 hover:text-amber-500 transition-colors underline text-sm ml-4"
                                    >
                                        {t('pastlife.retry')}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Antique Scroll/Coin CSS */}
            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                .animate-reverse-spin {
                    animation: reverse-spin 12s linear infinite;
                }
            `}</style>
        </div>
    );
}
