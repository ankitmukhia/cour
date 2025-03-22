'use client'

import { logout } from '@/app/(register)/signup/action'

export const Appbar = () => {
	const handleSignout = async () => {
		await logout()
	}

	return (
		<div className="flex items-center justify-between">
			<h1>Dashboard</h1>

			<button onClick={handleSignout}>Signout</button>
		</div>
	)
}
