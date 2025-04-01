'use server'

import { LoginSchema } from '@/lib/definitions'
import { createSession } from '../session/session'
import { } from '../session/session'
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

	const verifyUser = await db.query.users.findFirst({
		where: eq(users.email, email)
	})

	if (!verifyUser) {
		return errorMessage
	}

	const comparePassword = await bcrypt.compare(
		password,
		verifyUser.password
	)

	if(!comparePassword) {
		return errorMessage
	}

	const user = {
		userId: verifyUser.id.toString(),
		role: verifyUser.role
	}

	await createSession(user)
}
