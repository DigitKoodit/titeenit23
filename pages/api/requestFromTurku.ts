import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: NextRequest) {
  const city = req.headers.get('x-vercel-ip-city') ?? null;

  if (city === null) {
    return new Response(JSON.stringify({ message: 'Could not get city', headers: req.headers }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (city === 'Turku') {
    return new Response(
      JSON.stringify({
        fromTurku: true,
        message: 'Kyl maar 😎',
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      fromTurku: false,
      message: 'Et viel 🚌',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
