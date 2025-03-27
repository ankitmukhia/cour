import { WorkingStepType, GuestCredentialsTypes } from '@/types/index'
import { CursorClickIcon } from '@/components/ui/cursorclick-icon'
import { PartyPopperIcon } from '@/components/ui/partypopper-icon'
import { WorkflowIcon } from '@/components/ui/workflow-icon'
import { NewCourse, NewUser, NewSection } from '@/drizzle/schema'
import bcrypt from 'bcrypt'

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

export const GuestBatch: NewUser[] = [
	{
		id: "550e8400-e29b-41d4-a716-446655440000",
		name: 'user',
		email: 'user@gmail.com',
		password: await bcrypt.hash('user123', 10),
		role: 'user',
	},
	{
		id: "123e4567-e89b-12d3-a456-426614174000",
		name: 'instructor',
		email: 'instructor@gmail.com',
		password: await bcrypt.hash('instructor123', 10),
		role: 'instructor',
	},
	{
		id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
		name: 'admin',
		email: 'admin@gmail.com',
		password: await bcrypt.hash('admin123', 10),
		role: 'admin',
	}
];

export const CourseBatch = (instructor: NewUser): NewCourse[] => {
	return [
		{
			id: "9f1d7b32-4a14-4d5b-95bb-df3e5f9e1b7c",
			title: "Mastering React",
			description: "Deep dive into React, including hooks, state management, and performance optimization.",
			price: 79.99,
			imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
			published: true,
			instructorId: instructor.id
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			title: "Full-Stack JavaScript",
			description: "Learn how to build full-stack applications using Node.js, Express, and MongoDB.",
			price: 99.99,
			imageUrl: "https://images.unsplash.com/photo-1526374870839-e155464bb9df",
			published: true,
			instructorId: instructor.id
		},
		{
			id: "6d8f3b5a-4e1b-4cd1-92b5-3e2a5a3c5678",
			title: "Advanced TypeScript",
			description: "Master TypeScript with advanced types, generics, and best practices for scalable applications.",
			price: 59.99,
			imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
			published: false,
			instructorId: instructor.id
		},
		{
			id: "d7949f14-2b23-4b2f-8fbd-4d5c2a38b13f",
			title: "UI/UX Design Fundamentals",
			description: "Understand the principles of great design and how to create user-friendly interfaces.",
			price: 39.99,
			imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
			published: true,
			instructorId: instructor.id
		},
		{
			id: "e5f2c4b8-7a61-4c9d-9e43-317e2589cbb9",
			title: "Next.js for Beginners",
			description: "Learn how to build fast and scalable web applications using Next.js.",
			price: 69.99,
			imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
			published: true,
			instructorId: instructor.id
		},
		{
			id: "a7b88c2e-6d47-4031-b2b7-98d5f37cfe74",
			title: "Database Design & Optimization",
			description: "Gain expertise in designing efficient databases using SQL and NoSQL technologies.",
			price: 89.99,
			imageUrl: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
			published: false,
			instructorId: instructor.id
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
