import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function getGroqCompletion(content: string, systemPrompt: string) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: content,
                },
            ],
            model: 'llama3-8b-8192',
            temperature: 0.7,
            max_tokens: 1024,
            response_format: { type: 'json_object' },
        });

        return JSON.parse(completion.choices[0]?.message?.content || '{}');
    } catch (error) {
        console.error('Groq API Error:', error);
        throw error;
    }
}

export async function getGroqTextCompletion(content: string, systemPrompt: string) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: content,
                },
            ],
            model: 'llama3-8b-8192',
            temperature: 0.7,
            max_tokens: 1024,
        });

        return completion.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('Groq API Error:', error);
        throw error;
    }
}
