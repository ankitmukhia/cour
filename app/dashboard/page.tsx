import { verifySession } from '@/app/(register)/session/session'
import { Container } from '@/components/ui/container'
import { Appbar } from '@/components/Appbar'
import { redirect } from 'next/navigation'
import { courses, enrollments } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { eq, desc } from 'drizzle-orm'
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
		})
		.from(enrollments)
		.innerJoin(courses, eq(enrollments.courseId, courses.id)) // Join enrollments with courses
		.where(eq(enrollments.userId, session.userId)) // Filter by user ID
		.orderBy(desc(courses.createdAt)); // Optional: Order by newest courses first

	console.log(enrolledCourses)

	return (
		<Container className="mt-6">
			<Appbar />

			<div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
				{enrolledCourses.map(course => (
					<Link href={`/learn/${course.id}`} key={course.id} className="border border-zinc-100/10 p-2 space-y-2 rounded-xl hover-animation hover:shadow-orange-400 hover:shadow-sm">
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
		</Container>
	)
}
