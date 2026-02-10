'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-md py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gradient-stitch">WhoAmI.zip</h3>
                    <p className="text-sm text-dimmed max-w-xs mx-auto md:mx-0 leading-relaxed">
                        {t('home.about_description')}
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white/40">Lab Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/dream-analysis" className="text-dimmed hover:text-purple-400 transition-colors">{t('nav.dream')}</Link></li>
                        <li><Link href="/mbti" className="text-dimmed hover:text-purple-400 transition-colors">{t('nav.mbti')}</Link></li>
                        <li><Link href="/past-life" className="text-dimmed hover:text-purple-400 transition-colors">{t('nav.pastlife')}</Link></li>
                        <li><Link href="/soulmate" className="text-dimmed hover:text-purple-400 transition-colors">{t('nav.soulmate')}</Link></li>
                        <li><Link href="/face-passport" className="text-dimmed hover:text-purple-400 transition-colors">{t('nav.face')}</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-bold tracking-widest uppercase text-white/40">Legal & Privacy</h4>
                    <ul className="space-y-2">
                        <li><Link href="/privacy" className="text-dimmed hover:text-purple-400 transition-colors">{t('nav.privacy')}</Link></li>
                        <li><Link href="/terms" className="text-dimmed hover:text-purple-400 transition-colors">{t('nav.terms')}</Link></li>
                        <li className="flex justify-center md:justify-start space-x-4 pt-4">
                            <Twitter className="w-5 h-5 text-white/20 hover:text-white transition-colors cursor-pointer" />
                            <Github className="w-5 h-5 text-white/20 hover:text-white transition-colors cursor-pointer" />
                            <Mail className="w-5 h-5 text-white/20 hover:text-white transition-colors cursor-pointer" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-xs text-subtle">
                    © 2026 WhoAmI.zip Lab. All rights reserved. Unzipping your soul with ethical AI.
                </p>
            </div>
        </footer>
    );
}
