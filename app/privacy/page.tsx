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

                <div className="glass-card rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-dimmed">
                    <p className="text-lg">
                        {t('privacy.content')}
                    </p>

                    <div className="space-y-6 pt-4 border-t border-white/10">
                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('privacy.data_usage_title')}</h2>
                            <p>{t('privacy.data_usage_content')}</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('privacy.adsense_title')}</h2>
                            <p>{t('privacy.adsense_content')}</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('privacy.third_party_title')}</h2>
                            <p>{t('privacy.third_party_content')}</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('privacy.contact_title')}</h2>
                            <p>{t('privacy.contact_content')}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
