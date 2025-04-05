'use client'

import { useRef, useActionState, useState } from 'react'
import { DropdownMenu, DropdownTrigger, DropdownContent } from '@/components/ui/dropdown'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { create } from './action'
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// here zod test are not passing, work on that next. then also impl.. where instructor can choose the existing course, and create section, based on that, and same with section, instructor can choose which section and create lesson on that.
// 1. zod validation is fixed.
// 2.	 
const Label = ({ children }: { children: React.ReactNode }) => (
	<label className="text-lg text-orange-500">
		{children}
	</label>
)

export default function CreatePage() {
	const router = useRouter()
	const [isCourseOpen, setIsCourseOpen] = useState<boolean>(false)
	const [isSectionOpen, setIsSectionOpen] = useState<boolean>(false)
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [image, setImage] = useState<string>("")
	const [state, action] = useActionState(create, undefined)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const url = URL.createObjectURL(file)
			setImage(url)
		}
	}
	return (
		<Container className="mt-6">
			<div onClick={() => router.back()} className="group inline-block p-1 rounded-full bg-orange-500 cursor-pointer hover:bg-orange-500/80">
				<ArrowLeftIcon className="h-4 w-4 transform transaction-all duration-100 ease-in-out group-hover:scale-110" />
			</div>

			<form action={action} className="space-y-2">
				<div className="flex items-center justify-between">
					<Label>
						Create Course
					</Label>
					<DropdownMenu>
						<DropdownTrigger onClick={() => setIsCourseOpen(!isCourseOpen)} className="hover:bg-zinc-400/20 inline-block">
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 bg-orange-500 rounded-full" />
								Choose existing Course
							</div>
						</DropdownTrigger>
						<DropdownContent isOpen={isCourseOpen}>
							<div>Section 1</div>
							<div>Section 2</div>
							<div>Section 3</div>
							<div>Section 4</div>
						</DropdownContent>
					</DropdownMenu>
				</div>
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
						<span className="text-xs text-gray-500">PNG, JPEG</span>

						<Input
							type="file"
							name="courseImageUrl"
							ref={fileInputRef}
							className="hidden"
							onChange={handleFileChange}
						/>
					</div>
					{image != "" && (
						<>
							<Label>
								Image Preview
							</Label>
							<div className="relative w-30 h-30 border border-zinc-300/20 w-full rounded-md">
								<Image src={image} alt="image/" fill className="object-contain p-4" />
							</div>
						</>
					)}
				</div>

				<div className="flex items-center justify-between">
					<Label>
						Create Course Section
					</Label>
					<DropdownMenu>
						<DropdownTrigger onClick={() => setIsSectionOpen(!isSectionOpen)} className="hover:bg-zinc-400/20 inline-block">
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 bg-orange-500 rounded-full" />
								Choose existing Section
							</div>
						</DropdownTrigger>
						<DropdownContent isOpen={isSectionOpen}>
							<div>Section 1</div>
							<div>Section 2</div>
							<div>Section 3</div>
							<div>Section 4</div>
						</DropdownContent>
					</DropdownMenu>
				</div>

				<div className="flex mt-2 flex-col gap-2">
					<Input name="sectionTitle" placeholder="Section title" />
				</div>

				<Label>
					Create Section Lesson
				</Label>
				<div className="flex mt-2 flex-col gap-2">
					<Input name="lessonTitle" placeholder="Lesson title" />
					<Input name="lessonContent" placeholder="Lesson content" />
					{/* here giver user instruction, only past embaded url if it is Youtube URL */}
					<Input name="videoUrl" placeholder="pass remote/hosted video url" />
				</div>

				<Button type="submit" className="mt-4 shadow-3xl">
					Create
				</Button>
			</form>
		</Container>
	)
}
