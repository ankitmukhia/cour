import 'server-only'

import { SessionPayloadTypes } from '@/types'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey)

const encrypt = async (payload: SessionPayloadTypes) => {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(`1hr`)
		.sign(key)
}

const decrypt = async (session: string) => {
	try {
		const { payload } = await jwtVerify(session, key, {
			algorithms: ['HS256'],
		});
		return payload;
	} catch (error) {
		return null;
	}
}

export const createSession = async (userId: string) => {
	const expireAt = new Date(Date.now() + 60 * 60 * 1000)
	const session = await encrypt({ userId, expireAt })
	const cookieStore = await cookies()

	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expireAt,
		path: '/'
	})

	redirect('/')
}

export const verifySession = async () => {
	const cookieStore = await cookies()
	const cookie = cookieStore.get('session')?.value

	if (!cookie) {
		redirect('/signin')
	}

	const session = await decrypt(cookie)

	return {
		isAuth: true, userId: String(session?.userId)
	}
}

export const deleteSession = async () => {
	(await cookies()).delete('session')
	redirect('/')
}
