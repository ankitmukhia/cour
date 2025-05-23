'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { CourseWithSection } from '@/types'
import { toast } from 'sonner'
import Image from 'next/image'
import clsx from 'clsx'

export const Course = ({ course, enrollment }: { course: CourseWithSection, enrollment: boolean }) => {
	const [enrollingState, setEnrollingState] = useState<boolean>(false)
	const [expand, setExpand] = useState<number | null>(null)
	const [error, setError] = useState("")
	const router = useRouter()

	const handleEnrollment = async () => {
		setEnrollingState(true)
		try {
			const res = await fetch('/api/enrollments', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ courseId: course.id }),
			})

			if (!res.ok) {
				const data = await res.json()
				throw new Error(data.error ?? "fail to enroll in course")
			}

			router.push('/dashboard')
			router.refresh()
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong!")
		} finally {
			setEnrollingState(false)
		}
	}

	useEffect(() => {
		if (error) {
			toast(`${error}`)
		}
	}, [error])

	const handleExpand = (index: number) => {
		setExpand(expand === index ? null : index)
	}

	return (
		<Container>
			<div className="mt-6 space-y-4">
				<div onClick={() => router.back()} className="group inline-block p-1 rounded-full bg-orange-500 cursor-pointer hover:bg-orange-500/80">
					<ArrowLeftIcon className="h-4 w-4 transform transaction-all duration-100 ease-in-out group-hover:scale-110" />
				</div>

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

					{enrollment ? (
						<button onClick={() => router.push('/dashboard')} className="bg-orange-500 px-6 py-3">
							Dashboard
						</button>
					) : (
						<button onClick={handleEnrollment} className="bg-orange-500 px-6 py-3">
							{enrollingState ? "Wait Enrolling..." : "Enroll for Free"}
						</button>
					)}
					{/* @ts-ignore */}
					<p className="text-xs">{course?.enrollmentCount <= 0 ? "No Enrollments yet." : `${course?.enrollmentCount} already enrolled.`} </p>
				</div>

				<div className="p-2">
					<h1 className="text-2xl text-orange-500">Content Preview</h1>

					<div className="mt-4 space-y-4">
						{course.sections.map((section, _idx) => (
							<div key={section.id} className={clsx(`py-3 border-b border-zinc-500/20`, {
								"border-none": _idx === course.sections.length - 1
							})}>
								<div className="flex items-center justify-between">
									<h1>{section.title}</h1>

									<button onClick={() => handleExpand(_idx)}>
										{expand === _idx ? (
											<ChevronUpIcon className="h-4 w-4" />
										) : (
											<ChevronDownIcon className="h-4 w-4" />
										)}
									</button>

								</div>

								{expand === _idx && (
									<div className="mt-4 space-y-2 px-1 text-sm">
										{section.lessons.map((lesson, _idx) => (
											<div key={lesson.id} className="flex items-center space-x-2 relative">
												{_idx !== 0 && (
													<div className="absolute left-[3px] top-[-20px] h-8 w-[2px] bg-orange-400" />
												)}
												<div className="bg-orange-400 h-2 w-2 rounded-full" />
												<div>
													<h1>{lesson.title}</h1>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	)
}
