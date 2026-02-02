'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Sparkles } from 'lucide-react';
import '../../lib/i18n';
import { supabase, getUserDreams, Dream } from '@/lib/supabase';

export default function HistoryPage() {
    const [dreams, setDreams] = useState<Dream[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const { t } = useTranslation();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
            loadDreams(user.id);
        } else {
            setIsLoading(false);
        }
    };

    const loadDreams = async (userId: string) => {
        setIsLoading(true);
        const userDreams = await getUserDreams(userId);
        setDreams(userDreams);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center">
                    <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-4">{t('history.title')}</h1>
                    <p className="text-gray-400 mb-6">{t('history.signIn')}</p>
                    <button
                        onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                        className="dreamy-gradient text-white font-semibold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Sign In with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('history.title')}
            </h1>

            {dreams.length === 0 ? (
                <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">{t('history.empty')}</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {dreams.map((dream) => (
                        <div key={dream.id} className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <Calendar className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-2">
                                        {new Date(dream.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-300 mb-3 line-clamp-2">
                                        {dream.dream_description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {dream.interpretation.luckyKeywords.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
