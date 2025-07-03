// app/api/result-image/route.ts
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const correct = req.nextUrl.searchParams.get('correct') === 'true';
  const answer = req.nextUrl.searchParams.get('answer') || '';
  
  return new ImageResponse(
    (
      {
        type: 'div',
        props: {
          children: correct ? '✅ Correct!' : '❌ Incorrect!',
          style: {
            display: 'flex',
            background: correct ? '#4CAF50' : '#F44336',
            width: '100%',
            height: '100%',
            color: 'white',
            padding: '50px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 60,
            fontWeight: 'bold'
          }
        }
      }
    ),
    { width: 1200, height: 630 }
  );
}
