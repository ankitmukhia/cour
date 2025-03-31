import { db } from '@/drizzle/db'
import { courses, section, lesson } from '@/drizzle/schema'
import { Sidebar } from '@/components/Sidebar'
import { CourseWithSection } from '@/types'
import { eq, sql } from 'drizzle-orm'

interface Props {
	params: Promise<{ courseId: string }>;
	children: React.ReactNode
}

export default async function LearnLayout({ params, children }: Props) {
	const courseId = (await params).courseId

	const course = await db.select({
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
		.from(courses)
		.where(eq(courses.id, courseId))
		.groupBy(courses.id)
		.leftJoin(section, eq(section.courseId, courseId))
		.then(rows => rows[0]) as CourseWithSection

	return (
		<div className="container mt-6 space-y-4 max-w-9/10 mx-auto">
			<div className="flex gap-4">
				<Sidebar courseId={courseId} sections={course.sections} />

				{children}
			</div>
		</div>
	)
}
