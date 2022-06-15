"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    async getActive(user_id, status) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2);';
            const result = await conn.query(sql, [user_id, status]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders. ${err}`);
        }
    }
    async getComplete(user_id, status) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2);';
            const result = await conn.query(sql, [user_id, status]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders. ${err}`);
        }
    }
    // add a product to an order
    async addProduct(order_id, product_id, quantity) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_product VALUES ($1,$2,$3);';
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Cannot add product ${product_id} to order ${order_id}: ${err}`);
        }
    }
}
exports.orderStore = orderStore;
