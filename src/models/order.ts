import client from "../database";

export type Order = {
    id: number,
    user_id: number,
    status: string
}

export class orderStore { // current orders by user with active status
    async getOrder(user_id : number, status : string): Promise < Order[] > {
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
    async addToOrder(order_id : number, product_id : number, quantity : number): Promise < Order[] > {

        try {
            const conn = await client.connect();

            // check to see product exist already in the order or not
            // if yes we update the quanity by adding if not we add the product to order
            const sqlExist = 'SELECT quantity FROM order_product WHERE order_id=($1) AND product_id=($2);'
            const resultExist = await conn.query(sqlExist, [order_id, product_id]);
            const existingQuantity = resultExist.rows;
            // it should be let because it needs to be mutable for the logic below to work
            let order = null;

            if (! existingQuantity.length) {
                const sql = 'INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1,$2,$3);'
                const result = await conn.query(sql, [order_id, product_id, quantity]);
                order = result.rows[0];
            } else {
                const quant: number = existingQuantity[0].quantity + + quantity;
                const sql = 'UPDATE order_product SET quantity=($1) WHERE order_id=($2) AND product_id=($3);'
                const result = await conn.query(sql, [quant, order_id, product_id]);
                order = result.rows[0];
            } conn.release();

            return order;
        } catch (err) {
            throw new Error(`: ${err}`);
        }
    }

    async removeFromOrder(order_id : number, product_id : number): Promise < Order[] > {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM order_product WHERE order_id=$1  and product_id=$2;'
            const result = await conn.query(sql, [order_id, product_id]);
            conn.release();
            return result.rows;

        } catch (err) {
            throw new Error(`Cannot remove the item from order : ${err}`)
        }
    };


    async create(user_id : number): Promise < Order[] > {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id,status) VALUES ($1,$2);'
            const result = await conn.query(sql, [user_id, 'active']);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Cannot Add a new order : ${err}.`);
        }
    }

    async deleteOrder(order_id : number): Promise < Order[] > {
        try {
            const conn = await client.connect();
            const sql = 'DELETE from orders WHERE id=$1;'
            const result = await conn.query(sql, [order_id]);
            return result.rows[0];

        } catch (err) {
            throw new Error(`cannot delete the order : ${err}`);
        }

    }
}
