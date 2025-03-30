'use client'

import { Section } from '@/lib/constants'
import { VideoCameraIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export const Learn = ({ course }: { course: Section[] }) => {
	const [expandSession, setExpandSession] = useState<number | null>(0)

	const handleExpandSession = (index: number) => {
		setExpandSession(expandSession === index ? null : index)
	}

	return (
		<div className="flex gap-4">
			<div className="w-2xs max-w-md space-y-4">
				{course.map((course, _idx) => (
					<div key={course.id} className="flex flex-col">
						<div onClick={() => handleExpandSession(_idx)} className="text-xl w-fit">
							<span className="hover:bg-zinc-200/10 cursor-pointer">
								{course.title}
							</span>
						</div>

						{expandSession === _idx && (
							<div className="flex flex-col py-3 px-2 gap-4">
								{course.lessons.map((lesson) => (
									<div key={lesson.id} className="flex items-center gap-2">
										<div>
											<VideoCameraIcon className="h-4 w-4 text-orange-500" />
										</div>
										<span>{lesson.title}</span>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>

			<div className="w-full aspect-video">
				<iframe
					className="w-full h-full"
					src="https://www.youtube.com/embed/ksnuY0Ey_Hk"
					title="YouTube Video Player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	)
}
