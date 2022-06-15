"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
    async create(product_name, price, category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products VALUS ($1,$2,$3);';
            const result = await conn.query(sql, [product_name, price, category]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
    async topFive() { }
    async byCategory() { }
}
exports.productStore = productStore;
