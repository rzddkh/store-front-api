import app from '../../server';
import supertest from 'supertest';
const request = supertest(app);

describe('Testing suite for product endpoints', () : void => { //
    const product = {
        "product_name": "ps5",
        "price": 499,
        "category": "entertainment"
    }

    it('\n gets all products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it("testing CREATE : '/addproduct' endpoint", async () => {
        const response = await request.post('/addproduct').send(product);
        console.error(response.body);
    })

    it("testing DELET")
})
