/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'ipfs.io', 'gateway.pinata.cloud']
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar'
  }
}

module.exports = nextConfig
