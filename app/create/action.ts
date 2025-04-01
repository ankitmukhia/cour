'use server'

import { CreateCourseSchema } from '@/lib/definitions'

export async function create(state: any, formData: FormData) {
	// zod validation
	const { success, data, error } = CreateCourseSchema.safeParse({
		courseTitle: formData.get("courseTitle"),
		courseDescription: formData.get("courseDescription"),
		coursePrice: formData.get("coursePrice"),
		courseImageUrl: formData.get("courseImageUrl"),
		sectionTitle: formData.get("sectionTitle"),
		lessonTitle: formData.get("lessonTitle"),
		lessonContent: formData.get("lessonContent"),
		videoUrl: formData.get("videoUrl"),
	});

	console.log("form data: ", data)
	console.log("form error: ", error)
	console.log("form success: ", success)
}
