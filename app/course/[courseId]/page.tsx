import { courses, NewCourse, enrollments } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { eq, count } from 'drizzle-orm'
import { Course } from './Course'

interface Props {
	params: Promise<{ courseId: string }>
}

export default async function CoursePage({ params }: Props) {
	const courseId = (await params).courseId;
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

	return <Course {...course} />
}
