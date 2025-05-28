## Setup Postgresql Database & Create .env file

Setup a postgresql database.

Create a .env file and add these variables based on your setup

-  DB_URL
-  DB_HOST
-  DB_PORT
-  DB_USER
-  DB_PASSWORD
-  DB_NAME

## Install package dependencies

```bash
npm install
```

## Generate database migration file

```bash
npm run db:generate
```

## Run the database migration

```bash
npm run db:migrate
```

## Seed the database with dummy data

```bash
npm run db:seed
```

## Build the app

```bash
npm run build
```

## Start the app

```bash
npm run start
```
