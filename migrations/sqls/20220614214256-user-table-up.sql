/* Replace with your SQL commands */
DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName varchar NOT NULL,
    lastName varchar NOT NULL,
    userName varchar NOT NULL Unique,
    password varchar NOT NULL
);