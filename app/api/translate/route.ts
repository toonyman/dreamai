import { NextRequest, NextResponse } from 'next/server';
import { translateInterpretation } from '@/lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const { interpretation, targetLanguage } = await request.json();

        if (!interpretation || !targetLanguage) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        const translated = await translateInterpretation(interpretation, targetLanguage);

        return NextResponse.json({ interpretation: translated });
    } catch (error) {
        console.error('Translation API error:', error);
        return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }
}
