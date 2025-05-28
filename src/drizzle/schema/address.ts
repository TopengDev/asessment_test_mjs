import { relations } from 'drizzle-orm';
import {
   integer,
   pgTable,
   serial,
   timestamp,
   varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { user } from './user';
import { z } from 'zod/v4';

export const address = pgTable('address', {
   id: serial('id').primaryKey().unique(),

   user_id: integer('user_id')
      .references(() => user.id, {
         onDelete: 'cascade',
      })
      .notNull(),
   street: varchar('street', { length: 255 }).notNull(),
   city: varchar('city', { length: 255 }).notNull(),
   province: varchar('province', { length: 255 }).notNull(),
   postal_code: varchar('postal_code', { length: 255 }).notNull(),

   createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
   updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
});

export const addressRelations = relations(address, ({ one }) => ({
   user: one(user, {
      fields: [address.user_id],
      references: [user.id],
   }),
}));

export const AddressSchema = createSelectSchema(address);
export const NewAddressSchema = createInsertSchema(address).pick({
   user_id: true,
   street: true,
   city: true,
   province: true,
   postal_code: true,
});
export const EditAddressSchema = createInsertSchema(address).pick({
   id: true,
   user_id: true,
   street: true,
   city: true,
   province: true,
   postal_code: true,
});

export type TAddress = z.infer<typeof AddressSchema>;
export type TNewAddress = z.infer<typeof NewAddressSchema>;
export type TEditAddress = z.infer<typeof EditAddressSchema>;
