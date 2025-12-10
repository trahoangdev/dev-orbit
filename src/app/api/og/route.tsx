import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'DevOrbit - Tech Blog';

        // ?date=<date>
        const hasDate = searchParams.has('date');
        const date = hasDate ? searchParams.get('date') : 'Latest News';

        // ?author=<author_name>
        const author = searchParams.get('author') || 'trahoangdev';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#0f172a', // slate-900
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #334155 2%, transparent 0%), radial-gradient(circle at 75px 75px, #334155 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '40px 80px',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid #334155',
                            borderRadius: '20px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                            fontSize: 30,
                            color: '#94a3b8' // slate-400
                        }}>
                            <span style={{ marginRight: 10 }}>🚀</span> DevOrbit
                        </div>

                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 'bold',
                                marginBottom: 20,
                                lineHeight: 1.2,
                                backgroundImage: 'linear-gradient(90deg, #60a5fa, #c084fc)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {title}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '20px',
                                marginTop: '20px',
                                fontSize: 24,
                                color: '#e2e8f0' // slate-200
                            }}
                        >
                            <span>{author}</span>
                            <span style={{ fontSize: 16, color: '#64748b' }}>●</span>
                            <span>{date}</span>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
