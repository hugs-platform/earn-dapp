/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
		NEXT_PUBLIC_SCAN_URL: process.env.NEXT_PUBLIC_SCAN_URL,
		NEXT_PUBLIC_WALLET_PRIVATE_KEY: process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY,
	},
  reactStrictMode: true,
  images: {
    domains: [
      'dev-earn-markets-assets.s3.eu-central-1.amazonaws.com', 
      'stage-earn-markets-assets.s3.eu-central-1.amazonaws.com'
    ]
  },
}

module.exports = nextConfig
