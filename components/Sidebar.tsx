'use client'

import { useState } from 'react'
import { SectionWithLesson } from '@/types'
import { VideoCameraIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export const Sidebar = ({ courseId, sections }: { courseId: string; sections: SectionWithLesson[]; }) => {
	const [expandSession, setExpandSession] = useState<number | null>(0)

	const handleExpandSession = (index: number) => {
		setExpandSession(expandSession === index ? null : index)
	}
	return (
		<div className="w-2xs max-w-md space-y-4">
			{sections.map((section, _idx) => (
				<div key={section.id} className="flex flex-col">
					<div onClick={() => handleExpandSession(_idx)} className="text-xl w-fit">
						<span className="hover:bg-zinc-200/10 cursor-pointer">
							{section.title}
						</span>
					</div>

					{expandSession === _idx && (
						<div className="flex flex-col py-3 px-2 gap-4">
							{section.lessons.map((lesson) => (
								<Link href={`/learn/${courseId}/${lesson.id}`} key={lesson.id} className="flex items-center gap-2">
									<div>
										<VideoCameraIcon className="h-4 w-4 text-orange-500" />
									</div>
									<span>{lesson.title}</span>
								</Link>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	)
}
