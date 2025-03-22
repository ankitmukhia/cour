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
	/* if ((await verifySession())?.isAuth) {
		redirect('/dashboard')
	} */
	const session = await verifySession()
	if (session?.isAuth) {
		redirect('/dashboard')
	}

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
		}).from(courses)
		.where(eq(courses.published, true))
		.leftJoin(users, eq(courses.instructorId, users.id))
		.leftJoin(enrollments, eq(courses.enrollmentsId, enrollments.id))
		.limit(6) as NewCourse

	console.log("all courses: ", allCourses)

	return (
		<>
			<div className="flex items-center justify-between">
				<Logo className="text-[2.5rem]" />
				<div className="flex items-center gap-4">
					<Link href="/signup">
						<HoverButton>
							Register
						</HoverButton>
					</Link>
				</div>
			</div>

			{/* hero */}
			<div className="mt-6">
				<div className="md:text-center">
					<h1 className="text-6xl uppercase">
						Grow with Cour, bit by bit.
					</h1>

					<div className="mt-10">
						<Link href="/signup">
							<HoverButton>
								Register for free
							</HoverButton>
						</Link>
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
		</>
	)
}

