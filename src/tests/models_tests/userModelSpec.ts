// @ts-nocheck
import {userStore} from "../../models/user";

const store = new userStore();

describe('Testing suite for user model methods', () => { // using let in order to make variable mutable
    let user_id: number;

    it('creating a new user', async () => {
        const res = await store.create('David', 'Beckham', 'David_Beckham', 'Password!');
        expect(res.firstname).toEqual('David');
        user_id = parseInt(res.id);
    });

    it('authenticate a user', async () => {
        const res = await store.authenticate('David_Beckham', 'Password!');
        expect(res ?. firstname).toEqual('David');
    });

    it('getting specific user by their id', async () => {
        const res = await store.show(user_id);
        expect(res[0].lastname).toEqual('Beckham');
    });
    it('get all users', async () => {
        const res = await store.index();
        expect(res.length).toEqual(1);
    });
    it('Delete a user', async () => {
        const res = await store.delete(user_id);
    })
});
