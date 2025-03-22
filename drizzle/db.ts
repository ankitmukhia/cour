// connection establishment to database 

import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

const sql = neon(process.env.DATABASE_URL!)
// Explicitly passing schema ensures db.query gets all tables/types
export const db = drizzle({ client: sql, schema })

