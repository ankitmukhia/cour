import { WorkingStepType, GuestCredentialsTypes } from '@/types/index'
import { CursorClickIcon } from '@/components/ui/cursorclick-icon'
import { PartyPopperIcon } from '@/components/ui/partypopper-icon'
import { WorkflowIcon } from '@/components/ui/workflow-icon'
import { NewCourse, NewUser, NewSection, NewLesson } from '@/drizzle/schema'
import { v4 as uuid } from 'uuid'

export const WorkingStep: WorkingStepType[] = [
	{
		id: 1,
		icon: WorkflowIcon,
		name: "Seamless Registration",
		description: "Sign up effortlessly with our intuitive and hassle-free registration process.",
	},
	{
		id: 2,
		icon: CursorClickIcon,
		name: "Explore & Enroll",
		description: "Browse a diverse range of courses and enroll in the ones that match your learning goals.",
	},
	{
		id: 3,
		icon: PartyPopperIcon,
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
			imageUrl: "https://images.unsplash.com/photo-1543966888-7c1dc482a810?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

interface Lesson {
	id: string;
	title: string;
	duration: string; // Example: "10 min"
}

export interface Section {
	id: string;
	title: string;
	description: string;
	lessons: Lesson[];
}

export const CourseSections: Section[] = [
	{
		id: "html",
		title: "HTML Basics",
		description: "Learn the foundation of web development with HTML.",
		lessons: [
			{ id: "html-1", title: "Introduction to HTML", duration: "5 min" },
			{ id: "html-2", title: "HTML Elements & Structure", duration: "8 min" },
			{ id: "html-3", title: "Forms & Inputs", duration: "10 min" },
			{ id: "html-4", title: "Semantic HTML", duration: "7 min" },
		],
	},
	{
		id: "css",
		title: "CSS Fundamentals",
		description: "Style your web pages with CSS techniques.",
		lessons: [
			{ id: "css-1", title: "CSS Selectors & Properties", duration: "6 min" },
			{ id: "css-2", title: "Box Model & Flexbox", duration: "10 min" },
			{ id: "css-3", title: "Grid Layout", duration: "9 min" },
			{ id: "css-4", title: "CSS Animations", duration: "7 min" },
		],
	},
	{
		id: "javascript",
		title: "JavaScript Essentials",
		description: "Learn JavaScript fundamentals for interactive web pages.",
		lessons: [
			{ id: "js-1", title: "Variables & Data Types", duration: "7 min" },
			{ id: "js-2", title: "Functions & Scope", duration: "8 min" },
			{ id: "js-3", title: "DOM Manipulation", duration: "10 min" },
			{ id: "js-4", title: "ES6+ Features", duration: "9 min" },
		],
	},
	{
		id: "react",
		title: "React for Beginners",
		description: "Build dynamic web applications using React.",
		lessons: [
			{ id: "react-1", title: "JSX & Components", duration: "10 min" },
			{ id: "react-2", title: "Props & State", duration: "12 min" },
			{ id: "react-3", title: "React Hooks", duration: "15 min" },
			{ id: "react-4", title: "React Router", duration: "10 min" },
		],
	},
];
