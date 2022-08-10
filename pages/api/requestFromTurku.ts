import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const city = req.headers['x-vercel-ip-city'] ?? null;

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
