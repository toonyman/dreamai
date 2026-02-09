'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n';

export default function PrivacyPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen text-white pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient-stitch">
                        {t('privacy.title')}
                    </h1>
                </header>

                <div className="glass-card rounded-3xl p-8 md:p-12 space-y-6 leading-relaxed text-dimmed">
                    <p className="text-lg">
                        {t('privacy.content')}
                    </p>
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <h2 className="text-xl font-bold text-white">Data Protection</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>

                        <h2 className="text-xl font-bold text-white">Third Party Disclosure</h2>
                        <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
