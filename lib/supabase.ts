import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function extractKeywords(dreamDescription: string): string[] {
    // Simple keyword extraction - split by spaces and filter common words
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'was', 'were', 'is', 'are', 'i', 'my', 'me']);

    const words = dreamDescription
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word));

    return [...new Set(words)].slice(0, 5);
}

export interface Dream {

    id: string;
    user_id: string;
    dream_description: string;
    interpretation: {
        summary: string;
        deepInterpretation: string;
        luckyKeywords: string[];
    };
    keywords: string[];
    created_at: string;
}

export async function saveDream(
    userId: string,
    dreamDescription: string,
    interpretation: any,
    keywords: string[]
): Promise<Dream | null> {
    try {
        const { data, error } = await supabase
            .from('dreams')
            .insert([
                {
                    user_id: userId,
                    dream_description: dreamDescription,
                    interpretation: interpretation,
                    keywords: keywords,
                },
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error saving dream:', error);
        return null;
    }
}

export async function getUserDreams(userId: string): Promise<Dream[]> {
    try {
        const { data, error } = await supabase
            .from('dreams')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching dreams:', error);
        return [];
    }
}

export async function findSimilarDreams(keywords: string[]): Promise<Dream[]> {
    try {
        // Search for dreams with similar keywords
        const { data, error } = await supabase
            .from('dreams')
            .select('*')
            .contains('keywords', keywords)
            .limit(5);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error finding similar dreams:', error);
        return [];
    }
}
