const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['digit.fi', 'datateknologerna.org'],
  },
  experimental: { images: { allowFutureImage: true } },
};
