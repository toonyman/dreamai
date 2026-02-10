'use client';

import { Twitter, Facebook, Link as LinkIcon, Check, Copy, Share2 } from 'lucide-react';
import { useState, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';

interface ShareSectionProps {
    title: string;
    description: string;
    url?: string;
    shareText?: string;
    imageElementRef?: RefObject<HTMLElement>;
}

export default function ShareSection({ title, description, url, shareText, imageElementRef }: ShareSectionProps) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
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

    const handleShareWithImage = async () => {
        if (!imageElementRef?.current) {
            // Fallback to text-only sharing
            shareTwitter();
            return;
        }

        setIsSharing(true);
        try {
            // Capture the image element as canvas
            const canvas = await html2canvas(imageElementRef.current, {
                backgroundColor: null,
                scale: 2
            });

            // Convert canvas to blob
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((blob) => {
                    resolve(blob!);
                }, 'image/png');
            });

            const file = new File([blob], 'passport.png', { type: 'image/png' });
            const text = shareText || `${title}\n${description}`;

            // Check if Web Share API with files is supported
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: title,
                    text: text,
                    url: shareUrl,
                    files: [file]
                });
            } else {
                // Fallback: download image and open share dialog
                const link = document.createElement('a');
                link.download = `passport-${Date.now()}.png`;
                link.href = canvas.toDataURL();
                link.click();

                // Also open Twitter share
                shareTwitter();
            }
        } catch (error) {
            console.error('Error sharing with image:', error);
            // Fallback to text-only sharing
            shareTwitter();
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
            {imageElementRef && (
                <button
                    onClick={handleShareWithImage}
                    disabled={isSharing}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-white/60 hover:text-white disabled:opacity-50"
                    title={t('common.share_with_image', { defaultValue: 'Share with Image' })}
                >
                    {isSharing ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Share2 className="w-5 h-5" />
                    )}
                </button>
            )}
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
