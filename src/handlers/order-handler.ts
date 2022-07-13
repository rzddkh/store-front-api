import {orderStore} from "../models/order";
import express, {Request, Response} from 'express';
import verifyAuthToken from '../utils/authenticateMiddleWare';

const store = new orderStore;

const activeOrder = async (req : Request, res : Response) => {
    try {
        const user_id = req.params.id;
        const order = await store.getOrder(parseInt(user_id), 'active');
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const completedOrder = async (req : Request, res : Response) => {
    try {
        const user_id = req.params.id;
        const order = await store.getOrder(parseInt(user_id), 'complete');
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

// Add a new product to an exisiting order
const addToOrder = async (req : Request, res : Response) => {
    try {
        const {order_id, product_id, quantity} = req.body;
        const order = await store.addToOrder(order_id, product_id, quantity);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

// create new active order for user
const create = async (req : Request, res : Response) => {
    try {
        const user_id = req.params.id;
        const order = await store.create(parseInt(user_id));
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const products_in_order = async (req : Request, res : Response) => {
    try {
        const order_id = req.params.id;
        const products = await store.products_in_order(parseInt(order_id));
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const remove_from_order = async (req : Request, res : Response) => {
    try {
        const {order_id, product_id} = req.body;
        const removed = await store.removeFromOrder(order_id, product_id);
        res.json(removed);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const deleteOrder = async (req : Request, res : Response) => {
    try {
        const order_id = parseInt(req.params.id);
        const deleted = await store.deleteOrder(order_id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}


const order_routes = (app : express.Application) => {
    app.get('/activeorder/:id', verifyAuthToken, activeOrder);
    app.get('/completedorder/:id', verifyAuthToken, completedOrder);
    app.post('/addtoorder', verifyAuthToken, addToOrder);
    app.post('/createorder/:id', verifyAuthToken, create);
    app.get('/products_in_an_order/:id', verifyAuthToken, products_in_order);
    app.delete('/removefromorder', verifyAuthToken, remove_from_order);
    app.delete('/deleteorder/:id', verifyAuthToken, deleteOrder);
}

export default order_routes;
