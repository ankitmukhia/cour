import { users, NewUser, courses, NewCourse, NewSection } from '@/drizzle/schema';
import { db } from '@/drizzle/db';
import { CourseBatch, SectionBatch } from '@/lib/constants'
import bcrypt from 'bcrypt'

export const insertUser = async (user: NewUser) => {
	return db.insert(users).values(user).returning()
}

export const insertCours = async (course: NewCourse[]) => {
	return db.insert(courses).values(course).returning()
}

export const insertSection = async (section: NewSection[]) => {
	return db.insert(courses).values(section).onConflictDoUpdate({ target: courses.id, set: {} })
}

async function main() {
	const newUser: NewUser = {
		name: 'user',
		email: 'user@gmail.com',
		password: await bcrypt.hash('user123', 10),
		role: 'user',
	}

	const user = await insertUser(newUser)
	console.log('Successfully seeded users table: ', user)

	const newInstructor: NewUser = {
		name: 'instructor',
		email: 'instructor@gmail.com',
		password: await bcrypt.hash('instructor123', 10),
		role: 'instructor',
	}

	const instructor = await insertUser(newInstructor)
	console.log('Successfully seeded instructors table: ', instructor)

	const newAdmin: NewUser = {
		name: 'admin',
		email: 'admin@gmail.com',
		password: await bcrypt.hash('admin123', 10),
		role: 'admin',
	}

	const admin = await insertUser(newAdmin)
	console.log('Successfully seeded admin table: ', admin)

	const course = await insertCours(CourseBatch(instructor))
	console.log('Successfully seeded courses table: ', course)


	// need to pass specific cours id to SectionBatch ot correctly update the exect section of the course
	// const section = await insertSection(SectionBatch())

	process.exit()
}

main()
