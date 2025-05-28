import { db } from '@/drizzle/db';
import { user, address } from '@/drizzle/schema';

async function seed() {
   // Seed users
   const insertedUsers = await db
      .insert(user)
      .values([
         {
            firstname: 'Christopher',
            lastname: 'Nolan',
            birthdate: '1980-07-30',
         },
         {
            firstname: 'Ada',
            lastname: 'Lovelace',
            birthdate: '1815-12-10',
         },
      ])
      .returning({ id: user.id });

   // Seed addresses using the returned user IDs
   await db.insert(address).values([
      {
         user_id: insertedUsers[0].id,
         street: '123 Gotham Ave',
         city: 'Jakarta',
         province: 'DKI Jakarta',
         postal_code: '10220',
      },
      {
         user_id: insertedUsers[1].id,
         street: '42 Logic Lane',
         city: 'Bandung',
         province: 'West Java',
         postal_code: '40123',
      },
   ]);
}

seed();
