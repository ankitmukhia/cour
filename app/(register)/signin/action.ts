'use server'

import { LoginSchema } from '@/lib/definitions'
import { createSession } from '../session/session'
import {} from '../session/session'
import { db } from '@/drizzle/db'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export async function signin(state: any, formData: FormData) {
	const { success, error, data } = LoginSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	})

	const errorMessage = { message: "Invalid login credentials." }

	if (!success) {
		return {
			errors: error.flatten().fieldErrors,
		}
	}

	const { email, password } = data;

	const user = await db.query.users.findFirst({
		where: eq(users.email, email)
	})

	if (!user) {
		return errorMessage 
	}

	const comparePassword = await bcrypt.compare(
		password,
		user.password
	) 

	if(!comparePassword) {
		return errorMessage 
	}

	const userId = user.id.toString()

	await createSession(userId)
}
