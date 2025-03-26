import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/app/(register)/session/session'
import { eq, and } from 'drizzle-orm'
import { enrollments, courses } from '@/drizzle/schema'
import { redirect } from 'next/navigation'
import { db } from '@/drizzle/db'

export async function POST(req: NextRequest) {
	const session = await verifySession()

	if (!session) {
		redirect('/signin')
	}

	const { courseId } = await req.json();

	try {
		// 1. check weather course exist or not
		const courseExists = await db.query.courses.findFirst({
			where: and(
				eq(courses.id, courseId),
				eq(courses.published, true)
			)
		})

		if (!courseExists) {
			return NextResponse.json({ error: "Course doens't exists." }, { status: 401 })
		}

		// 2. check weather user is already enrolled or not 
		const alreadyEnrolled = await db.select().from(enrollments).where(
			and(
				eq(enrollments.userId, session.userId),
				eq(enrollments.courseId, courseId)
			)
		).limit(1);

		if (alreadyEnrolled.length) {
			return NextResponse.json({ error: "You are already enrolled, please visit your dashboard." }, { status: 401 })
		}

		// 3. then enroll the user, to the course that is being requested
		const enrollUser = await db.insert(enrollments).values({
			userId: session.userId,
			courseId: courseId
		}).returning()

		return NextResponse.json(enrollUser, { status: 201 })
	} catch (err) {

	}
}
