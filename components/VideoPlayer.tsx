'use client'

import { NewLesson } from '@/drizzle/schema'

export const VideoPlayer = (videoUrl: NewLesson) => {

	const isYoutubeUrl = (url: string) => {
		// check wit regex
	}

	return (
		<div className="w-full aspect-video">
			<iframe
				className="w-full h-full"
				src="https://www.youtube.com/embed/ksnuY0Ey_Hk"
				title="YouTube Video Player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	)
}
