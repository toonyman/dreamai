'use client';

import { Twitter, Facebook, Link as LinkIcon, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ShareSectionProps {
    title: string;
    description: string;
    url?: string;
    shareText?: string;
}

export default function ShareSection({ title, description, url, shareText }: ShareSectionProps) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${shareText || title + '\n' + description}\n${shareUrl}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const shareTwitter = () => {
        const text = shareText || `${title}\n${description}`;
        const fullText = `${text}\n\n${shareUrl}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`, '_blank');
    };

    const shareFacebook = () => {
        const quote = shareText || `${title}\n\n${description}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(quote)}`, '_blank');
    };

    return (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
            <button
                onClick={shareTwitter}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/60 hover:text-white"
                title={t('common.share_x')}
            >
                <Twitter className="w-5 h-5" />
            </button>
            <button
                onClick={shareFacebook}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/60 hover:text-white"
                title={t('common.share_facebook')}
            >
                <Facebook className="w-5 h-5" />
            </button>
            <button
                onClick={handleCopy}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/60 hover:text-white relative group"
                title={t('common.copy_link')}
            >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5" />}
                {copied && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-sm rounded pointer-events-none animate-fade-in">
                        {t('common.copied')}
                    </span>
                )}
            </button>
        </div>
    );
}
