import { z } from 'zod'

export const SignupSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
})

export const LoginSchema = z.object({
	email: z.string().email().nonempty(),
	password: z.string().nonempty(),
})

export const CreateNewCourseSchema = z.object({
	courseTitle: z.string().nonempty(),
	courseDescription: z.string().nonempty(),
	coursePrice: z.number(),
	courseImageUrl: z.instanceof(File)
		.refine((file) => ["image/png", "image/jpeg"].includes(file.type), "Only PNG and JPEG files are allowed")
		.refine((file) => file.size < 1 * 1024 * 1024, "File must be less then 1MB"),
	sectionTitle: z.string().nonempty(),
	lessonTitle: z.string().nonempty(),
	lessonContent: z.string().nonempty(),
	videoUrl: z.string().nonempty(),
})

export const CreateSectionOnExistingCourseSchema = z.object({

})

export const CreateLessonOnExistingSectionSchema = z.object({

})
