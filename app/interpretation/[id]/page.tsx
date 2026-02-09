import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import InterpretationPageClient from '@/components/InterpretationPageClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { data } = await supabase
        .from('interpretations')
        .select('interpretation')
        .eq('id', params.id)
        .single();

    const summary = data?.interpretation?.summary || 'WhoAmI.zip Dream Analysis';
    const description = data?.interpretation?.deepInterpretation?.slice(0, 160) || 'Discover the hidden meanings in your dreams with WhoAmI.zip AI.';

    return {
        title: `${summary} | WhoAmI.zip`,
        description: description,
        openGraph: {
            title: summary,
            description: description,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: summary,
            description: description,
        },
    };
}

export default function Page({ params }: { params: { id: string } }) {
    return <InterpretationPageClient id={params.id} />;
}
