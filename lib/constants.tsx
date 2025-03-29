import { WorkingStepType, GuestCredentialsTypes } from '@/types/index'
import { CursorClickIcon } from '@/components/ui/cursorclick-icon'
import { PartyPopperIcon } from '@/components/ui/partypopper-icon'
import { WorkflowIcon } from '@/components/ui/workflow-icon'
import { NewCourse, NewUser, NewSection, NewLesson } from '@/drizzle/schema'
import { v4 as uuid } from 'uuid'
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

export const GuestUser: GuestCredentialsTypes[] = [
	{
		id: 1,
		title: "User guest Register.",
		credentials: {
			name: 'user',
			email: 'user@gmail.com',
			password: 'user123',
		}
	},
	{
		id: 2,
		title: "Instructor guest Register.",
		credentials: {
			name: 'instructor',
			email: 'instructor@gmail.com',
			password: 'instructor123',
		}
	},
	{
		id: 3,
		title: "Admin guest Register.",
		credentials: {
			name: 'admin',
			email: 'admin@gmail.com',
			password: 'admin123',
		}
	}
]

/* export const GuestBatch: NewUser[] = [
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
];

export const CourseBatch = (instructor: NewUser): NewCourse[] => {
	return [
		{
			id: uuid(),
			title: "Mastering React",
			description: "Deep dive into React, including hooks, state management, and performance optimization.",
			price: 79.99,
			imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
			published: true,
			instructorId: instructor.id
		},
		{
			id: uuid(),
			title: "Full-Stack JavaScript",
			description: "Learn how to build full-stack applications using Node.js, Express, and MongoDB.",
			price: 99.99,
			imageUrl: "https://images.unsplash.com/photo-1526374870839-e155464bb9df",
			published: true,
			instructorId: instructor.id
		},
		{
			id: uuid(),
			title: "Advanced TypeScript",
			description: "Master TypeScript with advanced types, generics, and best practices for scalable applications.",
			price: 59.99,
			imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
			published: false,
			instructorId: instructor.id
		},
		{
			id: uuid(),
			title: "UI/UX Design Fundamentals",
			description: "Understand the principles of great design and how to create user-friendly interfaces.",
			price: 39.99,
			imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
			published: true,
			instructorId: instructor.id
		},
		{
			id: uuid(),
			title: "Next.js for Beginners",
			description: "Learn how to build fast and scalable web applications using Next.js.",
			price: 69.99,
			imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
			published: true,
			instructorId: instructor.id
		},
		{
			id: uuid(),
			title: "Database Design & Optimization",
			description: "Gain expertise in designing efficient databases using SQL and NoSQL technologies.",
			price: 89.99,
			imageUrl: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
			published: false,
			instructorId: instructor.id
		}
	];
}

export const SectionBatch = (course: NewCourse): NewSection[] => {
	return [
		{
			id: uuid(),
			title: "Introduction to React and JSX",
			order: 1,
			courseId: course.id
		},
		{
			id: uuid(),
			title: "State Management with Hooks",
			order: 2,
			courseId: course.id
		},
		{
			id: uuid(),
			title: "Performance Optimization Techniques",
			order: 3,
			courseId: course.id
		}
	]
}

// now for each seaction, we need to have bunch of lesson, and that lesson ides will come as props,
export const LessonBatch = (sections: NewSection[]): NewLesson[] => {
	return [
		// Lessons for "Introduction to React and JSX"
		{
			id: uuid(),
			title: "What is React and Why Use It?",
			order: 1,
			content: "An overview of React, its advantages, and how it differs from traditional web development.",
			videoUrl: "https://example.com/react-intro",
			sectionId: sections[0].id
		},
		{
			id: uuid(),
			title: "JSX and Component Basics",
			order: 2,
			content: "Understanding JSX syntax and the basics of React components.",
			videoUrl: "https://example.com/jsx-components",
			sectionId: sections[0].id
		},

		// Lessons for "State Management with Hooks"
		{
			id: uuid(),
			title: "Understanding useState Hook",
			order: 1,
			content: "A deep dive into useState and how to manage local state in functional components.",
			videoUrl: "https://example.com/usestate-hook",
			sectionId: sections[1].id
		},
		{
			id: uuid(),
			title: "Using useEffect for Side Effects",
			order: 2,
			content: "How to use useEffect for handling side effects like data fetching and subscriptions.",
			videoUrl: "https://example.com/useeffect-hook",
			sectionId: sections[1].id
		},

		// Lessons for "Performance Optimization Techniques"
		{
			id: uuid(),
			title: "React.memo and useCallback",
			order: 1,
			content: "Using React.memo and useCallback to optimize performance by preventing unnecessary re-renders.",
			videoUrl: "https://example.com/react-memo-usecallback",
			sectionId: sections[2].id
		},
		{
			id: uuid(),
			title: "Lazy Loading and Code Splitting",
			order: 2,
			content: "Understanding how to improve performance with lazy loading and dynamic imports.",
			videoUrl: "https://example.com/lazy-loading",
			sectionId: sections[2].id
		}
	];
};
*/
