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
            const sql = 'INSERT INTO products VALUS ($1,$2,$3);'
            const result = await conn.query(sql, [product_name, price, category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async topFive() {}
    async byCategory() {}


}
