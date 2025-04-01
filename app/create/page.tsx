'use client'

import { useRef, useActionState } from 'react'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { create } from './action'

const Label = ({ children }: { children: React.ReactNode }) => (
	<label className="text-lg text-orange-500">
		{children}
	</label>
)

export default function CreatePage() {
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	// here zod test are not passing, work on that next. then also impl.. where instructor can choose the existing course, and create section, based on that, and same with section, instructor can choose which section and create lesson on that.
	const [state, action] = useActionState(create, undefined)

	return (
		<Container className="mt-6">
			<form action={action} className="space-y-4">
				<Label>
					Create Course
				</Label>
				<div className="flex mt-2 flex-col gap-2">
					<Input name="courseTitle" placeholder="Course title" />
					<Input name="courseDescription" placeholder="Course description" />
					<Input type="number" name="coursePrice" placeholder="Course price" />
					<div
						className="border-2 border-dashed hover:border-orange-500 border-zinc-300/30 rounded-lg flex flex-col gap-1 p-6 items-center cursor-pointer"
						onClick={() => fileInputRef.current?.click()}
					>
						<DocumentIcon className="w-12 h-12" />
						<span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
						<span className="text-xs text-gray-500">PDF, image, video, or audio</span>

						<input type="file" name="courseImageUrl" ref={fileInputRef} className="hidden" />
					</div>
				</div>

				<Label>
					Create Course Section
				</Label>
				<div className="flex mt-2 flex-col gap-2">
					<Input name="sectionTitle" placeholder="Section title" />
				</div>

				<Label>
					Create Section Lesson
				</Label>
				<div className="flex mt-2 flex-col gap-2">
					<Input name="lessonTitle" placeholder="Lesson title" />
					<Input name="lessonContent" placeholder="Lesson content" />
					<Input name="videoUrl" placeholder="Video URL" />
				</div>

				<Button className="mt-4 shadow-3xl">
					Create
				</Button>
			</form>
		</Container>
	)
}
