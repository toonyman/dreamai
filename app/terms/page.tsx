'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

export default function TermsPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen text-white pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient-stitch">
                        {t('terms.title')}
                    </h1>
                </header>

                <div className="glass-card rounded-3xl p-8 md:p-12 space-y-6 leading-relaxed text-dimmed">
                    <p className="text-lg">
                        {t('terms.content')}
                    </p>
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <h2 className="text-xl font-bold text-white">License to Use</h2>
                        <p>Unless otherwise stated, WhoAmI.zip and/or its licensors own the intellectual property rights for all material on WhoAmI.zip. All intellectual property rights are reserved.</p>

                        <h2 className="text-xl font-bold text-white">User Responsibility</h2>
                        <p>Users are responsible for any result they generate and share. The AI interpretations are not legally binding and should be treated as a form of creative expression.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
