import { users, NewUser, courses, NewCourse, NewSection } from '@/drizzle/schema';
import { db } from '@/drizzle/db';
import { CourseBatch, SectionBatch, GuestBatch } from '@/lib/constants'
import bcrypt from 'bcrypt'

export const insertUser = async (user: NewUser[]) => {
	return db.insert(users).values(user).returning()
}

export const insertCours = async (course: NewCourse[]) => {
	return db.insert(courses).values(course).returning()
}

export const insertSection = async (section: NewSection[]) => {
	return db.insert(courses).values(section).onConflictDoUpdate({ target: courses.id, set: {} })
}

async function main() {

	const guest = await insertUser(GuestBatch)
	console.log('Successfully seeded Guest creds: ', guest)

	const course = await insertCours(CourseBatch(guest[1]))
	console.log('Successfully seeded courses table: ', course)

	// need to pass specific cours id to SectionBatch ot correctly update the exect section of the course
	// const section = await insertSection(SectionBatch())

	process.exit()
}

main()
