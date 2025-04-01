import { verifySession } from '@/app/(register)/session/session'
import { CourseWithSection } from '@/types'
import { Container } from '@/components/ui/container'
import { Appbar } from '@/components/Appbar'
import { redirect } from 'next/navigation'
import { courses, enrollments, lesson, section } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { eq, desc, sql } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'

export default async function DashboardPage() {
	const session = await verifySession();

	if (!session?.isAuth) {
		redirect("/")
	}

	const enrolledCourses = await db
		.select({
			id: courses.id,
			title: courses.title,
			description: courses.description,
			price: courses.price,
			imageUrl: courses.imageUrl,
			published: courses.published,
			createdAt: courses.createdAt,
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
		})
		.from(enrollments)
		.innerJoin(courses, eq(enrollments.courseId, courses.id)) // Join enrollments with courses
		.innerJoin(section, eq(section.courseId, courses.id))
		.groupBy(courses.id)
		.where(eq(enrollments.userId, session.userId))
		.orderBy(desc(courses.createdAt)) as CourseWithSection[] // Optional: Order by newest courses first

	return (
		<Container className="mt-6">
			<Appbar role={session.role} />

			{session.role === "user" && (
				<div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
					{enrolledCourses.map(course => (
						<Link
							key={course.id}
							href={`/learn/${course.id}/${course.sections[0].lessons[0].id}`}
							className="border border-zinc-100/10 p-2 space-y-2 rounded-xl hover-animation hover:shadow-orange-400 hover:shadow-sm"
						>
							<div className="relative w-full h-40">
								<Image
									src={course.imageUrl ?? ""}
									alt="image"
									fill
									className="object-cover rounded-md"
								/>
							</div>
							<h1 className="text-xl">{course.title}</h1>
							<h1 className="text-zinc-200/60">{course.description}</h1>
						</Link>
					))}
				</div>
			)}

			{session.role === "instructor" && (
				<div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
					All instructor course.
				</div>
			)}
		</Container>
	)
}
