import app from "../../server";
import supertest from "supertest";
const request = supertest(app);


describe('Testing suite for order endpoints \n', () => {

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
    let user_id: number;
    let token: string;
    let header: {};
    let order_id: number;
    let product_id: number;
    let product2_id: number;
    // adding a user to test the user endpoints
    beforeAll(async () => {

        await request.post('/signup').send(user);
        // extracting token from '/authenticate' end point for newly added user
        const response = await request.post('/authenticate').send(auth);
        token = response.body["access token"];
        user_id = response.body.id;
        header = {
            Authorization: 'Bearer ' + token
        };


        // add a product to products table to be used in orders and order_product table
        const product = {
            "product_name": "ps5",
            "price": 499,
            "category": "entertainment"
        }
        // adding a second product to products table to be used in orders and order_product table so we can test our cart

        const product2 = {
            "product_name": "ps5 controller",
            "price": 99,
            "category": "entertainment"
        }

        const response2 = await request.post('/addproduct').send(product).set(header);
        product_id = parseInt(response2.body.id);

        const response3 = await request.post('/addproduct').send(product2).set(header);
        product2_id = parseInt(response3.body.id);
    });


    // first we create an active order
    it("testing create an order : '/createorder/:id' endpoint", async () => {
        const response = await request.post(`/createorder/${user_id}`).set(header);
        expect(response.status).toEqual(200);
        order_id = parseInt(response.body.id);
    });

    // getting active orders
    it("testing '/activeorder/:id' endpoint ", async () => {
        const response = await request.get(`/activeorder/${user_id}`).set(header);
        expect(response.status).toEqual(200);

    });

    // getting completed orders
    it("testing '/completedorder/:id' endpoint", async () => {
        const response = await request.get(`/completedorder/${user_id}`).set(header);
        expect(response.status).toEqual(200);
    });

    // adding a product to that an order (cart)
    it("testing adding a product to an order : '/addtoorder' endpoint ", async () => {
        const response = await request.post('/addtoorder').send({order_id: order_id, product_id: product_id, quantity: 1}).set(header);
        expect(response.status).toEqual(200);
        expect(parseInt(response.body.order_id)).toBe(order_id);
        expect(parseInt(response.body.product_id)).toBe(product_id);

    });


    // getting all products in an order(cart)
    it("testing getting all products in an order (cart) '/products_in_an_order/:id' endpoint", async () => { // first we add our second product to our order
        const response1 = await request.post('/addtoorder').send({order_id: order_id, product_id: product2_id, quantity: 1}).set(header);
        // console.error(response1.body,"hello")
        expect(response1.status).toBe(200);
        const response = await request.get(`/products_in_an_order/${order_id}`).set(header);
        expect(response.status).toEqual(200);
        console.error(response.body, "products in an order(cart)");
        // removing the second item from the order so we can delete the order at next test
        await request.delete('/removefromorder').send({order_id: order_id, product_id: product2_id}).set(header);
    })

    // removing the product from an order (cart)
    it("testing removing a product from an order '/removefromorder' endpoint", async () => {
        const response = await request.delete('/removefromorder').send({order_id: order_id, product_id: product_id}).set(header);
        expect(response.status).toEqual(200);
        expect(parseInt(response.body.order_id)).toBe(order_id);
        expect(parseInt(response.body.product_id)).toBe(product_id);
    });

    // delete the order
    it("testing delete an order : '/deleteorder/:id endpoint", async () => {
        console.error(order_id);
        const response = await request.delete(`/deleteorder/${order_id}`).set(header);
        expect(response.status).toEqual(200);
    });
});
