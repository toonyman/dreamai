import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dream Interpretation - Free AI-Powered Dream Analysis",
    description: "Discover the hidden meanings in your dreams with our free AI-powered psychological analysis. Get instant dream interpretations in English, Korean, Spanish, and Japanese. Understand your subconscious mind through advanced AI technology.",
    keywords: [
        "dream interpretation",
        "dream analysis",
        "AI dream meaning",
        "dream psychology",
        "free dream interpretation",
        "dream symbols",
        "subconscious mind",
        "dream analyzer",
        "꿈 해몽",
        "interpretación de sueños",
        "夢占い"
    ],
    authors: [{ name: "DreamAI" }],
    creator: "DreamAI",
    publisher: "DreamAI",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://dreamai.vercel.app'),
    alternates: {
        canonical: '/',
        languages: {
            'en': '/en',
            'ko': '/ko',
            'es': '/es',
            'ja': '/ja',
        },
    },
    openGraph: {
        title: "Dream Interpretation - Free AI-Powered Dream Analysis",
        description: "Discover the hidden meanings in your dreams with our free AI-powered psychological analysis. Available in multiple languages.",
        url: 'https://dreamai.vercel.app',
        siteName: 'DreamAI',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'DreamAI - AI-Powered Dream Interpretation',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dream Interpretation - Free AI Analysis',
        description: 'Discover the hidden meanings in your dreams with AI-powered psychological analysis.',
        images: ['/og-image.png'],
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
                            "name": "DreamAI",
                            "description": "Free AI-powered dream interpretation and analysis service",
                            "url": "https://dreamai.vercel.app",
                            "applicationCategory": "LifestyleApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "inLanguage": ["en", "ko", "es", "ja"],
                            "featureList": [
                                "AI-powered dream analysis",
                                "Multi-language support",
                                "Psychological interpretation",
                                "Instant results"
                            ]
                        })
                    }}
                />
            </head>
            <body className={inter.className}>
                <Navigation />
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
