'use client'

import { useActionState, useRef } from 'react'
import { GuestButton } from '@/components/ui/guest-button'
import { GuestCredentialsTypes } from '@/types'
import { GuestUser } from '@/lib/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signin } from './action'

export const SignInForm = () => {
	const [state, action, isPending] = useActionState(signin, undefined)
	console.log("current state: ", state)
	const nameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)


	const handleGuest = (item: GuestCredentialsTypes) => {
		const { email, password } = item.credentials;

		if (nameRef.current) nameRef.current.value = email;
		if (passwordRef.current) passwordRef.current.value = password;
	}

	return (
		<>
			<form action={action}>
				<div className="flex flex-col gap-2">
					<Input ref={nameRef} name="email" placeholder="Email" />
					<Input ref={passwordRef} name="password" placeholder="Password" />

					<Button className="mt-4 shadow-3xl">
						{isPending ? "Submitting..." : "Sign In"}
					</Button>
				</div>
			</form>

			<div className="flex items-center justify-between mt-6 gap-2">
				{GuestUser.map((item) => (
					<GuestButton key={item.id} onClick={() => handleGuest(item)}>
						{item.title}
					</GuestButton>
				))}
			</div>
		</>
	)
}
