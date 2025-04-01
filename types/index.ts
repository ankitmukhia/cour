import { NewCourse, NewSection, NewLesson } from '@/drizzle/schema'

export interface WorkingStepType {
	id: number;
	icon?: any;
	name: String;
	description: String;
}

export type FormState = {
	errors?: {
		name: string[];
		email: string[];
		password: string[];
	};
	message?: string;
} | undefined;

export type GuestCredentialsTypes = {
	id: number;
	title: string;
	credentials: {
		name: string;
		email: string;
		password: any;
	}
}

export type SessionPayloadTypes = {
	userId: string | number;
	role: any;
	expireAt: Date;
}

export interface SectionWithLesson extends NewSection {
	lessons: NewLesson[];
}

export interface CourseWithSection extends NewCourse {
	sections: SectionWithLesson[];
}
