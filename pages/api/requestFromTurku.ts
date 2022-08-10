import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: NextRequest) {
  console.log(req.headers.get('x-vercel-ip-city'));
  const city = req.headers.get('x-vercel-ip-city') ?? null;

  if (city === 'Turku') {
    return new Response(
      JSON.stringify({
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
