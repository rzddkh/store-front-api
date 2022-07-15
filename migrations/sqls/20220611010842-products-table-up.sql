/* Replace with your SQL commands */
DROP TABLE IF EXISTS products;
DROP SEQUENCE IF EXISTS products_id_seq;
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name varchar NOT NUll,
    price Integer NOT NULL,
    category varchar(100) NOT NULL
);