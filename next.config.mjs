/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./src/config/i18n/request.ts')

const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: '192.168.0.100',
  //       port: '3000'
  //     }
  //   ]
  // }
}

export default withNextIntl(nextConfig)
