import { VideoPlayer } from '@/components/VideoPlayer'
import { lesson, NewLesson } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'

interface Props {
	params: Promise<{ lessonId: string }>
}

export default async function Page({ params }: Props) {
	const lessonId = (await params).lessonId

	const lessonVideo = await db.select({
		id: lesson.id,
		title: lesson.title,
		content: lesson.content,
		videoUrl: lesson.videoUrl,
		order: lesson.order
	}).from(lesson)
		.where(eq(lesson.id, lessonId))
		.then(lesson => lesson[0]) as NewLesson;

	return <VideoPlayer {...lessonVideo} /> 
}
