import { db } from '@/drizzle/db';
import { users, NewUser, courses, NewCourse } from '@/drizzle/schema';
import bcrypt from 'bcrypt'

export const insertUser = async (user: NewUser) => {
	return db.insert(users).values(user).returning()
}

export const insertCours = async (course: NewCourse[]) => {
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

	const courses: NewCourse[] = [
		{
			title: "Mastering React",
			description: "Deep dive into React, including hooks, state management, and performance optimization.",
			price: 79.99,
			imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
			published: true,
			instructorId: instructor[0].id
		},
		{
			title: "Full-Stack JavaScript",
			description: "Learn how to build full-stack applications using Node.js, Express, and MongoDB.",
			price: 99.99,
			imageUrl: "https://images.unsplash.com/photo-1526374870839-e155464bb9df",
			published: true,
			instructorId: instructor[0].id
		},
		{
			title: "Advanced TypeScript",
			description: "Master TypeScript with advanced types, generics, and best practices for scalable applications.",
			price: 59.99,
			imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
			published: false,
			instructorId: instructor[0].id
		},
		{
			title: "UI/UX Design Fundamentals",
			description: "Understand the principles of great design and how to create user-friendly interfaces.",
			price: 39.99,
			imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
			published: true,
			instructorId: instructor[0].id
		},
		{
			title: "Next.js for Beginners",
			description: "Learn how to build fast and scalable web applications using Next.js.",
			price: 69.99,
			imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
			published: true,
			instructorId: instructor[0].id
		},
		{
			title: "Database Design & Optimization",
			description: "Gain expertise in designing efficient databases using SQL and NoSQL technologies.",
			price: 89.99,
			imageUrl: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
			published: false,
			instructorId: instructor[0].id
		}
	];

	const course = await insertCours(courses)
	console.log('Successfully seeded courses table: ', course)

	process.exit()
}

main()
