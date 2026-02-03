'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InterpretationDisplay from '@/components/InterpretationDisplay';
import '../../lib/i18n';


interface Interpretation {
    summary: string;
    deepInterpretation: string;
    luckyKeywords: string[];
}

export default function InterpretationPage() {
    const [dreamText, setDreamText] = useState('');
    const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const dream = sessionStorage.getItem('currentDream');
        if (!dream) {
            router.push('/');
            return;
        }

        setDreamText(dream);
        interpretDream(dream);
    }, [router]);

    const interpretDream = async (dream: string) => {
        try {
            setIsLoading(true);

            // Call the API route to get interpretation
            const response = await fetch('/api/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dream }),
            });

            if (!response.ok) throw new Error('Failed to interpret dream');

            const data = await response.json();
            setInterpretation(data.interpretation);

            // Update URL with ID for sharing if available
            if (data.id) {
                const newUrl = `/interpretation/${data.id}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t('common.error'));
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Sparkles className="w-16 h-16 text-purple-400 animate-pulse mb-4" />
                    <p className="text-xl text-gray-300">{t('home.loading')}</p>
                </div>
            </div>
        );
    }

    return (
        <InterpretationDisplay
            dreamText={dreamText}
            interpretation={interpretation!}
        />
    );
}
