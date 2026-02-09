'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Sparkles, Sword, Moon, ArrowRight, Facebook, Twitter, Linkedin } from 'lucide-react';
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

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full relative z-10">
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={item.link} className="group block h-full">
                            <div className="relative h-full glass-premium rounded-[2rem] p-6 md:p-8 border border-white/10 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:bg-white/5 active:scale-[0.98]">
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`} />

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-4 rounded-3xl bg-white/5 border border-white/10 ${item.hoverColor} transition-colors`}>
                                            <item.icon className="w-8 h-8" />
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-white/50 group-hover:translate-x-2 transition-all" />
                                    </div>

                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-bold tracking-tight group-hover:text-gradient-stitch transition-all">
                                            {t(item.title)}
                                        </h2>
                                        <p className="text-sm text-white/40 leading-relaxed font-light">
                                            {t(item.desc)}
                                        </p>
                                    </div>

                                    <div className="pt-4">
                                        <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-mystic-night-gold">
                                            {t('home.start_journey')}
                                            <div className="w-8 h-px bg-mystic-night-gold/30 group-hover:w-12 transition-all" />
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

            {/* Footer decoration */}
            <div className="mt-20 opacity-20 hover:opacity-100 transition-opacity">
                <div className="flex justify-center space-x-12 text-white/30 text-sm font-bold tracking-[0.3em] uppercase">
                    <span className="cursor-default">Insight</span>
                    <span className="cursor-default">Legend</span>
                    <span className="cursor-default">Destiny</span>
                </div>
            </div>

            {/* About Section */}
            <div className="mt-20 max-w-2xl w-full text-center space-y-6 pb-20 relative z-10">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent mx-auto" />
                <h2 className="text-xl md:text-2xl font-serif italic text-white/80">
                    {t('home.about_title')}
                </h2>
                <p className="text-base text-dimmed leading-loose font-light italic max-w-xl mx-auto">
                    {t('home.about_description')}
                </p>
                <div className="flex justify-center space-x-8 text-subtle">
                    <Facebook className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                    <Twitter className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                    <Linkedin className="w-6 h-6 cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
}
