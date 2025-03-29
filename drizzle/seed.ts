import { users, NewUser, courses, NewCourse, section as sections, NewSection, lesson as lessons, NewLesson } from '@/drizzle/schema';
import { CourseBatch, SectionBatch, LessonBatch } from '@/lib/constants'
import { db } from '@/drizzle/db';
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export const GuestBatch: NewUser[] = [
	{
		id: uuid(),
		name: 'user',
		email: 'user@gmail.com',
		password: await bcrypt.hash('user123', 10),
		role: 'user',
	},
	{
		id: uuid(),
		name: 'instructor',
		email: 'instructor@gmail.com',
		password: await bcrypt.hash('instructor123', 10),
		role: 'instructor',
	},
	{
		id: uuid(),
		name: 'admin',
		email: 'admin@gmail.com',
		password: await bcrypt.hash('admin123', 10),
		role: 'admin',
	}
]

export const insertUser = async (user: NewUser[]) => {
	return db.insert(users).values(user).returning()
}

export const insertCours = async (course: NewCourse[]) => {
	return db.insert(courses).values(course).returning()
}

export const insertSection = async (section: NewSection[]) => {
	return db.insert(sections).values(section).returning()
}

export const insertLesson = async (lesson: NewLesson[]) => {
	return db.insert(lessons).values(lesson).returning()
}

async function main() {

	const guest = await insertUser(GuestBatch)
	console.log('Successfully seeded Guest creds: ', guest)

	const course = await insertCours(CourseBatch(guest[1]))
	console.log('Successfully seeded courses table: ', course)

	// need to pass specific cours id to SectionBatch ot correctly update the exect section of the course
	const section = await insertSection(SectionBatch(course[0]))
	console.log('Successfully seeded courses section: ', section)

	const lesson = await insertLesson(LessonBatch(section))
	console.log('Successfully seed courses lesson: ', lesson)

	process.exit()
}

main()
