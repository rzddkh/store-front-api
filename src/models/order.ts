import client from "../database";

export type Order = {
    id: number,
    user_id: number,
    status: string
}

export class orderStore { // current orders by user with active status
    async getActive(user_id : number, status : string): Promise < Order[] > {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2);'
            const result = await conn.query(sql, [user_id, status]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders. ${err}`);
        }
    }

    async getComplete(user_id : number, status : string): Promise < Order[] > {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2);'
            const result = await conn.query(sql, [user_id, status]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders. ${err}`);
        }
    }

    // add a product to an order
    async addProduct(order_id : number, product_id : number, quantity : number): Promise < Order[] > {

        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO order_product VALUES ($1,$2,$3);'
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Cannot add product ${product_id} to order ${order_id}: ${err}`);
        }
    }


}
