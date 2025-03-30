import { Learn } from './Learn'
import { CourseSections, Section } from '@/lib/constants'

interface Props {
	params: Promise<{ courseId: string }>
}

export default async function Page({ params }: Props) {
	const courseId = (await params).courseId

	return (
		<div className="container mt-6 space-y-4 max-w-9/10 mx-auto">
			<Learn course={CourseSections} />	
		</div>
	)
}
