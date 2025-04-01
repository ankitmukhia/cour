'use server'

import { SignupSchema } from '@/lib/definitions'
import { users } from '@/drizzle/schema'
import { createSession, deleteSession } from '../session/session'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { db } from '@/drizzle/db'

enum Props {
	user,
	instructor,
	admin
}

export async function signup(state: any, formData: FormData) {
	// 1. Validate fields
	const { success, error, data } = SignupSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	})

	if (!success) {
		return {
			errors: error.flatten().fieldErrors,
		}
	}

	const { name, email, password } = data;

	// 1. Check if your user already exists
	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email)
	})

	if (existingUser) {
		return {
			error: true,
			message: "Email already exists, please use a different email or login.",
		}
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	//2. Create user
	const createUser = await db.insert(users).values({
		name,
		email,
		password: hashedPassword
	}).returning({ id: users.id, role: users.role })
		.then(user => user[0])

	if (!createUser) {
		return {
			message: "An error while creating your account."
		}
	}

	const user = {
		userId: createUser.id.toString(),
		role: createUser.role
	}

	await createSession(user)
}

export async function logout() {
	await deleteSession()
}
