/* Replace with your SQL commands */
DROP TABLE IF EXISTS order_product;
DROP SEQUENCE IF EXISTS order_product_id_seq;
CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity int NOT NULL
);