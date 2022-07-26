/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['digit.fi', 'datateknologerna.org'],
  },
  experimental: { images: { allowFutureImage: true } },
};
