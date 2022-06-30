import {orderStore} from "../models/order";
import express, {Request, Response} from 'express';
import verifyAuthToken from '../utils/authenticateMiddleWare';

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
    res.send('Item is added to the order');
}

// create new active order for user
const create = async (req : Request, res : Response) => {
    const user_id = req.params.id;
    const order = await store.create(parseInt(user_id));
    res.json(order);
}

const remove_from_order = async (req : Request, res : Response) => {

}

const deleteOrder = async (req : Request, res : Response) => {

}


const order_routes = (app : express.Application) => {
    app.get('/activeorder/:id', verifyAuthToken, activeOrder);
    app.get('/completedorder/:id', verifyAuthToken, completedOrder);
    app.post('/addtoorder', verifyAuthToken, addToOrder);
    app.post('/createorder/:id', verifyAuthToken, create);
    app.delete('/removefromorder', verifyAuthToken, remove_from_order);
    app.delete('/deleteorder/:id', verifyAuthToken, deleteOrder);
}

export default order_routes;
