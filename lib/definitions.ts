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
