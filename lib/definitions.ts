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

export const CreateCourseSchema = z.object({
	courseTitle: z.string().nonempty(),
	courseDescription: z.string().nonempty(),
	coursePrice: z.number(),
	courseImageUrl: z.string().nonempty(),
	sectionTitle: z.string().nonempty(),
	lessonTitle: z.string().nonempty(),
	lessonContent: z.string().nonempty(),
	videoUrl: z.string().nonempty(),
})
