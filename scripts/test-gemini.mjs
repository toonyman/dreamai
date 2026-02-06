import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('Testing API Key:', apiKey ? 'Present (length: ' + apiKey.length + ')' : 'MISSING');

    if (!apiKey) return;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        console.log('Response:', response.text());
    } catch (error) {
        console.error('API Test Failed:', error);
    }
}

testGemini();
