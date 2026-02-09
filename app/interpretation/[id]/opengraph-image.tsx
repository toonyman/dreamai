import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Dream Interpretation Analysis';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// Initialize Supabase client
// Note: We need to use process.env here directly as imports might behave differently in Edge
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Image({ params }: { params: { id: string } }) {
    // Fetch dream data
    const { data } = await supabase
        .from('interpretations')
        .select('interpretation')
        .eq('id', params.id)
        .single();

    const summary = data?.interpretation?.summary || 'Dream Interpretation';
    const keywords = data?.interpretation?.luckyKeywords || [];

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0f172a', // Slate-900
                    backgroundImage: 'radial-gradient(circle at 25% 25%, #2e1065 0%, #0f172a 50%)', // Purple accent
                    color: 'white',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        fontSize: 24,
                        color: '#a78bfa', // Violet-400
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                    }}
                >
                    WhoAmI.zip Lab
                </div>

                <div
                    style={{
                        display: 'flex',
                        textAlign: 'center',
                        fontSize: 60,
                        fontWeight: 'bold',
                        background: 'linear-gradient(to bottom right, #ffffff, #c4b5fd)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        marginBottom: '40px',
                        lineHeight: 1.2,
                        maxWidth: '900px',
                    }}
                >
                    {summary}
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}
                >
                    {keywords.slice(0, 3).map((keyword: string, i: number) => (
                        <div
                            key={i}
                            style={{
                                backgroundColor: 'rgba(139, 92, 246, 0.3)', // Violet-500 with opacity
                                color: '#e9d5ff', // Purple-100
                                padding: '12px 24px',
                                borderRadius: '30px',
                                fontSize: 24,
                                border: '1px solid rgba(139, 92, 246, 0.5)',
                            }}
                        >
                            #{keyword}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        opacity: 0.8,
                    }}
                >
                    <div style={{ fontSize: 20, color: '#94a3b8' }}>Discover the meaning of your dreams</div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
