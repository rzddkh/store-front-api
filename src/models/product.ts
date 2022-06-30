import {query} from "express";
import client from "../database";
// @ts-ignore
export type Product = {
    id: number,
    product_name: string,
    price: number,
    category: string
}


export class productStore {

    async index(): Promise < Product[] > {
        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM products;'
            const result = await conn.query(sql);
            conn.release();
            return result.rows;

        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }

    }

    async show(id : number): Promise < Product[] > {
        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1);'
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async create(product_name : string, price : number, category : string): Promise < Product[] > {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products (product_name, price, category) VALUES ($1,$2,$3) RETURNING *;'
            const result = await conn.query(sql, [product_name, price, category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot add the product ${err}`);
        }
    }

    async deleteProd(product_id : number): Promise < Product[] > {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=$1'
            const result = await conn.query(sql, [product_id]);
            return result.rows[0];

        } catch (err) {
            throw new Error(`Cannot remove the product ${err}.`)
        }
    }

    // top most popular products
    async topFive(): Promise < Product[] > {

        try {
            const conn = await client.connect();
            const sql = 'SELECT product_id FROM order_product GROUP BY product_id order by SUM(quantity) DESC LIMIT 5;'
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get most 5 popular products: ${err}`);
        }
    }

    async byCategory(category : string): Promise < Product[] > {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1);'
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get this category: ${err}.`);
        }


    }


}
