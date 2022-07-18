import app from '../../server';
import supertest from 'supertest';
const request = supertest(app);

describe('Testing suite for product endpoints', () : void => { // adding a new user to the database
    const user = {
        "firstname": "John",
        "lastname": "Doe",
        "username": "JohnDoe",
        "password": "JDpassWord"
    }

    // new user credentials to be verified by endpoint
    const auth = {
        "username": "JohnDoe",
        "password": "JDpassWord"
    };

    // declaring header , token and user_id.
    // They need to be let in order to be mutable.
    let product_id: number;
    let user_id: number;
    let token: string;
    let header: {};

    const product = {
        "product_name": "ps5",
        "price": 499,
        "category": "entertainment"
    }
    
    // adding a user to test the user endpoints

    beforeAll(async () => {

        const user1=await request.post('/signup').send(user);
        // extracting token from '/authenticate' end point for newly added user
        const response = await request.post('/authenticate').send(auth);
        token = response.body["access token"];
        user_id = response.body.id;
        header = {
            Authorization: 'Bearer ' + token
        };
    });


    it("testing INDEX: '/products' endpoint", async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it("testing CREATE : '/addproduct' endpoint", async () => {
        const response = await request.post('/addproduct').send(product).set(header);
        expect(response.status).toEqual(200);
        expect(response.body.product_name).toBe('ps5');
        expect(response.body.price).toBe(499);
        expect(response.body.category).toBe('entertainment');
        product_id = response.body.id;
    });

    it("testing SHOW : '/products/:id endpoint", async () => {
        const response = await request.get(`/products/${product_id}`);
        expect(response.status).toEqual(200);
        expect(response.body.product_name).toBe('ps5');
        expect(response.body.price).toBe(499);
        expect(response.body.category).toBe('entertainment');
        expect(response.body.id).toBe(product_id);
    });

    it("testing DELETE : '/deleteproduct/:id' endpoint", async () => {
        const response = await request.delete(`/deleteproduct/${product_id}`).set(header);
        expect(response.status).toEqual(200);
        expect(response.body.product_name).toEqual('ps5');
    });

    it("testing ByCategory: '/bycategory' endpoint", async () => {
        const response = await request.get('/bycategory');
        expect(response.status).toEqual(200);
    })

    it("testing topFive: '/fivemostpopular' endpoint", async () => {
        const response = await request.get('/fivemostpopular');
        expect(response.status).toEqual(200);
    })
});
