// app/api/puzzle-image/route.tsx
import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('text') || 'Puzzle Text';
  
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#000',
          width: '100%',
          height: '100%',
          color: 'white',
          padding: '50px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 60,
          fontWeight: 'bold'
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Add fonts if needed
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('@/assets/Inter-Regular.ttf', import.meta.url)
          ).then((res) => res.arrayBuffer()),
          style: 'normal',
          weight: 400
        }
      ]
    }
  );
}
