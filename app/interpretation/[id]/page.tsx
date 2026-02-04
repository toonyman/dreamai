
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
            <div className="container mx-auto px-4 py-20 max-w-4xl text-center relative z-10">
                <h1 className="text-4xl font-bold text-white mb-6 font-cinzel text-glow">Dream Lost in Mist</h1>
                <p className="text-purple-200/60 text-lg">The dream interpretation you are looking for has faded into the subconscious.</p>
                <div className="mt-12">
                    <a href="/" className="px-8 py-4 glass rounded-xl text-white font-bold tracking-widest uppercase border border-purple-500/30 hover:bg-white/10 transition-all">
                        Return to Reality
                    </a>
                </div>
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
