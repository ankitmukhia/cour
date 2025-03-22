import { WorkingStepType, GuestCredentialsTypes } from '@/types/index'
import { CursorClickIcon } from '@/components/ui/cursorclick-icon'
import { PartyPopperIcon } from '@/components/ui/partypopper-icon'
import { WorkflowIcon } from '@/components/ui/workflow-icon'

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
		title: "User Guest Signup",
		credentials: {
			name: "user",
			email: "user@gmail.com",
			password: "user123"
		}
	},
	{
		id: 2,
		title: "Admin Guest Signup",
		credentials: {
			name: "admin",
			email: "admin@gmail.com",
			password: "admin123"
		},
	},
	{
		id: 3,
		title: "Instructor Guest Signup",
		credentials: {
			name: "instructor",
			email: "instructor@gmail.com",
			password: "instructor123"
		}
	}
]
