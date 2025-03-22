import { pgTable, uuid, text, timestamp, pgEnum, boolean, real, uniqueIndex } from 'drizzle-orm/pg-core'
import { InferInsertModel, relations } from 'drizzle-orm'

export const roleEnum = pgEnum('user_role', ['user', 'admin', 'instructor'])

export const users = pgTable('users', {
	id: uuid().defaultRandom().primaryKey(),
	name: text('name').notNull(),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	role: roleEnum('role').default('user'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
})

export const enrollments = pgTable('enrollments', {
	id: uuid().defaultRandom().primaryKey(),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow(),
	userId: uuid('userId').references(() => users.id),
	courseId: uuid('courseId').references(() => users.id),
}, (table) => ({
	// ensures user cant enroll in same course multiple times
	uniqueUserAndCourse: uniqueIndex('unique_user_course').on(table.userId, table.courseId)
}))

export const courses = pgTable('courses', {
	id: uuid().defaultRandom().primaryKey(),
	title: text('title'),
	description: text('description'),
	price: real('price'),
	imageUrl: text('imageUrl'),
	published: boolean('published').default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
	instructorId: uuid('instructorId').references(() => users.id),
})

export const userRelations = relations(users, ({ many }) => ({
	// One user -> many Courses & enrollments
	courses: many(courses),
	enrollments: many(enrollments)
}))

export const coursesRelations = relations(courses, ({ one }) => ({
	creator: one(users, {
		fields: [courses.instructorId],
		references: [users.id]
	})
}))

export const enrollmentRelations = relations(enrollments, ({ one }) => ({
	course: one(courses, {
		fields: [enrollments.courseId],
		references: [courses.id]
	})
}))

export type NewUser = InferInsertModel<typeof users>
export type NewCourse = InferInsertModel<typeof courses>
