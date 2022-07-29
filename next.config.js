/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		loader: "default",
		domains: ["localhost"],
	},
	swcMinify: true,
};

module.exports = nextConfig;
