import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "WhoAmI.zip: AI Personality & Face Analysis",
        template: "%s | WhoAmI.zip"
    },
    description: "AI가 나보다 나를 더 잘 안다고? 🧠 관상, 꿈해몽, MBTI, 전생까지. 나에 대한 모든 것을 AI로 확인해보세요! Does AI know you better than yourself? Verify everything about you.",
    keywords: [
        "WhoAmI.zip", "AI Face Analysis", "Dream Meaning", "MBTI Test", "Past Life Test", "Soulmate Match",
        "관상 테스트", "꿈해몽", "MBTI 검사", "전생 테스트", "얼굴 궁합", "AI 분석"
    ],
    authors: [{ name: "WhoAmI.zip" }],
    creator: "WhoAmI.zip",
    publisher: "WhoAmI.zip",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://dreamai.vercel.app'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "WhoAmI.zip: AI가 분석하는 나의 모든 것",
        description: "AI가 나보다 나를 더 잘 안다고? 🧠 관상으로 보는 전생부터 얼굴 분석까지! 지금 바로 확인해보세요.",
        url: 'https://dreamai.vercel.app',
        siteName: 'WhoAmI.zip',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: '/whoamiThumnail.png',
                width: 1200,
                height: 630,
                alt: 'WhoAmI.zip - AI Analysis Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'WhoAmI.zip: AI Personality & Face Analysis',
        description: "6 Viral AI Tests: Dream, MBTI, Past Life, Soulmate, Face Analysis. Try it when you're bored! 🚀",
        images: ['/whoamiThumnail.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* Google Search Console Verification */}
                <meta name="google-site-verification" content="OAv4N25-_EylIfm5Jo5lZ5ldSv2O8fp0g8ipHl3tulQ" />

                {/* Google AdSense Verification */}
                <meta name="google-adsense-account" content="ca-pub-7644009675634803" />

                {/* Google AdSense */}
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7644009675634803"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />

                {/* Google Analytics */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-4FBMT32C7V"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-4FBMT32C7V');
                        `,
                    }}
                />

                {/* JSON-LD Structured Data for SEO */}
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "WhoAmI.zip",
                            "description": "Face scanning, Dream decoding, and MBTI vibes. Everything about YOU in one place.",
                            "url": "https://dreamai.vercel.app",
                            "applicationCategory": "LifestyleApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "inLanguage": ["en", "ko", "es", "ja"],
                            "featureList": [
                                "Global Face Analysis",
                                "AI Dream Lab",
                                "MBTI Personality Lab",
                                "Instant results"
                            ]
                        })
                    }}
                />
            </head>
            <body className={inter.className}>
                <div className="stitch-bg-mesh" />
                <div className="stitch-grid" />

                {/* Global Background Decorative Flares */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-[-1]">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <Navigation />
                <main className="min-h-screen relative z-0">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
