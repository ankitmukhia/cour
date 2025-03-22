'use client'

import Image from 'next/image'
import { NewCourse } from '@/drizzle/schema'

export const Course = (course: NewCourse) => {
	return (
		<div className="mt-6">
			<div className="relative w-full aspect-[16/9] overflow-hidden w-full h-60">
				<Image
					src={course.imageUrl ?? ""}
					alt="hero-img"
					width={1200}
					height={800}
					className="object-cover w-full h-full"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
			</div>

			<div className="w-full p-2 space-y-4">
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{course.title}</h1>
				<p className="text-lg text-muted-foreground max-w-2xl">
					{course.description}
				</p>

				<button className="bg-orange-500 px-6 py-3">
					Enroll for Free
				</button>
				{/* @ts-ignore */}
				<p>{course?.enrollmentCount <= 0 ? "No Enrollments yet." : "already enrolled"} </p>
			</div>
		</div>
	)
}
