// app/api/puzzle-image/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text') || 'Unit Conversion Challenge';
  
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f0f9ff',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600 }}>{text}</div>
        <div style={{ fontSize: 24, marginTop: 20 }}>Enter your answer below 👇</div>
      </div>
    ),
    {
      width: 600,
      height: 400,
    }
  );
}
