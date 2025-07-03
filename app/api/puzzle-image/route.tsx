// app/api/puzzle-image/route.ts
import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('text') || 'Puzzle Text';
  
  return new ImageResponse(
    (
      {
        type: 'div',
        props: {
          children: text,
          style: {
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
          }
        }
      }
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
