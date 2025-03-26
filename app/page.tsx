import { Logo } from '@/components/ui/logo'
import { HoverButton, Slider } from '@/components/ui/hover-button'
import { verifySession } from '@/app/(register)/session/session'
import { WorkingStep } from '@/lib/constants'
import { WorkingStepType } from '@/types/index'
import { db } from '@/drizzle/db'
import { courses, users, enrollments, NewCourse } from '@/drizzle/schema'
import { eq, count } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
	const session = await verifySession()

	const allCourses = await db
		.select({
			id: courses.id,
			title: courses.title,
			description: courses.description,
			price: courses.price,
			imageUrl: courses.imageUrl,
			published: courses.published,
			createdAt: courses.createdAt,
			instructor: {
				name: users.name
			},
			enrollmentCount: count(enrollments.id).as("enrollmentCount"), // Count enrollments
		}).from(courses)
		.where(eq(courses.published, true))
		.leftJoin(users, eq(courses.instructorId, users.id))
		.leftJoin(enrollments, eq(enrollments.courseId, courses.id))
		.groupBy(courses.id, users.name)
		.limit(6) as NewCourse[]

	return (
		<>
			<div className="flex items-center justify-between">
				<Logo className="text-[2.5rem]" />
				<div className="flex items-center gap-4">
					{session?.isAuth ? (
						<Link href="/dashboard">
							<HoverButton>
								Dashboard
							</HoverButton>
						</Link>
					) : (
						<Link href="/signup">
							<HoverButton>
								Register
							</HoverButton>
						</Link>
					)}
				</div>
			</div>

			{/* hero */}
			<div className="mt-6">
				<div className="md:text-center">
					<h1 className="text-6xl uppercase">
						Grow with Cour, bit by bit.
					</h1>

					<div className="mt-10">
						{session?.isAuth ? (
							<Link href="/dashboard">
								<HoverButton>
									Go to Dashboard
								</HoverButton>
							</Link>
						) : (
							<Link href="/signup">
								<HoverButton>
									Register for free
								</HoverButton>
							</Link>
						)}
					</div>

				</div>
				<div className="relative flex justify-center">
					<Image src="/comp.svg" alt="comp" width={500} height={500} className="" />
				</div>
			</div>

			<div className="mt-10">
				<div className="text-center pb-10">
					<h2 className="text-6xl">How it works.</h2>
					<p className="text-lg">Get started with Cour in 3 easy steps</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{WorkingStep.map((step: WorkingStepType) => (
						<div key={step.id} className="relative group overflow-hidden text-center bg-orange-500 border border-orange-300/40 rounded-2xl px-4 py-2 outline-8 outline-white/8">
							{step.icon}
							<h2 className="text-3xl">{step.name}</h2>
							<p className="mt-4">{step.description}</p>
							<Slider />
						</div>
					))}
				</div>
			</div>

			<div className="mt-10">
				<div className="text-center pb-10">
					<h2 className="text-6xl">All courses</h2>
					<p className="text-lg">Enroll in course and start upgrading your skills.</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{allCourses.map((course) => (
						<Link href={`/course/${course.id}`} key={course.id} className="border border-zinc-100/10 p-2 space-y-2 rounded-xl hover-animation hover:shadow-orange-400 hover:shadow-sm">
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
			</div>
		</>
	)
}
