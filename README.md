# Skripsi Project FKUB MKS

FKUB Online Service System

### Prequisite

- Node Js: 16.14.2^
- PostgreSQL : 13.4^

### Dependencies

- basic data validation: Fastest Validator
- migration: Sequelize
- ORM: Sequelize
- Express Js

## Table of Content

- [Installing locally](#installing-locally)

## Installing Locally

1. First we need to clone the repo into our local machine

```
git clone https://github.com/MimiPA/fkub-service.git
```

2. then move to folder just created

```
cd fkub-service/
```

3. then install npm

```
npm install
```

4. then start npm

```
npm run start
```


## Database Migration

1. Make file .env and copy content from .env.example

2. Update DB_NAME, DB_USERNAME, and DB_PASSWORD based on your local

3. Run migration script

```
$ npx sequelize-cli db:migrate
```

4. Run seeder script

```
$ npx sequelize-cli db:seed:all
```


## Undoing Database Migration

1. Run undoing seeder script

```
$ npx sequelize-cli db:seed:undo:all
```

2. Run undoing migration script

```
$ npx sequelize-cli db:migrate:undo:all
```
