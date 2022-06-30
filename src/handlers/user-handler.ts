// @ts-nocheck
// @ts-ignore
import {userStore} from "../models/user";
import express, {Request, Response} from 'express';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import verifyAuthToken from '../utils/authenticateMiddleWare';

dotenv.config();

const store = new userStore;

const index = async (_req : Request, res : Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req : Request, res : Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await store.show(id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}
const create = async (req : Request, res : Response) => {
    try {

        const {firstname, lastname, username, password} = req.body;
        const createUser = await store.create(firstname, lastname, username, password);
        res.json(createUser);

    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const deleteUser = async (req : Request, res : Response) => {
    try {
        const id = req.params.id;
        await store.delete(id);
        res.send(`user with user_id : ${id} is deleted.`);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const authenticate = async (req : Request, res : Response) => {
    try {

        const {TOKEN_SECRET} = process.env;
        const {username, password} = req.body;

        // here check for password
        const authen = await store.authenticate(username, password);
        // if password is correct it generates a token
        if (authen) {
            const token = jwt.sign(authen, TOKEN_SECRET);
            const id = parseInt(authen.id);
            res.json({"access token": token, "id": id});
        } else {
            res.send('Invalid username or password! Cannot Generate Token!')
        }


    } catch (err) {
        res.status(400);
        res.json(err);
    }

}
const user_routes = (app : express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/signup', create);
    app.post('/authenticate', authenticate);
    app.post('/deleteuser/:id', verifyAuthToken, deleteUser);
}
export default user_routes;
