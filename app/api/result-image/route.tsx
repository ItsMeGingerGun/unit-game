// app/api/result-image/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const correct = searchParams.get('correct') === 'true';
  
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: correct ? '#f0fdf4' : '#fef2f2',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, color: correct ? '#15803d' : '#b91c1c' }}>
          {correct ? 'Correct! 🎉' : 'Try Again! ❌'}
        </div>
        <div style={{ fontSize: 24, marginTop: 20 }}>
          {correct ? 'Points added to your score!' : 'Better luck next time!'}
        </div>
      </div>
    ),
    {
      width: 600,
      height: 400,
    }
  );
}
