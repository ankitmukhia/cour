import { courses, enrollments, section, lesson } from '@/drizzle/schema'
import { verifySession } from '@/app/(register)/session/session'
import { CourseWithSection } from '@/types'
import { eq, and, count, sql } from 'drizzle-orm'
import { db } from '@/drizzle/db'
import { notFound } from 'next/navigation'
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

	if (!session) (
		notFound()
	)

	/* groupBy groups all the realted table like enro... and sect... into one row */
	const course = await db.select({
		id: courses.id,
		title: courses.title,
		description: courses.description,
		price: courses.price,
		imageUrl: courses.imageUrl,
		published: courses.published,
		createdAt: courses.createdAt,
		enrollmentCount: count(enrollments.id).as("enrollmentCount"),
		sections: sql`json_agg(
      json_build_object(
        'id', ${section.id},
        'title', ${section.title},
        'createdAt', ${section.createdAt},
				'lessons', (
					SELECT json_agg(
						json_build_object(
              'id', ${lesson.id},
              'title', ${lesson.title},
              'content', ${lesson.content},
              'videoUrl', ${lesson.videoUrl},
              'order', ${lesson.order}
            )	
					) FROM ${lesson} WHERE ${lesson.sectionId} = ${section.id}
				)
      )
    )`.as('sections'),
	}).from(courses)
		.where(eq(courses.id, courseId))
		.leftJoin(enrollments, eq(enrollments.courseId, courses.id))
		.leftJoin(section, eq(section.courseId, courses.id))
		.groupBy(courses.id, section.id)
		.then(rows => rows[0]) as CourseWithSection
		console.log("course dddd: ", course)

	/* 
	 We can do this as well sort and readable.

	 const result = await db.query.courses.findFirst({
		where: (courses, { eq }) => eq(courses.id, courseId), 
		with: {
			sections: {
				with: {
					lessons: true,
				},
			},
		},
	}); */

	// check enrollment
	const enrollment = await checkEnrollment(session?.userId, courseId)

	return <Course enrollment={enrollment} course={course} />
}
