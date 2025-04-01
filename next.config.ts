import type { NextConfig } from "next";
import { withNextVideo } from 'next-video/process'

const nextConfig: NextConfig = {
	images:{
		remotePatterns: [
			{
				protocol: 'https',
        hostname: 'images.unsplash.com',
			}
		]
	} 
};

export default withNextVideo(nextConfig);
