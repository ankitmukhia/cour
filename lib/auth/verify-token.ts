import { jwtVerify } from 'jose'

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey)

export const verifyToken = async (token: string) => {
	try {
		const { payload } = await jwtVerify(token, key, {
			algorithms: ['HS256'],
		});
		return payload;
	} catch (error) {
		return null;
	}
}
