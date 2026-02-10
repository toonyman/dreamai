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

                <div className="glass-card rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-dimmed">
                    <p className="text-lg">
                        {t('terms.content')}
                    </p>

                    <div className="space-y-6 pt-4 border-t border-white/10">
                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('terms.purpose_title')}</h2>
                            <p>{t('terms.purpose_content')}</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('terms.user_resp_title')}</h2>
                            <p>{t('terms.user_resp_content')}</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">{t('terms.ip_title')}</h2>
                            <p>{t('terms.ip_content')}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
