import { mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .default(sql`(UUID())`), 
    
    name: text('name').notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
});

export const courses =mysqlTable('courses',{
    id:varchar('id',{length:36}).primaryKey().default(sql`(UUID())`),
    title:varchar('title',{length:255}).notNull().unique(),
    description:text('description',).notNull(),
})