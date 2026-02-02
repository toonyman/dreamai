'use client';

export default function AdSenseScript() {
    const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

    if (!adsenseId) return null;

    return (
        <>
            <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
                crossOrigin="anonymous"
            />
        </>
    );
}
