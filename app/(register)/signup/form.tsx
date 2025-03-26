'use client'

import { useActionState, useRef, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { GuestCredentialsTypes } from '@/types'
import { GuestUser } from '@/lib/constants'
import { GuestButton } from '@/components/ui/guest-button'
import { Button } from '@/components/ui/button'
import { signup } from './action'
import { toast } from 'sonner'

export const SignupForm = () => {
	const [state, action, isPending] = useActionState(signup, undefined)

	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const handleGuest = (item: GuestCredentialsTypes) => {
		const { name, email, password } = item.credentials;

		if (nameRef.current) nameRef.current.value = name;
		if (emailRef.current) emailRef.current.value = email;
		if (passwordRef.current) passwordRef.current.value = password;
	}

	useEffect(() => {
		if (state?.error) {
			toast(`${state?.message}`)
		}
	}, [state])

	return (
		<>
			<form action={action}>
				<div className="flex flex-col gap-2">
					<Input type="name" name="name" ref={nameRef} placeholder="Name" />
					<Input type="email" name="email" ref={emailRef} placeholder="Email" />
					<Input type="current-password" name="password" ref={passwordRef} placeholder="Password" />

					<Button className="mt-4 shadow-3xl">
						{isPending ? "Submitting..." : "Sign Up"}
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
};
