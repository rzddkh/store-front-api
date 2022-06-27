import {orderStore} from "../models/order";
import express, {Request, Response} from 'express';

const store = new orderStore;

const activeOrder = async (req : Request, res : Response) => {
    const user_id = req.params.id;
    const order = await store.getOrder(parseInt(user_id), 'active');
    res.json(order);

}

const completedOrder = async (req : Request, res : Response) => {
    const user_id = req.params.id;
    const order = await store.getOrder(parseInt(user_id), 'complete');
    res.json(order);
}

// Add a new product to an exisiting order
const addToOrder = async (req : Request, res : Response) => {
    const {order_id, product_id, quantity} = req.body;
    const order = await store.addToOrder(order_id, product_id, quantity);
    res.json(order);
}

// create new active order for user
const create = async (req : Request, res : Response) => {
    const user_id = req.params.id;
    const order = await store.create(parseInt(user_id));
    res.json(order);
}

const order_routes = (app : express.Application) => {
    app.get('/activeorder/:id', activeOrder);
    app.get('/completedorder/:id', completedOrder);
    app.post('/addtoorder', addToOrder);
    app.post('/createorder/:id', create);
}

export default order_routes;
