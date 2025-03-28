import { pgTable, uuid, text, integer, timestamp, pgEnum, boolean, real, uniqueIndex } from 'drizzle-orm/pg-core'
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

export const enrollments = pgTable('enrollments', {
	id: uuid().defaultRandom().primaryKey(),
	createdAt: timestamp('createdAt').defaultNow(),
	updatedAt: timestamp('updatedAt').defaultNow(),
	userId: uuid('userId').references(() => users.id),
	courseId: uuid('courseId').references(() => courses.id),
}, (table) => ({
	// ensures user cant enroll in same course multiple times
	uniqueUserAndCourse: uniqueIndex('unique_user_course').on(table.userId, table.courseId)
}))

export const section = pgTable('section', {
	id: uuid().defaultRandom().primaryKey(),
	title: text('title'),
	order: integer("order"),
	courseId: uuid('courseId').references(() => courses.id),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
})

export const lesson = pgTable('lesson', {
	id: uuid().defaultRandom().primaryKey(),
	title: text("title"),
	content: text("content"),
	videoUrl: text('videoUrl'),
	order: integer('order'),
	sectionId: uuid("sectionId").references(() => section.id)
})

export const userRelations = relations(users, ({ one, many }) => ({
	// One user -> many Courses & enrollments
	courses: many(courses),
	enrollments: many(enrollments),
}))

export const coursesRelations = relations(courses, ({ one, many }) => ({
	creator: one(users, {
		fields: [courses.instructorId],
		references: [users.id]
	}),
	enrollments: many(enrollments),
	sections: many(section)
}))

export const enrollmentRelations = relations(enrollments, ({ one }) => ({
	course: one(courses, {
		fields: [enrollments.courseId],
		references: [courses.id]
	}),
	user: one(users, {
		fields: [enrollments.userId],
		references: [users.id]
	})
}))

export const sectionRelations = relations(section, ({ one, many }) => ({
	course: one(courses, {
		fields: [section.courseId],
		references: [courses.id]
	}),
	lessons: many(lesson)
}))

export const lessonRelations = relations(lesson, ({ one }) => ({
	section: one(section, {
		fields: [lesson.sectionId],
		references: [section.id]
	})
}))

export type NewUser = InferInsertModel<typeof users>
export type NewCourse = InferInsertModel<typeof courses>
export type NewSection = InferInsertModel<typeof section>
export type NewLesson = InferInsertModel<typeof lesson>
