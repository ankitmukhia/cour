// https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#loading-environment-variables-with-nextenv

import './drizzle/envConfig.ts'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
		schema: './drizzle/schema.ts',
		out: './drizzle/migrations',
		dialect: "postgresql",
		dbCredentials: {
			url: process.env.DATABASE_URL!
		}
})
