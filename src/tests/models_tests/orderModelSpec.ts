//@ts-nocheck
import {orderStore} from "../../models/order";
import {userStore} from "../../models/user";
import { productStore } from "../../models/product";

const storeOrder = new orderStore();
const storeUser = new userStore();
const storeProduct = new productStore();

describe('Testing suite for order model methods', () => {

    //using let to make variables mutable 
    let user_id: number;
    let order_id:number;
    let product_id:number;
  
    it('creating an order for a user by user_id', async () => { // creat a new user
        const user = await storeUser.create('William', 'Shakespeare', 'Will_Shakes_1564', 'Bard0FAvon!$#');
        user_id=parseInt(user.id);

        const res = await storeOrder.create(user_id);
        order_id=parseInt(res.id);
        expect(parseInt(res.user_id)).toEqual(user_id);
        expect(res.status).toEqual('active');
       
    });
    it('adding a product to an order by order_id and product_id',async()=>{
        //adding a product to products
        const product= await storeProduct.create('Pencil',1,'education');
        product_id=parseInt(product.id);
        const res= await storeOrder.addToOrder(order_id,product_id,99);
        expect(parseInt(res.product_id)).toEqual(product_id);
        expect(res.quantity).toEqual(99);
    });
    
    it('looking up products in an order/cart by order_id',async()=>{
        const res= await storeOrder.products_in_order(order_id);
        expect(res.length).toBeGreaterThan(0);
        
    });

    it('getting orders by status and user_id',async()=>{
        const res= await storeOrder.getOrder(user_id,'active');
        expect(res.length).toBeGreaterThan(0);
    });
    it('remove a product from an order by product_id & order_id',async()=>{
        const res=await storeOrder.removeFromOrder(order_id,product_id);
        expect(res.quantity).toEqual(99);
    });
    it('deleting an order by order_id',async()=>{
        const res= await storeOrder.deleteOrder(order_id);
        expect(res.status).toEqual('active');
        //delete the added user
        const user= await storeUser.delete(user_id);
        //delete the added products from products table
        const product = await storeProduct.deleteProd(product_id);

    });


})
