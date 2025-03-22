import { db } from '@/drizzle/db';
import { users, NewUser, courses, NewCourse } from '@/drizzle/schema';
import bcrypt from 'bcrypt'

export const insertUser = async (user: NewUser) => {
	return db.insert(users).values(user).returning()
}

export const insertCours = async (course: NewCourse) => {
	return db.insert(courses).values(course).returning()
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

	const newCourse: NewCourse = {
		title: "Introduction to Web Development",
		description: "Learn the basics of HTML, CSS, and JavaScript to build modern web applications.",
		price: 49.99,
		imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
		published: true,
		instructorId: instructor[0].id
	}

	const course = await insertCours(newCourse)
	console.log('Successfully seeded courses table: ', course)

	process.exit()
}

main()
