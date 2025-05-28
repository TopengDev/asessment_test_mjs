import { pgTable, serial, timestamp, varchar, date } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const user = pgTable('user', {
   id: serial('id').primaryKey().unique(),
   firstname: varchar('firstname', { length: 255 }).notNull(),
   lastname: varchar('lastname', { length: 255 }),
   birthdate: date('birthdate', { mode: 'string' }).notNull(),
   createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
   updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
});

export const Userchema = createSelectSchema(user);
export const NewUserchema = createInsertSchema(user).pick({
   firstname: true,
   birthdate: true,
});

export type TUser = z.infer<typeof Userchema>;
export type TNewUser = z.infer<typeof NewUserchema>;
