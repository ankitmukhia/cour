'use client'

import { NewLesson } from '@/drizzle/schema'
import NextVideo from 'next-video'

// figure how to sync the dynamically coming video to mux.
// truns out I can sync it while uploading to db.

export const VideoPlayer = (lesson: NewLesson) => {
	const isYoutubeUrl = (url: string) => {
		const regex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
		return regex.test(url);
	};

	if (isYoutubeUrl(lesson.videoUrl!)) {
		return (
			<div className="w-full aspect-video">
				<iframe
					className="w-full h-full"
					src={lesson.videoUrl!}
					title="YouTube Video Player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		)
	}

	return (
		<div className="w-full aspect-video">
			<NextVideo src={lesson.videoUrl!} />
		</div>
	)
}
