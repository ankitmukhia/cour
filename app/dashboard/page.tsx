import { verifySession } from '@/app/(register)/session/session'
import { Appbar } from '@/components/Appbar'
import { redirect } from 'next/navigation'
import { courses } from '@/drizzle/schema'
import { db } from '@/drizzle/db'

export default async function DashboardPage() {
	const session = await verifySession();

	if (!session?.isAuth) {
		redirect("/")
	}

	return (
		<div className="mt-6">
			<Appbar />

			{/* show all the course your have enrolled in */}
		</div>
	)
}
