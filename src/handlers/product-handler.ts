import {productStore} from "../models/product";
import express, {Request, Response} from "express";

const store = new productStore;

// gets all products
const index = async (_req : Request, res : Response) => {
    const products = await store.index();
    res.json(products);
}

// get an specific product by id

const show = async (req : Request, res : Response) => {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
}

// add a new product to database
const create = async (req : Request, res : Response) => {
    const {product_name, price, category} = req.body;
    const product = await store.create(product_name, price, category);
    res.json(product);

}

const byCategory = async (req : Request, res : Response) => {
    const {category} = req.body;
    const products = await store.byCategory(category);
    res.json(products);
}

const topFive = async (req : Request, res : Response) => {
    const products= await store.topFive();
    res.json(products);

}
const product_routes = (app : express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/addproduct', create);
    app.get('/bycategory', byCategory);
    app.get('/fivemostpopular', topFive);
}


export default product_routes;
