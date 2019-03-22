## Please note:

This server application is written to communicate with a React front end, which you can download here:
[https://github.com/stuart-gill/react-comments](https://github.com/stuart-gill/react-comments)

## Available Scripts

Install nodemon:

### `npm install -g nodemon`

Then, while in the postgres-api directory, you can run:

### `nodemon server.js`

For a hot reloaded server on port 3000.

## Database

Please build a Postgres table on your local machine for this project, with the following fields and types:

[{field: id, type: text, nullable: false}, {field: comment, type: text, nullable: true, default: NULL}, {field: timestamp, type: timestamp with time zone, nullable: false, default: now()}, {field: first_name, type: character varying, nullable: true, default: NULL}}

Serve this database locally using the following inputs (or else change the inputs in the server.js file to match your local database):
port: 5432,
password: "Utterance5",
database: "comments",
host: "localhost",
user: "postgres",
max: 10

## Technologies

I used SQLPro for Postgres and pgAdmin3 LTS by BigSQL for database management on this project.
