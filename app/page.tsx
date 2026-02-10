'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Sparkles, Sword, Moon, ArrowRight, Facebook, Twitter, Linkedin, Heart, History } from 'lucide-react';
import '../lib/i18n';

export default function Home() {
    const { t } = useTranslation();

    const menuItems = [
        {
            id: 'dream',
            title: 'home.dream_card_title',
            desc: 'home.dream_card_desc',
            icon: Moon,
            color: 'from-purple-600 to-indigo-600',
            link: '/dream-analysis',
            hoverColor: 'group-hover:text-purple-400'
        },
        {
            id: 'mbti',
            title: 'home.mbti_card_title',
            desc: 'home.mbti_card_desc',
            icon: Sword,
            color: 'from-amber-500 to-mystic-night-gold',
            link: '/mbti',
            hoverColor: 'group-hover:text-amber-400'
        },
        {
            id: 'past-life',
            title: 'pastlife.card_title',
            desc: 'pastlife.card_desc',
            icon: History,
            color: 'from-amber-600 to-orange-800',
            link: '/past-life',
            hoverColor: 'group-hover:text-amber-400'
        },
        {
            id: 'soulmate',
            title: 'home.soulmate_card_title',
            desc: 'home.soulmate_card_desc',
            icon: Heart,
            color: 'from-pink-500 to-rose-600',
            link: '/soulmate',
            hoverColor: 'group-hover:text-pink-400'
        },
        {
            id: 'face',
            title: 'face.title',
            desc: 'face.subtitle',
            icon: Sparkles,
            color: 'from-cyan-400 to-blue-600',
            link: '/face-passport',
            hoverColor: 'group-hover:text-cyan-400'
        }
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 md:pt-32 pb-20 overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full text-center mb-12 space-y-6 relative z-10"
            >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-premium border border-white/10 animate-fade-in shadow-xl mb-4">
                    <Sparkles className="w-4 h-4 text-mystic-night-gold" />
                    <span className="text-sm font-semibold tracking-widest uppercase text-dimmed">
                        {t('home.welcome')}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient-stitch leading-[1.1] pb-2">
                    WhoAmI.zip
                </h1>

                <p className="text-lg md:text-xl text-dimmed font-light max-w-xl mx-auto leading-relaxed italic">
                    {t('home.motto')}
                </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl w-full relative z-10">
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={item.link} className="group block h-full">
                            <div className="relative h-full glass-premium rounded-[1.5rem] p-5 md:p-6 border border-white/10 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:border-white/20 hover:bg-white/5 active:scale-[0.99]">
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`} />

                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${item.hoverColor} transition-colors`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-xl font-bold tracking-tight group-hover:text-gradient-stitch transition-all">
                                            {t(item.title)}
                                        </h2>
                                        <p className="text-xs text-white/40 leading-relaxed font-light line-clamp-2">
                                            {t(item.desc)}
                                        </p>
                                    </div>

                                    <div className="pt-2">
                                        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-mystic-night-gold">
                                            {t('home.start_journey')}
                                            <div className="w-6 h-px bg-mystic-night-gold/30 group-hover:w-10 transition-all" />
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500`} />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* How it Works Section - Boosts static content for AdSense */}
            <div className="mt-20 max-w-7xl w-full relative z-10">
                <div className="text-center mb-10 space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
                        {t('home.how_it_works_title')}
                    </h2>
                    <p className="text-base text-dimmed max-w-xl mx-auto">
                        {t('home.how_it_works_desc')}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto glass-premium rounded-[2rem] border border-white/10 overflow-hidden divide-y divide-white/5 shadow-2xl">
                    <div className="group flex items-center gap-6 p-6 md:p-8 hover:bg-white/[0.01] transition-all text-left">
                        <div className="w-12 h-12 shrink-0 bg-purple-500/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                            <span className="text-xl font-bold text-purple-400/60">01</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-white/80 group-hover:text-purple-300 transition-colors uppercase tracking-tight">{t('home.step1_title')}</h3>
                            <p className="text-dimmed leading-relaxed text-sm font-light">
                                {t('home.step1_desc')}
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-center gap-6 p-6 md:p-8 hover:bg-white/[0.01] transition-all text-left">
                        <div className="w-12 h-12 shrink-0 bg-indigo-500/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                            <span className="text-xl font-bold text-indigo-400/60">02</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-white/80 group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{t('home.step2_title')}</h3>
                            <p className="text-dimmed leading-relaxed text-sm font-light">
                                {t('home.step2_desc')}
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-center gap-6 p-6 md:p-8 hover:bg-white/[0.01] transition-all text-left">
                        <div className="w-12 h-12 shrink-0 bg-amber-500/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                            <span className="text-xl font-bold text-amber-400/60">03</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-white/80 group-hover:text-amber-300 transition-colors uppercase tracking-tight">{t('home.step3_title')}</h3>
                            <p className="text-dimmed leading-relaxed text-sm font-light">
                                {t('home.step3_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final About Section */}
            <div className="mt-24 max-w-4xl w-full text-center space-y-6 pb-20 relative z-10 border-t border-white/5 pt-16">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/40">
                    Established 2026
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                    {t('home.about_title')}
                </h2>
                <p className="text-base text-dimmed leading-relaxed font-light italic max-w-2xl mx-auto">
                    "{t('home.about_description')}"
                </p>
            </div>
        </div>
    );
}
