'use client';

import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Upload, RefreshCw, Heart, Users, Share2, Sparkles, ShieldCheck, Target, Zap, Activity, Globe, Copy, Check, Facebook } from 'lucide-react';

type MatchMode = 'lover' | 'friend';

export default function SoulmateMatchPage() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [mode, setMode] = useState<MatchMode | null>(null);
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = '/models';
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                ]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading face-api models:', error);
            }
        };
        loadModels();
    }, []);

    const handleImageUpload = (index: 1 | 2) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string;
                if (index === 1) setImage1(dataUrl);
                else setImage2(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const calculateChemistry = async () => {
        if (!image1 || !image2) return;
        setIsAnalyzing(true);

        try {
            const img1 = await faceapi.fetchImage(image1);
            const img2 = await faceapi.fetchImage(image2);

            const detection1 = await faceapi.detectSingleFace(img1, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
            const detection2 = await faceapi.detectSingleFace(img2, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();

            // Delay for UX
            await new Promise(resolve => setTimeout(resolve, 3000));

            if (detection1 && detection2) {
                const landmarks1 = detection1.landmarks.positions;
                const landmarks2 = detection2.landmarks.positions;

                const getWidth = (landmarks: faceapi.Point[]) => {
                    const left = landmarks[0].x;
                    const right = landmarks[16].x;
                    return right - left;
                };

                const w1 = getWidth(landmarks1);
                const w2 = getWidth(landmarks2);

                let totalDiff = 0;
                for (let i = 0; i < landmarks1.length; i++) {
                    const p1 = landmarks1[i];
                    const p2 = landmarks2[i];
                    const norm1 = { x: (p1.x - landmarks1[27].x) / w1, y: (p1.y - landmarks1[27].y) / w1 };
                    const norm2 = { x: (p2.x - landmarks2[27].x) / w2, y: (p2.y - landmarks2[27].y) / w2 };
                    const dist = Math.sqrt(Math.pow(norm1.x - norm2.x, 2) + Math.pow(norm1.y - norm2.y, 2));
                    totalDiff += dist;
                }

                const avgDiff = totalDiff / landmarks1.length;
                let baseScore = Math.max(0, Math.min(100, 100 - (avgDiff * 1050)));
                const finalScore = Math.floor(Math.min(99, baseScore + (Math.random() * 15) + 12));

                setScore(finalScore);
                setShowResult(true);
            } else {
                setScore(Math.floor(Math.random() * 25) + 65);
                setShowResult(true);
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            setScore(Math.floor(Math.random() * 20) + 70);
            setShowResult(true);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareTwitter = () => {
        const text = t('soulmate.share_text', { score });
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const handleShareFacebook = () => {
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const getResultLevel = (s: number) => {
        if (s >= 90) return 1;
        if (s >= 80) return 2;
        if (s >= 70) return 3;
        if (s >= 60) return 4;
        return 5;
    };

    return (
        <div className="min-h-screen text-white pt-24 md:pt-32 pb-20 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <header className="text-center space-y-6 mb-12">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-premium border border-white/10 animate-fade-in shadow-xl mx-auto">
                        <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-dimmed">
                            Destiny Sync v2.0
                        </span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient-stitch uppercase">
                            {t('soulmate.title')}
                        </h1>
                        <p className="text-lg md:text-xl text-dimmed font-light max-w-xl mx-auto leading-relaxed">
                            {t('soulmate.subtitle')}
                        </p>
                    </div>
                </header>

                <main>
                    <AnimatePresence mode="wait">
                        {!mode ? (
                            <motion.div
                                key="mode-select"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                            >
                                <button
                                    onClick={() => setMode('lover')}
                                    className="group relative overflow-hidden glass-premium rounded-[2.5rem] p-10 border border-white/10 hover:border-pink-500/50 transition-all text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-pink-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                                        <Heart className="w-10 h-10 text-pink-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold">{t('soulmate.mode_lover')}</h3>
                                        <p className="text-white/40 text-sm">Destiny, Romance, Chemistry</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setMode('friend')}
                                    className="group relative overflow-hidden glass-premium rounded-[2.5rem] p-10 border border-white/10 hover:border-cyan-500/50 transition-all text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                                        <Users className="w-10 h-10 text-cyan-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold">{t('soulmate.mode_friend')}</h3>
                                        <p className="text-white/40 text-sm">Loyalty, Vibes, Connection</p>
                                    </div>
                                </button>
                            </motion.div>
                        ) : !showResult ? (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-premium rounded-[2.5rem] border border-white/10 p-8 md:p-12 text-center space-y-12 max-w-4xl mx-auto"
                            >
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-4">
                                        <p className="text-xs font-bold tracking-widest text-white/30 uppercase">{t('soulmate.person1')}</p>
                                        <div className="aspect-[3/4] rounded-[2rem] bg-white/5 border-2 border-dashed border-white/10 relative overflow-hidden group">
                                            {image1 ? (
                                                <>
                                                    <img src={image1} className="w-full h-full object-cover" alt="Person 1" />
                                                    <button onClick={() => setImage1(null)} className="absolute top-4 right-4 p-2 bg-red-500 rounded-full shadow-lg hover:scale-110 transition-transform"><RefreshCw className="w-4 h-4" /></button>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-2">
                                                    <input type="file" accept="image/*" onChange={handleImageUpload(1)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                    <Upload className="w-10 h-10 text-white/20 group-hover:text-pink-400 transition-colors" />
                                                    <span className="text-sm text-white/40">Drop or Click</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-xs font-bold tracking-widest text-white/30 uppercase">{t('soulmate.person2')}</p>
                                        <div className="aspect-[3/4] rounded-[2rem] bg-white/5 border-2 border-dashed border-white/10 relative overflow-hidden group">
                                            {image2 ? (
                                                <>
                                                    <img src={image2} className="w-full h-full object-cover" alt="Person 2" />
                                                    <button onClick={() => setImage2(null)} className="absolute top-4 right-4 p-2 bg-red-500 rounded-full shadow-lg hover:scale-110 transition-transform"><RefreshCw className="w-4 h-4" /></button>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-2">
                                                    <input type="file" accept="image/*" onChange={handleImageUpload(2)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                    <Upload className="w-10 h-10 text-white/20 group-hover:text-pink-400 transition-colors" />
                                                    <span className="text-sm text-white/40">Drop or Click</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-white/40 text-sm max-w-sm mx-auto">{t('soulmate.upload_desc')}</p>
                                    <button
                                        disabled={!image1 || !image2 || isAnalyzing}
                                        onClick={calculateChemistry}
                                        className={`w-full max-w-sm mx-auto px-10 py-5 rounded-full font-bold text-lg shadow-2xl flex items-center justify-center gap-3 transition-all ${image1 && image2
                                            ? 'bg-mystic-gradient scale-100 hover:scale-105 active:scale-95 animate-pulse'
                                            : 'bg-white/5 text-white/20 grayscale pointer-events-none'
                                            }`}
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <RefreshCw className="w-6 h-6 animate-spin" />
                                                {t('soulmate.analyzing')}
                                            </>
                                        ) : (
                                            <>
                                                <ShieldCheck className="w-6 h-6" />
                                                START SYNCING
                                            </>
                                        )}
                                    </button>
                                    <button onClick={() => setMode(null)} className="text-sm text-white/30 hover:text-white transition-colors block mx-auto underline">Change Mode</button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <div className="grid lg:grid-cols-12 gap-8 items-start">
                                    {/* Score Summary Side */}
                                    <div className="lg:col-span-4 space-y-6">
                                        <div className="glass-premium rounded-[2.5rem] p-8 border border-white/10 text-center relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                                            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-pink-500 mb-6">{t('soulmate.sync_status')}</p>

                                            <div className="relative inline-block mb-8">
                                                <div className="absolute inset-0 bg-pink-500/20 blur-[40px] rounded-full scale-150" />
                                                <h3 className="text-8xl font-black text-gradient-stitch relative tracking-tighter">
                                                    {score}<span className="text-3xl opacity-50">%</span>
                                                </h3>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-2xl font-bold text-pink-300 tracking-tight leading-none uppercase">
                                                    {t(`soulmate.level.${getResultLevel(score!)}.title`)}
                                                </h4>
                                                <p className="text-sm text-white/60 leading-relaxed font-light italic px-4">
                                                    "{t(`soulmate.level.${getResultLevel(score!)}.desc`)}"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={handleShareTwitter}
                                                    className="w-full py-4 rounded-full bg-[#1da1f2] text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                                                >
                                                    <Share2 className="w-5 h-5 md:hidden lg:block" />
                                                    X
                                                </button>
                                                <button
                                                    onClick={handleShareFacebook}
                                                    className="w-full py-4 rounded-full bg-[#1877f2] text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
                                                >
                                                    <Facebook className="w-5 h-5 md:hidden lg:block" />
                                                    META
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleCopyLink}
                                                className="w-full py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors shadow-lg"
                                            >
                                                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                                {copied ? 'COPIED!' : 'COPY LINK'}
                                            </button>
                                            <button
                                                onClick={() => { setShowResult(false); setImage1(null); setImage2(null); }}
                                                className="w-full py-4 rounded-full bg-white/5 border border-white/10 text-white/40 font-bold hover:text-white transition-colors"
                                            >
                                                <RefreshCw className="w-5 h-5 mx-auto" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Detailed Analysis Main */}
                                    <div className="lg:col-span-8 space-y-8">
                                        {/* Visual Connection */}
                                        <div className="glass-premium rounded-[2.5rem] p-8 border border-white/10">
                                            <div className="flex items-center gap-3 mb-8">
                                                <Sparkles className="w-5 h-5 text-mystic-night-gold" />
                                                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50">{t('soulmate.harmony_analysis')}</h3>
                                            </div>

                                            <div className="grid grid-cols-2 gap-8 items-center mb-12">
                                                <div className="relative group">
                                                    <div className="absolute inset-0 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all duration-700" />
                                                    <div className="relative aspect-square rounded-full border-4 border-white/10 overflow-hidden shadow-2xl">
                                                        <img src={image1!} className="w-full h-full object-cover" alt="User 1" />
                                                    </div>
                                                </div>
                                                <div className="relative group">
                                                    <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-700" />
                                                    <div className="relative aspect-square rounded-full border-4 border-white/10 overflow-hidden shadow-2xl">
                                                        <img src={image2!} className="w-full h-full object-cover" alt="User 2" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-3">
                                                    <div className="flex items-center gap-2 text-pink-400">
                                                        <Target className="w-4 h-4" />
                                                        <span className="text-xs font-bold uppercase tracking-widest italic font-mono">Vision Alignment</span>
                                                    </div>
                                                    <p className="text-xs text-white/50 leading-relaxed italic">
                                                        {t('soulmate.analysis.eyes')}
                                                    </p>
                                                </div>
                                                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-3">
                                                    <div className="flex items-center gap-2 text-cyan-400">
                                                        <Zap className="w-4 h-4" />
                                                        <span className="text-xs font-bold uppercase tracking-widest italic font-mono">Resonance Factor</span>
                                                    </div>
                                                    <p className="text-xs text-white/50 leading-relaxed italic">
                                                        {t('soulmate.analysis.smile')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subconscious Reports */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="glass-premium rounded-[2.5rem] p-8 border border-white/10 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Activity className="w-5 h-5 text-purple-400" />
                                                    <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50">{t('soulmate.vibe_match')}</h3>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${Math.min(100, score! + 5)}%` }}
                                                            transition={{ duration: 1.5, delay: 0.5 }}
                                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-dimmed uppercase font-mono tracking-tighter">
                                                        {t('soulmate.analysis.structure')}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="glass-premium rounded-[2.5rem] p-8 border border-white/10 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Globe className="w-5 h-5 text-indigo-400" />
                                                    <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50">Karma Sync</h3>
                                                </div>
                                                <p className="text-sm font-light text-white/70 italic leading-relaxed">
                                                    {t('soulmate.analysis.aura')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-xl mx-auto w-full glass-premium rounded-3xl p-8 space-y-4 mt-8 opacity-60">
                                    <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 text-center italic">Biometric Data Encryption Active</h4>
                                    <p className="text-[10px] text-center text-white/30 uppercase font-mono tracking-widest">
                                        Data analyzed locally via client-side faceapi.js. No images stored on servers.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* Ad Placeholder */}
                {!showResult && (
                    <div className="mt-20 max-w-xl mx-auto">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                            <span className="text-sm font-bold tracking-[0.3em] uppercase text-white/20 mb-2 block">Destiny Algorithm</span>
                            <div className="h-24 bg-black/40 rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10" />
                                <span className="text-white/10 italic text-sm relative z-10">Searching for biological resonance patterns...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
