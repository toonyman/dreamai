'use client';

import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Camera, Upload, RefreshCw, Share2, ShieldCheck, Plane, Hash, Globe, User, Facebook, Twitter, Linkedin, Frown, BarChart3, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { faceCountries, FaceCountry } from '../../lib/faceData';
import ShareSection from '../../components/ShareSection';

export default function FacePassportPage() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<FaceCountry | null>(null);
    const [showPassport, setShowPassport] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const passportRef = useRef<HTMLDivElement>(null);
    const [detailedMetrics, setDetailedMetrics] = useState<any>(null);
    const [unfavoredCountries, setUnfavoredCountries] = useState<FaceCountry[]>([]);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = '/models';
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                ]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading face-api models:', error);
            }
        };
        loadModels();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setResult(null);
                setShowPassport(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(video, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            setImage(dataUrl);

            // Stop camera
            const stream = video.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const analyzeFace = async () => {
        if (!image) return;
        setIsAnalyzing(true);

        try {
            const img = await faceapi.fetchImage(image);
            const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            // Artificial delay for UX
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (detections) {
                const expressions = detections.expressions;

                // Logic based on expressions/landmarks
                let matchIndex = 0;

                if (expressions.happy > 0.5) {
                    matchIndex = 0; // Brazil
                } else if (expressions.neutral > 0.5) {
                    matchIndex = 1; // Norway
                } else if (expressions.surprised > 0.3) {
                    matchIndex = 2; // Thailand
                } else {
                    matchIndex = Math.floor(Math.random() * faceCountries.length);
                }

                // Generate metrics
                const harmony = Math.floor(Math.random() * 10) + 90; // 90-99%
                const vibes = ["exotic", "classic", "modern", "royal", "friendly"];
                const charms = ["eyes", "jawline", "harmony", "smile", "aura"];
                const ranks = ["S+", "SSS", "Exotic Elite", "Legendary", "Alpha"];

                setDetailedMetrics({
                    harmony,
                    vibe: vibes[Math.floor(Math.random() * vibes.length)],
                    charm: charms[Math.floor(Math.random() * charms.length)],
                    rank: ranks[Math.floor(Math.random() * ranks.length)]
                });

                // Generate unfavored (least matched)
                const targetId = faceCountries[matchIndex].id;
                const others = faceCountries.filter(c => c.id !== targetId);
                const shuffled = [...others].sort(() => 0.5 - Math.random());
                setUnfavoredCountries(shuffled.slice(0, 3));

                setResult(faceCountries[matchIndex]);
                setShowPassport(true);
            } else {
                // Fallback
                const randomIndex = Math.floor(Math.random() * faceCountries.length);
                setResult(faceCountries[randomIndex]);

                setDetailedMetrics({
                    harmony: 88,
                    vibe: "natural",
                    charm: "auth",
                    rank: "Alpha"
                });

                const others = faceCountries.filter(c => c.id !== faceCountries[randomIndex].id);
                setUnfavoredCountries(others.sort(() => 0.5 - Math.random()).slice(0, 3));

                setShowPassport(true);
            }
        } catch (error) {
            console.error('Face analysis failed:', error);
            setResult(faceCountries[Math.floor(Math.random() * faceCountries.length)]);
            setShowPassport(true);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const downloadPassport = async () => {
        if (passportRef.current) {
            const canvas = await html2canvas(passportRef.current, {
                backgroundColor: null,
                scale: 2
            });
            const link = document.createElement('a');
            link.download = `face-passport-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="min-h-screen text-white pt-24 md:pt-32 pb-20 px-4 relative overflow-hidden">

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="text-center space-y-6 mb-12">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-premium border border-white/10 animate-fade-in shadow-xl mx-auto">
                        <Plane className="w-4 h-4 text-cyan-400 rotate-45" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-dimmed">
                            Mystic Gateway
                        </span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient-stitch uppercase">
                            {t('face.title')}
                        </h1>
                        <p className="text-lg md:text-xl text-dimmed font-light max-w-xl mx-auto leading-relaxed">
                            {t('face.subtitle')}
                        </p>
                    </div>
                </header>

                <main className="space-y-12">
                    <AnimatePresence mode="wait">
                        {!showPassport ? (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-premium rounded-[2rem] border border-white/10 p-6 md:p-10 text-center space-y-8"
                            >
                                {!image && !isAnalyzing && (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="aspect-square rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 transition-colors hover:border-cyan-500/50 group relative overflow-hidden">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                                />
                                                <Upload className="w-12 h-12 text-white/20 mb-4 group-hover:text-cyan-400 transition-colors" />
                                                <h3 className="text-xl font-bold">{t('face.upload_title')}</h3>
                                                <p className="text-white/40 text-sm mt-2">{t('face.upload_desc')}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div
                                                onClick={startCamera}
                                                className="aspect-square rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-white/10 transition-all group"
                                            >
                                                <Camera className="w-12 h-12 text-white/20 mb-4 group-hover:text-cyan-400 transition-colors" />
                                                <h3 className="text-xl font-bold">Use Camera</h3>
                                                <p className="text-white/40 text-sm mt-2">Capture your portrait live</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {image && !isAnalyzing && (
                                    <div className="space-y-8">
                                        <div className="relative inline-block">
                                            <img src={image} alt="Target" className="max-w-xs mx-auto rounded-3xl border-4 border-white/10 shadow-2xl" />
                                            <button
                                                onClick={() => setImage(null)}
                                                className="absolute -top-4 -right-4 p-2 bg-red-500 rounded-full shadow-xl hover:scale-110 transition-transform"
                                            >
                                                <RefreshCw className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={analyzeFace}
                                            className="w-full max-w-sm mx-auto px-10 py-5 rounded-full bg-mystic-gradient text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-3 animate-pulse"
                                        >
                                            <ShieldCheck className="w-6 h-6" />
                                            START IMMIGRATION CHECK
                                        </button>
                                    </div>
                                )}

                                {isAnalyzing && (
                                    <div className="py-20 space-y-8">
                                        <div className="relative w-48 h-48 mx-auto">
                                            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <User className="w-16 h-16 text-cyan-400 animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold animate-pulse text-cyan-400">{t('face.analyzing')}</h3>
                                            <p className="text-white/40 font-mono text-base uppercase tracking-widest">Processing Biometric Landmarks...</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-12"
                            >
                                {/* Passport Card */}
                                <div
                                    ref={passportRef}
                                    className="max-w-4xl mx-auto bg-[#1a1c2c] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 relative"
                                >
                                    {/* Passport Header */}
                                    <div className="bg-[#121420] p-6 border-b border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-5 h-5 text-cyan-400" />
                                            <span className="text-sm font-bold tracking-[0.3em] uppercase text-dimmed">World Federation Passport</span>
                                        </div>
                                        <span className="text-cyan-400 font-mono text-sm">P&lt;REPUBLIC&lt;{result && t(`face.country.${result.id}.name`).toUpperCase()}</span>
                                    </div>

                                    <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                                        {/* Photo Section */}
                                        <div className="space-y-4">
                                            <div className="w-40 h-52 bg-black rounded-lg border-2 border-white/10 overflow-hidden relative group">
                                                <img src={image!} alt="Passport" className="w-full h-full object-cover grayscale" />
                                                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />

                                                {/* APPROVED Stamp */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-4 border-green-500/80 rounded-xl px-4 py-2 opacity-90 pointer-events-none">
                                                    <span className="text-green-500 font-black text-2xl tracking-tighter">{t('face.approved')}</span>
                                                </div>
                                            </div>
                                            <div className="font-mono text-sm text-dimmed tracking-widest uppercase">
                                                No: {new Date().getFullYear()}-FP-{Math.floor(Math.random() * 9000) + 1000}
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="flex-1 space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1 border-b border-white/5 pb-2">
                                                    <p className="text-sm uppercase text-white/50 tracking-widest font-bold font-mono">{t('face.label.name')}</p>
                                                    <p className="text-lg font-bold text-white uppercase tracking-tighter">Citizen / One</p>
                                                </div>
                                                <div className="space-y-1 border-b border-white/5 pb-2">
                                                    <p className="text-sm uppercase text-white/40 tracking-widest font-bold">{t('face.label.authority')}</p>
                                                    <p className="text-lg font-bold text-cyan-400 uppercase tracking-tighter">DreamAI HQ</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-sm uppercase text-white/40 tracking-widest font-bold">{t('face.label.region')}</p>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-4xl">{result?.flag}</span>
                                                    <p className="text-3xl font-black text-white tracking-widest uppercase">{t(`face.country.${result?.id}.name`)}</p>
                                                </div>
                                            </div>

                                            <div className="bg-black/20 rounded-2xl p-4 border border-white/5 italic text-sm text-white/60 leading-relaxed">
                                                "{t(`face.country.${result?.id}.desc`)}"
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nonsense Section */}
                                    <div className="bg-cyan-500/5 p-8 border-t border-white/5 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-cyan-400" />
                                            <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-cyan-400">{t('face.nonsense_title')}</h4>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-white/50 uppercase font-bold">{t('face.fate_title')}</p>
                                                <p className="text-sm font-bold text-white/90">{t(`face.country.${result?.id}.nonsense_title`)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-white/50 uppercase font-bold">{t('face.ideal_job')}</p>
                                                <p className="text-sm font-bold text-white/90">{t(`face.country.${result?.id}.nonsense_job`)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-white/50 uppercase font-bold">{t('face.past_life')}</p>
                                                <p className="text-sm font-bold text-white/90">{t(`face.country.${result?.id}.nonsense_past`)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Analysis Report */}
                                {detailedMetrics && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="max-w-4xl mx-auto space-y-6 w-full"
                                    >
                                        <div className="glass-premium rounded-3xl overflow-hidden border border-white/5">
                                            <div className="bg-white/5 p-6 border-b border-white/5 flex items-center gap-3">
                                                <BarChart3 className="w-5 h-5 text-purple-400" />
                                                <h3 className="text-base font-bold tracking-[0.2em] uppercase text-white/80">{t('face.metrics.title')}</h3>
                                            </div>

                                            <div className="p-8 space-y-8">
                                                {/* Metrics Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-bold tracking-widest text-white/40 uppercase">{t('face.metrics.harmony')}</p>
                                                        <div className="flex items-end gap-2">
                                                            <span className="text-3xl font-black text-white">{detailedMetrics.harmony}</span>
                                                            <span className="text-sm font-bold text-purple-400 pb-1">%</span>
                                                        </div>
                                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${detailedMetrics.harmony}%` }}
                                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <p className="text-sm font-bold tracking-widest text-white/40 uppercase">{t('face.metrics.rank')}</p>
                                                        <p className="text-3xl font-black text-cyan-400">
                                                            {detailedMetrics.rank}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Metrics Grid 2 */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-bold tracking-widest text-white/40 uppercase">{t('face.metrics.vibe')}</p>
                                                        <p className="text-lg font-bold text-white leading-tight">
                                                            {t(`face.vibe.${detailedMetrics.vibe}`)}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <p className="text-sm font-bold tracking-widest text-white/40 uppercase">{t('face.metrics.charm')}</p>
                                                        <p className="text-lg font-bold text-purple-400 leading-tight">
                                                            {t(`face.charm.${detailedMetrics.charm}`)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Unfavored Section */}
                                                <div className="pt-8 border-t border-white/5 space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <Frown className="w-4 h-4 text-red-400" />
                                                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-red-400">{t('face.metrics.unfavored')}</h4>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        {unfavoredCountries.map((country, idx) => (
                                                            <div key={idx} className="bg-red-500/5 rounded-2xl p-4 border border-red-500/10 flex items-center gap-3">
                                                                <span className="text-2xl">{country.flag}</span>
                                                                <span className="text-sm font-bold text-white/80 uppercase">{t(`face.country.${country.id}.name`)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-white/40 italic text-center">
                                                        {t('face.metrics.unfavored_desc')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                    <button
                                        onClick={downloadPassport}
                                        className="px-10 py-5 rounded-full bg-white text-[#121420] font-bold text-lg hover:bg-cyan-400 transition-colors flex items-center gap-3 shadow-2xl"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        {t('face.share')}
                                    </button>
                                    <button
                                        onClick={() => { setShowPassport(false); setImage(null); }}
                                        className="px-8 py-5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3"
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                        {t('face.retry')}
                                    </button>
                                </div>

                                <div className="max-w-xl mx-auto w-full glass-premium rounded-3xl p-8 space-y-4 mt-8">
                                    <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-white/50 text-center">{t('common.share_identity')}</h4>
                                    <ShareSection
                                        title={t(`face.country.${result?.id}.name`)}
                                        description={t(`face.country.${result?.id}.desc`)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* Ad Placeholder */}
                <div className="mt-20 max-w-xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                        <span className="text-sm font-bold tracking-[0.3em] uppercase text-white/20 mb-2 block">Advertisement</span>
                        <div className="h-24 bg-black/40 rounded-2xl flex items-center justify-center border border-white/5">
                            <span className="text-white/10 italic text-sm">Sponsored Content Slot</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Video/Canvas for Camera */}
            <video ref={videoRef} autoPlay muted className="hidden" />
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
