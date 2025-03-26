import { courses, NewCourse, enrollments } from '@/drizzle/schema'
import { verifySession } from '@/app/(register)/session/session'
import { eq, and, count } from 'drizzle-orm'
import { db } from '@/drizzle/db'
import { Course } from './Course'

interface Props {
	params: Promise<{ courseId: string }>
}

const checkEnrollment = async (userId: string, courseId: string): Promise<boolean> => {
	const enrollment = await db.select().from(enrollments).where(
		and(
			eq(enrollments.userId, userId),
			eq(enrollments.courseId, courseId)
		)
	).then(res => res.length > 0)

	return enrollment
}

export default async function CoursePage({ params }: Props) {
	const courseId = (await params).courseId;
	const session = await verifySession()

	if(!session) return

	const course = await db.select({
		id: courses.id,
		title: courses.title,
		description: courses.description,
		price: courses.price,
		imageUrl: courses.imageUrl,
		published: courses.published,
		createdAt: courses.createdAt,
		enrollmentCount: count(enrollments.id).as("enrollmentCount"),
	}).from(courses)
		.where(eq(courses.id, courseId))
		.leftJoin(enrollments, eq(enrollments.courseId, courses.id))
		.groupBy(courses.id, enrollments.userId)
		.then(rows => rows[0]) as NewCourse

	// check enrollment
	const enrollment = await checkEnrollment(session.userId, courseId)

	return <Course enrollment={enrollment} course={course} />
}
