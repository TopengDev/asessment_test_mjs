'use server';

import { db } from '@/drizzle/db';
import { TEditUser, TNewUser } from '@/drizzle/schema/user';
import { revalidatePath } from 'next/cache';
import { eq, count } from 'drizzle-orm';
import { user } from '@/drizzle/schema';
import { address, TNewAddress } from '@/drizzle/schema/address';

export const createUser = async (data: TNewUser & { address: TNewAddress }) => {
   const [createdUser] = await db
      .insert(user)
      .values(data)
      .returning({ id: user.id });

   if (createdUser?.id) {
      await db.insert(address).values({
         ...data.address,
         user_id: createdUser.id,
      });
   }

   revalidatePath('/');
   return { status: 200, msg: 'Successfully created user' };
};

export const editUser = async (data: TEditUser & { address: TNewAddress }) => {
   await db
      .update(user)
      .set(data)
      .where(eq(user.id, data.id as number));

   await db
      .update(address)
      .set(data.address)
      .where(eq(address.user_id, data.id as number));

   revalidatePath('/');
   return { status: 200, msg: 'Successfully updated user' };
};

export const deleteUser = async (formData: FormData) => {
   const id = Number(formData.get('id'));
   if (!id) return;

   await db.delete(user).where(eq(user.id, id));
   await db.delete(address).where(eq(address.user_id, id));

   revalidatePath('/');
};

export const getUsers = async ({
   page = 1,
   limit = 10,
   keyword = '',
}: {
   page?: number;
   limit?: number;
   keyword?: string;
}) => {
   const offset = (page - 1) * limit;

   const results = await db.query.user.findMany({
      with: {
         address: true,
      },
      limit,
      offset,
      where: (user, { or, ilike }) =>
         keyword
            ? or(
                 ilike(user.firstname, `%${keyword}%`),
                 ilike(user.lastname, `%${keyword}%`),
                 ilike(user.id, `%${keyword}%`),
                 ilike(user.birthdate, `%${keyword}%`),
              )
            : undefined,
   });

   const total = (await db.select({ value: count() }).from(user))?.[0]?.value;
   const totalPages = Math.ceil(total / limit);
   return {
      data: results,
      pageInfo: {
         total,
         totalPages,
         page,
         limit,
      },
   };
};

export const getUserById = async ({ id = 0 }: { id: number }) => {
   const result = await db.query.user.findFirst({
      with: {
         address: true,
      },
      where: (user, { eq }) => eq(user.id, id),
   });

   return result;
};
