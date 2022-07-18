import client from "../database";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
// ts-ignore

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    passowrd: number
}

dotenv.config();
const {pepper, SALT_ROUND} = process.env;

export class userStore { // getting all users
    async index(): Promise < User[] > {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM users`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }

    // getting specific user by their id
    async show(id : number): Promise < User[] > {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=$1';
            const sql1 = 'SELECT id as order_id, status from orders where user_id=$1 limit 5;'
            const res1 = await conn.query(sql, [id]);
            const res2 = await conn.query(sql1, [id]);
            conn.release();
            const result = [res1.rows[0], res2.rows];
            return result;
        } catch (err) {
            throw new Error(`Cannot get the user ${err}`)
        }
    }

    // creating a new user
    async create(firstName : string, lastName : string, userName : string, password : string): Promise < User[] > {


        const hash = bcrypt.hashSync(password + pepper, parseInt(SALT_ROUND as string));
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname , lastname , username , password) VALUES ($1,$2,$3,$4) RETURNING *;'
            const result = await conn.query(sql, [firstName, lastName, userName, hash]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create new user: ${err}`);
        }
    }
    // DELETE a user
    async delete(id : number): Promise < User[] > {
        try {
            const conn = await client.connect();
            const sql = 'DELETE from users WHERE id=$1 RETURNING *;'
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`cant delete the user: ${err}`);
        }
    }

    //authenticate a user
    async authenticate(userName : string, password : string): Promise < User | null > {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE username=($1);'
            const result = await conn.query(sql, [userName]);
            if (result.rows.length) {
                const user = result.rows[0]
                if (bcrypt.compareSync(password + pepper, user.password)) {
                    conn.release();
                    return user;
                }
            }
            conn.release();
            return null;
        } catch (err) {
            throw new Error(`Cannot Authenticate : ${err}`);
        }
    }

};
