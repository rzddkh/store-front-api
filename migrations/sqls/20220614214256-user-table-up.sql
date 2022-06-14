/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName varchar,
    lastName varchar,
    userName varchar Unique,
    password varchar
);