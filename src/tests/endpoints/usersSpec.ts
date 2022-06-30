import app from '../../server';
import supertest from 'supertest';
const request = supertest(app);


// user end point testing suite
describe('Testing suite for user endpoints \n', () => { // new user to be added for the test
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
    });


    it("testing INDEX : '/users' endpoint", async () => {
        const response = await request.get('/users').set(header);
        expect(response.status).toEqual(200);
    });

    it("testing SHOW : '/users/id' endpoint", async () => {
        const response = await request.get(`/users/${user_id}`).set(header);

        expect(response.status).toEqual(200);
        expect(response.body[0].id).toBe(user_id);
        expect(response.body[0].firstname).toBe('John');
        expect(response.body[0].lastname).toBe('Doe');
        expect(response.body[0].username).toBe('JohnDoe');
    });

    //testing create end point by adding a user and removing it at DELETE endpoint test
    it("testing CREATE : '/signup' endpoint", async () => {
        const user1 = {
            "firstname": "fname",
            "lastname": "lname",
            "username": "fl_username",
            "password": "passWord"
        }
        const response = await request.post('/signup').send(user1);

        expect(response.status).toEqual(200);
        expect(response.body["firstname"]).toBe('fname');
        expect(response.body["lastname"]).toBe('lname');
        expect(response.body["username"]).toBe('fl_username');
    })

    it("testing '/authenticate' endpoint", async () => {
        const response = await request.post('/authenticate').send({"username": "fl_username", "password": "passWord"});
        expect(response.status).toEqual(200);
    })

    it("testing DELETE : '/deleteuser/:id' ", async () => {
        const response = await request.post('/authenticate').send({"username": "fl_username", "password": "passWord"});
        const id = response.body.id;
        const response2 = await request.post(`/deleteuser/${
            id
        }`).set(header);
        expect(response2.status).toEqual(200);
        expect(response2.text).toBe(`user with user_id : ${id} is deleted.`);
    })
    // after doing the test deleteing the added user from database
    afterAll(async () => {
        await request.post(`/deleteuser/${
            user_id
        }`).set(header);

    })

});
