/* Replace with your SQL commands */
CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity int
);