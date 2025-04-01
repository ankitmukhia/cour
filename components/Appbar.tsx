'use client'

import { logout } from '@/app/(register)/signup/action'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface RoleProps {
	role: any
}

export const Appbar = ({ role }: RoleProps) => {
	const router = useRouter()
	const handleSignout = async () => {
		await logout()
	}

	return (
		<div className="flex items-center justify-between">
			<div onClick={() => router.back()} className="group inline-block p-1 rounded-full bg-orange-500 cursor-pointer hover:bg-orange-500/80">
				<ArrowLeftIcon className="h-4 w-4 transform transaction-all duration-100 ease-in-out group-hover:scale-110" />
			</div>

			<div className="flex items-center gap-4">
				{role === "instructor" && (
					<Link href="/create" className="hover-underline">
						Create
					</Link>
				)}

				<button className="hover-underline cursor-pointer" onClick={handleSignout}>Signout</button>
			</div>
		</div>
	)
}
