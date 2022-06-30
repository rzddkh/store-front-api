import {productStore} from "../models/product";
import express, {Request, Response} from "express";
import verifyAuthToken from '../utils/authenticateMiddleWare';

const store = new productStore;

// gets all products
const index = async (_req : Request, res : Response) => {
    try {

        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

// get an specific product by id

const show = async (req : Request, res : Response) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

// add a new product to database
const create = async (req : Request, res : Response) => {
    try {
        const {product_name, price, category} = req.body;
        const product = await store.create(product_name, price, category);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

// deleting a product form products table

const deleteProd = async (req : Request, res : Response) => {
    try {
        const product_id = parseInt(req.params.id);
        const product = await store.deleteProd(product_id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const byCategory = async (req : Request, res : Response) => {
    try {
        const {category} = req.body;
        const products = await store.byCategory(category);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const topFive = async (req : Request, res : Response) => {
    try {
        const products = await store.topFive();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}
const product_routes = (app : express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/addproduct', verifyAuthToken, create);
    app.get('/bycategory', byCategory);
    app.get('/fivemostpopular', topFive);
    app.post('/deleteproduct/:id', verifyAuthToken, deleteProd);
}


export default product_routes;
