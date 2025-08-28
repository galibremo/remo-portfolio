import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		domains: [],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/**',
			},
			{
				protocol: 'https',
				hostname: 'supabase.com',
				port: '',
				pathname: '/storage/v1/object/public/**',
			}
		],
	}
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

