'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Sword, Shield, Scroll, RefreshCw, Trophy, Facebook, Twitter, Linkedin } from 'lucide-react';
import { mbtiQuestions, arthurianCharacters, ArthurianCharacter } from '../../lib/mbtiData';
import ShareSection from '../../components/ShareSection';

export default function MBTIPage() {
    const { t } = useTranslation();
    const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<ArthurianCharacter | null>(null);

    const handleStart = () => {
        setStep('quiz');
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    const handleAnswer = (type: string) => {
        const newAnswers = [...answers, type];
        setAnswers(newAnswers);

        if (currentQuestionIndex < mbtiQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        const counts: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        finalAnswers.forEach(ans => {
            counts[ans] = (counts[ans] || 0) + 1;
        });

        const mbti = (
            (counts.E >= counts.I ? 'E' : 'I') +
            (counts.S >= counts.N ? 'S' : 'N') +
            (counts.T >= counts.F ? 'T' : 'F') +
            (counts.J >= counts.P ? 'J' : 'P')
        );

        setResult(arthurianCharacters[mbti] || arthurianCharacters['ENTJ']);
        setStep('result');
    };

    const handleRetry = () => {
        setStep('intro');
    };

    return (
        <div className="min-h-screen text-white pt-24 md:pt-32 pb-20 px-4 relative overflow-hidden">

            <div className="max-w-4xl mx-auto relative z-10">
                <AnimatePresence mode="wait">
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center space-y-6"
                        >
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-premium border border-white/10 animate-fade-in shadow-xl mx-auto">
                                <Sword className="w-4 h-4 text-mystic-night-gold" />
                                <span className="text-sm font-semibold tracking-widest uppercase text-dimmed">
                                    Legendary Quest
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-gradient-stitch pb-2">
                                {t('mbti.title')}
                            </h1>
                            <p className="text-lg md:text-xl text-dimmed max-w-xl mx-auto leading-relaxed">
                                {t('mbti.subtitle')}
                            </p>
                            <div className="pt-4">
                                <button
                                    onClick={handleStart}
                                    className="px-10 py-4 rounded-full bg-mystic-gradient text-white font-bold text-lg shadow-2xl hover:scale-105 transition-transform group flex items-center gap-3 mx-auto"
                                >
                                    <Scroll className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    {t('mbti.start')}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            {/* Progress bar */}
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(currentQuestionIndex / mbtiQuestions.length) * 100}%` }}
                                    className="h-full bg-mystic-400"
                                />
                            </div>

                            <div className="space-y-4">
                                <span className="text-mystic-night-gold font-mono text-sm tracking-widest uppercase">
                                    Trial {currentQuestionIndex + 1} of {mbtiQuestions.length}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-medium leading-tight">
                                    {t(`mbti.q${mbtiQuestions[currentQuestionIndex].id}.text`)}
                                </h2>
                            </div>

                            <div className="grid gap-4">
                                {mbtiQuestions[currentQuestionIndex].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option.type)}
                                        className="p-5 text-left rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mystic-400 transition-all group relative overflow-hidden"
                                    >
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-mystic-400 text-mystic-400 font-bold transition-colors">
                                                {idx === 0 ? 'A' : 'B'}
                                            </div>
                                            <span className="text-lg text-white/80 group-hover:text-white transition-colors">
                                                {t(`mbti.q${mbtiQuestions[currentQuestionIndex].id}.opt${idx === 0 ? 'A' : 'B'}`)}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'result' && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-10"
                        >
                            <div className="text-center space-y-4">
                                <Trophy className="w-12 h-12 text-mystic-night-gold mx-auto animate-bounce" />
                                <h2 className="text-3xl md:text-5xl font-bold text-gradient-stitch">
                                    {t('mbti.result_title')}
                                </h2>
                            </div>

                            <div className="glass-premium rounded-[2rem] p-6 md:p-10 border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Shield className="w-32 h-32" />
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="space-y-1">
                                        <p className="text-mystic-night-gold text-sm tracking-[0.3em] font-bold uppercase">
                                            {result.mbti} • {t(`mbti.char.${result.id}.title`)}
                                        </p>
                                        <h3 className="text-4xl md:text-5xl font-bold">
                                            {t(`mbti.char.${result.id}.name`)}
                                        </h3>
                                    </div>

                                    <p className="text-xl text-white/70 leading-relaxed italic">
                                        "{t(`mbti.char.${result.id}.desc`)}"
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {result.traits.map((trait, i) => (
                                            <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold tracking-widest uppercase text-white/60">
                                                {trait}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Detailed Reasoning Section */}
                                    <div className="pt-8 space-y-8 border-t border-white/5">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Scroll className="w-5 h-5 text-mystic-night-gold" />
                                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-white/50">
                                                    {t('mbti.analysis_label')}
                                                </h4>
                                            </div>
                                            <p className="text-base text-white/80 leading-relaxed font-light">
                                                {t(`mbti.char.${result.id}.detailed_reason`)}
                                            </p>
                                        </div>

                                        <div className="p-6 rounded-[1.5rem] bg-mystic-night-gold/5 border border-mystic-night-gold/10 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Sparkles className="w-5 h-5 text-mystic-night-gold" />
                                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-mystic-night-gold/70">
                                                    {t('mbti.path_label')}
                                                </h4>
                                            </div>
                                            <p className="text-base text-white/90 leading-relaxed italic font-serif">
                                                {t(`mbti.char.${result.id}.hero_path`)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-premium rounded-3xl p-8 space-y-4">
                                    <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-white/50 text-center">{t('common.share_legend')}</h4>
                                    <ShareSection
                                        title={t(`mbti.char.${result.id}.name`)}
                                        description={t(`mbti.char.${result.id}.desc`)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={handleRetry}
                                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    {t('mbti.retry')}
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-4 rounded-2xl bg-mystic-gradient font-bold flex items-center gap-2"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    {t('common.return_home')}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
}
