// @ts-nocheck
import {productStore} from "../../models/product";

const store = new productStore();

describe('Testing suite for product model methods', () => {
    let product_id: number;
    it('create a product / add a product to products', async () => {
        const res = await store.create('xbox', 300, 'entertainment');
        expect(res.product_name).toEqual('xbox');
        product_id = res.id;
    });
    it('getting specific product by its id', async () => {
        const res = await store.show(product_id);
        expect(res.product_name).toEqual('xbox');
    });

    it('getting all products', async () => {
        const res = await store.index();
        expect(res.length).toBeGreaterThan(0);

    });
    it('getting 5 most popular products method', async () => {
        const res = await store.topFive();
        expect(res.length).toBeGreaterThanOrEqual(0);
    });
    it('getting products by their category', async () => {
        const res = await store.byCategory('entertainment');
        expect(res.length).toBeGreaterThan(0);

    });
    it('delete a products', async () => {
        const res = await store.deleteProd(product_id);
        expect(res.product_name).toEqual('xbox');

    });


})
