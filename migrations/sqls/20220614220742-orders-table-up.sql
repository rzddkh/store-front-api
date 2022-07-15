/* Replace with your SQL commands */
DROP TABLE IF EXISTS orders;
DROP SEQUENCE IF EXISTS orders_id_seq;
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    status varchar(30) NOT NULL
);