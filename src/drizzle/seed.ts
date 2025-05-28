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
         {
            firstname: 'Camille',
            lastname: 'Lynch',
            birthdate: '1993-11-22',
         },
         {
            firstname: 'Ballard',
            lastname: 'Benton',
            birthdate: '2008-10-22',
         },
         {
            firstname: 'Dolores',
            lastname: 'Walsh',
            birthdate: '1984-08-09',
         },
         {
            firstname: 'Trudy',
            lastname: 'Wilson',
            birthdate: '2020-12-05',
         },
         {
            firstname: 'Judith',
            lastname: 'Vargas',
            birthdate: '1993-05-13',
         },
         {
            firstname: 'Rosales',
            lastname: 'House',
            birthdate: '2020-11-15',
         },
         {
            firstname: 'Nikki',
            lastname: 'Dickson',
            birthdate: '1995-05-26',
         },
         {
            firstname: 'Bonner',
            lastname: 'Clarke',
            birthdate: '1995-12-25',
         },
         {
            firstname: 'Velasquez',
            lastname: 'Bonner',
            birthdate: '2001-06-24',
         },
         {
            firstname: 'Sutton',
            lastname: 'Boone',
            birthdate: '1996-02-17',
         },
         {
            firstname: 'Solomon',
            lastname: 'Oconnor',
            birthdate: '1996-10-26',
         },
         {
            firstname: 'Angeline',
            lastname: 'Burris',
            birthdate: '2002-11-17',
         },
         {
            firstname: 'Warren',
            lastname: 'Mcgowan',
            birthdate: '1984-02-18',
         },
         {
            firstname: 'Elva',
            lastname: 'Bruce',
            birthdate: '2020-04-12',
         },
         {
            firstname: 'Ortega',
            lastname: 'Marshall',
            birthdate: '1998-05-16',
         },
         {
            firstname: 'Orr',
            lastname: 'Rocha',
            birthdate: '2001-08-01',
         },
         {
            firstname: 'Sharpe',
            lastname: 'Lancaster',
            birthdate: '1983-09-17',
         },
         {
            firstname: 'Arline',
            lastname: 'Knox',
            birthdate: '1988-08-30',
         },
         {
            firstname: 'French',
            lastname: 'Tucker',
            birthdate: '2015-10-16',
         },
         {
            firstname: 'Corinne',
            lastname: 'Chang',
            birthdate: '2017-12-11',
         },
         {
            firstname: 'Beard',
            lastname: 'Glass',
            birthdate: '2013-10-06',
         },
         {
            firstname: 'Delaney',
            lastname: 'Decker',
            birthdate: '2003-07-13',
         },
         {
            firstname: 'Fox',
            lastname: 'Whitfield',
            birthdate: '1997-11-18',
         },
         {
            firstname: 'Amelia',
            lastname: 'Wolf',
            birthdate: '2003-03-23',
         },
         {
            firstname: 'Mcdowell',
            lastname: 'Dickerson',
            birthdate: '2008-08-16',
         },
         {
            firstname: 'Claudia',
            lastname: 'Merrill',
            birthdate: '1983-07-14',
         },
         {
            firstname: 'Janice',
            lastname: 'Reed',
            birthdate: '2011-12-26',
         },
         {
            firstname: 'Ford',
            lastname: 'Blanchard',
            birthdate: '2023-09-22',
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
      {
         user_id: insertedUsers[2].id,
         street: 'Vine Street',
         city: 'Golconda',
         province: 'Idaho',
         postal_code: '28241',
      },
      {
         user_id: insertedUsers[3].id,
         street: 'Lefferts Avenue',
         city: 'Kohatk',
         province: 'Maine',
         postal_code: '29385',
      },
      {
         user_id: insertedUsers[4].id,
         street: 'Bevy Court',
         city: 'Summerset',
         province: 'Georgia',
         postal_code: '82499',
      },
      {
         user_id: insertedUsers[5].id,
         street: 'Legion Street',
         city: 'Konterra',
         province: 'Kentucky',
         postal_code: '58302',
      },
      {
         user_id: insertedUsers[6].id,
         street: 'Whitwell Place',
         city: 'Bethpage',
         province: 'Mississippi',
         postal_code: '41843',
      },
      {
         user_id: insertedUsers[7].id,
         street: 'Verona Street',
         city: 'Dana',
         province: 'Montana',
         postal_code: '57602',
      },
      {
         user_id: insertedUsers[8].id,
         street: 'Vandervoort Avenue',
         city: 'Davenport',
         province: 'American Samoa',
         postal_code: '80299',
      },
      {
         user_id: insertedUsers[9].id,
         street: 'Brown Street',
         city: 'Waiohinu',
         province: 'Maryland',
         postal_code: '84726',
      },
      {
         user_id: insertedUsers[10].id,
         street: 'Prescott Place',
         city: 'Ruffin',
         province: 'Washington',
         postal_code: '79672',
      },
      {
         user_id: insertedUsers[11].id,
         street: 'Gatling Place',
         city: 'Jugtown',
         province: 'Guam',
         postal_code: '41052',
      },
      {
         user_id: insertedUsers[12].id,
         street: 'Suydam Place',
         city: 'Maury',
         province: 'Iowa',
         postal_code: '29661',
      },
      {
         user_id: insertedUsers[13].id,
         street: 'Lewis Avenue',
         city: 'Soham',
         province: 'North Dakota',
         postal_code: '74496',
      },
      {
         user_id: insertedUsers[14].id,
         street: 'Neptune Court',
         city: 'Glendale',
         province: 'Nevada',
         postal_code: '39323',
      },
      {
         user_id: insertedUsers[15].id,
         street: 'Dunne Court',
         city: 'Rew',
         province: 'Indiana',
         postal_code: '74223',
      },
      {
         user_id: insertedUsers[16].id,
         street: 'Baltic Street',
         city: 'Gilmore',
         province: 'New York',
         postal_code: '44870',
      },
      {
         user_id: insertedUsers[17].id,
         street: 'Nevins Street',
         city: 'Fowlerville',
         province: 'New Hampshire',
         postal_code: '31500',
      },
      {
         user_id: insertedUsers[18].id,
         street: 'Canda Avenue',
         city: 'Morgandale',
         province: 'Northern Mariana Islands',
         postal_code: '23688',
      },
      {
         user_id: insertedUsers[19].id,
         street: 'Ferris Street',
         city: 'Smock',
         province: 'Louisiana',
         postal_code: '98030',
      },
      {
         user_id: insertedUsers[20].id,
         street: 'Bushwick Court',
         city: 'Rushford',
         province: 'Texas',
         postal_code: '90033',
      },
      {
         user_id: insertedUsers[21].id,
         street: 'Canarsie Road',
         city: 'Caln',
         province: 'Puerto Rico',
         postal_code: '26167',
      },
      {
         user_id: insertedUsers[22].id,
         street: 'Hart Place',
         city: 'Snyderville',
         province: 'District Of Columbia',
         postal_code: '79422',
      },
      {
         user_id: insertedUsers[23].id,
         street: 'Ocean Avenue',
         city: 'Greenbush',
         province: 'Palau',
         postal_code: '62212',
      },
      {
         user_id: insertedUsers[24].id,
         street: 'Hinckley Place',
         city: 'Jacksonburg',
         province: 'Rhode Island',
         postal_code: '70500',
      },
      {
         user_id: insertedUsers[25].id,
         street: 'Howard Place',
         city: 'Grill',
         province: 'Virgin Islands',
         postal_code: '89323',
      },
      {
         user_id: insertedUsers[26].id,
         street: 'McKibbin Street',
         city: 'Hemlock',
         province: 'North Carolina',
         postal_code: '27251',
      },
      {
         user_id: insertedUsers[27].id,
         street: 'Harwood Place',
         city: 'Wakulla',
         province: 'Virginia',
         postal_code: '43403',
      },
      {
         user_id: insertedUsers[28].id,
         street: 'Rugby Road',
         city: 'Omar',
         province: 'Missouri',
         postal_code: '46158',
      },
      {
         user_id: insertedUsers[29].id,
         street: 'Diamond Street',
         city: 'Rivers',
         province: 'Minnesota',
         postal_code: '23824',
      },
   ]);
}

seed();
