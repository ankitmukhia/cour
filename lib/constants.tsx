import { WorkingStepType, GuestCredentialsTypes } from '@/types/index'
import { CursorClickIcon } from '@/components/ui/cursorclick-icon'
import { PartyPopperIcon } from '@/components/ui/partypopper-icon'
import { WorkflowIcon } from '@/components/ui/workflow-icon'
import { NewCourse, NewUser, NewSection } from '@/drizzle/schema'

export const WorkingStep: WorkingStepType[] = [
	{
		id: 1,
		icon: <WorkflowIcon />,
		name: "Seamless Registration",
		description: "Sign up effortlessly with our intuitive and hassle-free registration process.",
	},
	{
		id: 2,
		icon: <CursorClickIcon />,
		name: "Explore & Enroll",
		description: "Browse a diverse range of courses and enroll in the ones that match your learning goals.",
	},
	{
		id: 3,
		icon: <PartyPopperIcon />,
		name: "Start Learning",
		description: "Dive into interactive lessons and hands-on exercises to master new skills with ease.",
	}
];

export const GuestUser: GuestCredentialsTypes[] = [
	{
		id: 1,
		title: "User Guest Register",
		credentials: {
			name: "user",
			email: "user@gmail.com",
			password: "user123"
		}
	},
	{
		id: 2,
		title: "Admin Guest Register",
		credentials: {
			name: "admin",
			email: "admin@gmail.com",
			password: "admin123"
		},
	},
	{
		id: 3,
		title: "Instructor Guest Register",
		credentials: {
			name: "instructor",
			email: "instructor@gmail.com",
			password: "instructor123"
		}
	}
];

export const CourseBatch = (instructor: NewUser[]): NewCourse[] => {
	return [
		{
			id: "clz1234567890",
			title: "Mastering React",
			description: "Deep dive into React, including hooks, state management, and performance optimization.",
			price: 79.99,
			imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
			published: true,
			instructorId: instructor[0].id
		},
		{
			id: "clz2345678901",
			title: "Full-Stack JavaScript",
			description: "Learn how to build full-stack applications using Node.js, Express, and MongoDB.",
			price: 99.99,
			imageUrl: "https://images.unsplash.com/photo-1526374870839-e155464bb9df",
			published: true,
			instructorId: instructor[0].id
		},
		{
			id: "clz3456789012",
			title: "Advanced TypeScript",
			description: "Master TypeScript with advanced types, generics, and best practices for scalable applications.",
			price: 59.99,
			imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
			published: false,
			instructorId: instructor[0].id
		},
		{
			id: "clz4567890123",
			title: "UI/UX Design Fundamentals",
			description: "Understand the principles of great design and how to create user-friendly interfaces.",
			price: 39.99,
			imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
			published: true,
			instructorId: instructor[0].id
		},
		{
			id: "clz5678901234",
			title: "Next.js for Beginners",
			description: "Learn how to build fast and scalable web applications using Next.js.",
			price: 69.99,
			imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
			published: true,
			instructorId: instructor[0].id
		},
		{
			id: "clz6789012345",
			title: "Database Design & Optimization",
			description: "Gain expertise in designing efficient databases using SQL and NoSQL technologies.",
			price: 89.99,
			imageUrl: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
			published: false,
			instructorId: instructor[0].id
		}
	];
}

export const SectionBatch = (): NewSection[] => {
	return [
		{
			id: "cls1234567890",
			title: "Introduction to React and JSX",
			order: 1
		},
		{
			id: "cls1234567891",
			title: "State Management with Hooks",
			order: 2
		},
		{
			id: "cls1234567892",
			title: "Performance Optimization Techniques",
			order: 3
		}
	]
}
