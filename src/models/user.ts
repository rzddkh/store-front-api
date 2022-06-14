import client from "../../database";
// ts-ignore

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    passowrd: number
}

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
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get the user ${err}`)
        }
    }

    // creating a new user
    async create(firstName : string, lastName : string, userName : string, passowrd : string): Promise < User[] > {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users VALUES ($1,$2,$3,$4);'
            const result = await conn.query(sql, [firstName, lastName, userName, passowrd]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create new user: ${err}`)
        }
    }

};
