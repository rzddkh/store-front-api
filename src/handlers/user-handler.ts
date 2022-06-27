import {userStore} from "../models/user";
import express, {Request, Response} from 'express';

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
const user_routes = (app : express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/adduser', create);
}
export default user_routes;
