
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import InterpretationDisplay from '@/components/InterpretationDisplay';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { data } = await supabase
        .from('interpretations')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!data) {
        return {
            title: 'DreamAI - Dream Interpretation',
            description: 'Discover the hidden meanings in your dreams!',
        };
    }

    // Default to 'Dream Interpretation' if interpretation data is missing structure
    const summary = data.interpretation?.summary || 'Deep Dream Analysis';
    const description = data.interpretation?.deepInterpretation || 'Explore the hidden meaning of your dreams with AI.';

    const baseUrl = 'https://dreamai.vercel.app'; // Fallback to hardcoded domain if env var missing

    return {
        title: `Dream Interpretation: ${summary.substring(0, 50)}...`,
        description: description.substring(0, 200) + '...',
        openGraph: {
            title: `Dream Interpretation: ${summary.substring(0, 50)}...`,
            description: description.substring(0, 200) + '...',
            url: `${baseUrl}/interpretation/${params.id}`,
            type: 'article',
        },
    };
}

export default async function InterpretationIdPage({ params }: { params: { id: string } }) {
    const { data } = await supabase
        .from('interpretations')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Dream Not Found</h1>
                <p className="text-gray-300">The dream interpretation you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <InterpretationDisplay
            dreamText={data.dream}
            interpretation={data.interpretation}
        />
    );
}
