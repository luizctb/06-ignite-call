/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['gage.tsx', 'api.ts', 'api.tsx'],
}

module.exports = nextConfig
