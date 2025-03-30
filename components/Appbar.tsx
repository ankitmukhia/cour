'use client'

import { logout } from '@/app/(register)/signup/action'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export const Appbar = () => {
	const router = useRouter()
	const handleSignout = async () => {
		await logout()
	}

	return (
		<div className="flex items-center justify-between">
			<div onClick={() => router.back()} className="group inline-block p-1 rounded-full bg-orange-500 cursor-pointer hover:bg-orange-500/80">
				<ArrowLeftIcon className="h-4 w-4 transform transaction-all duration-100 ease-in-out group-hover:scale-110" />
			</div>

			<button onClick={handleSignout}>Signout</button>
		</div>
	)
}
