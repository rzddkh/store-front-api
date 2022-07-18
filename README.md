# Store front back-end

## Table of Contents
+ [About](#about)
+ [Getting Started](#getting_started)
  + [Prerequisites](#prerequisites)
  + [Installing](#installing)
+ [Technologies Used](#technologies_used)
+ [API Requirements](#api_requirements)
+ [API Endpoints](#api_endpoints)
  + [Products Endpoints](#products_endpoints)
  + [Users Endpoints](#users_endpoints)
  + [Orders Endpoints](#orders_endpoints)
+ [Data Shapes](#data_shapes)

## About <a name = "about"></a>
A store front back end project built using Node.js, Express and Psql. TypeScript is the main language used in this project.

## Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites <a name = "prerequisites"></a>
* npm
```
npm install npm@latest -g
```
* .env

You need to create a .env file with following contents in store-front-api folder: 
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_DB_TEST=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
pepper=thisIsOurPepper*$&823*$%)_+
SALT_ROUND=11
TOKEN_SECRET=($%)S3CR3t*#TOk3n^
ENV=test
```
* docker

You need to have docker installed on your system.

* Database port:

  5432

* Server address:

  "0.0.0.0:3000" or http://localhost:3000

### Installing <a name = "installing"></a>

Step by step intallation guide to run and test the project.

1. Clone the repository: 
```
git clone https://github.com/rzddkh/store-front-api.git
```
2. Create the .env file inside the store-front-api folder and paste the information from prerequisites section
3. Install npm packages 
```
npm install
```
4. Create a container using docker-compose.yml file provided, it will make dev database for you:
```
docker-compose up
```
5. In a new terminal. Find the container ID:
```
docker ps 
```
6. Connect to the container:
```
docker exec -it [CONTAINER ID] bash
```
7. Connect to the dev database: 
```
psql  -U full_stack_user -d full_stack_dev
```
8. Check to see the relations with the following command in psql. It should say no relation found:
```
\dt
```
9. run the following command to create test database:
```
CREATE DATABASE full_stack_test;
```
10. To run the preconfigured tests first you need to set the ENV=test in the .env file. Then use the following command in store-front-api folder. You should see that the results are all passed: 
```
npm run test 
```
11. If you want to run the preconfigured test on dev database. First set the ENV=dev in the .env file. Then use the following command in store-front-api folder. You should see that the results are all passed: 
```
npm run test_dev_db
```
12. To start the server using ts-watch use the following command:
```
npm run watch
```
13. to compile ts to js run the following: 
```
npm run tsc 
```
14. to run the server with node as js file: 
```
cd dist
node server.js 
```
15. Feel free to test the endpoint with your prefered testing tool : such as Postman

End with an example of getting some data out of the system or using it for a little demo.

## Technologies used <a name = "technologies_used"></a>
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

# API Requirements <a name = "api_requirements"></a>
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints <a name = "api_endpoints"></a>

### Products   <a name = "products_endpoints"></a> 

- Index : '/products' [GET]
- Show  : '/products/:id' [GET] [id(product_id) must to be provided in the request's params]
- Create: '/addproduct' [POST]  [token required]  [product_name, price, category must be provided in the body of request]
- DELETE: '/deleteproduct/:id' [DELETE] [token required]  [id(product_id) must to be provided in the request's params]
- Top 5 most popular products : '/fivemostpopular' [GET]
- byCategory: '/byCategory' [GET] (request's body must supply category);

Description| Endpoint      | Type         | Requirements
:--------: | :--------:    | :----------: | :----------:
Index [gets all the products]     | '/products'   | [GET]        | -
Show  [get a product by its ID]    |'/products/:id'| [GET]        | [id (product_id) must to be provided in the request's params]
Create [add a product to database]    | '/addproduct' | [POST] | [token required] [product_name, price, category must be provided in the body of request]   
DELETE   [Delete a product from database] | '/deleteproduct/:id' | [DELETE]  | [token required] [id (product_id) must to be provided in the request's params]
Get top 5 most popular products|'/fivemostpopular'|[GET]|[-]
Get products by category|'/byCategory'|[GET]|[category must be provided in the body of the request]
---

### Users  <a name = "users_endpoints"></a>

- Index : '/users' [GET]  [token required]
- Show : '/users/:id' [GET] [token required][id(user_id) must to be provided in the request's params]
- Create : '/signup' [POST] [firstname, lastname, username, password must be provided in the body of request]
- Authenticate: '/authenticate' [POST]  [It is where token can be acquired if username and password are correct][username,password must be provided in body request]
- DELETE: '/deleteuser/:id' [DELETE]  [token required][id(user_id) must to be provided in the request's params]

Description| Endpoint      | Type         | Requirements
:--------: | :--------:    | :----------: | :----------:
Index [gets all the users]     | '/users'  | [GET]        | [token required]  [-]
Show  [get a user by its ID]  |'/users/:id'| [GET]        | [token required]  [id(user_id) must to be provided in the request's params]
Create [sign up a user]    | '/signup' | [POST] | [firstname, lastname, username, password must be provided in the body of request]
Authenticate [jwt can be acquired for registered users]|'/authenticate'|[POST]|[username and password must be provided in body request]
DELETE   [Delete a user from database] | '/deleteuser/:id' | [DELETE]  | [token required] [id (user_id) must to be provided in the request's params]the request's params]
---

### Orders  <a name = "orders_endpoints"></a>

- Active Orders by user  : '/activeorder/:id' [GET] [token required] [id(user_id) must to be provided in the request's params]
- Completed Orders by user : '/completedorder/:id' [GET]  [token required] [id(user_id) must to be provided in the request's params]
- Add a product to an order (cart) : '/addtoorder' [POST] [token required][order_id, product_id, quantity must be provided in the body of request]
- Get all products in an order (cart) : '/products_in_an_order/:id' [GET] [token requirded] [order_id must be provided in request's params]
- Remove a product from an order(cart) : '/removefromorder' [DELETE] [order_id, product_id must be provided in the body of request]
- Create :  '/createorder/:id' [POST] [token required] [id(user_id) must to be provided in the request's params]
- DELETE Order: '/deleteorder/:id' [DELETE] [token required][id(order_id) must be provided in request's params] [order must not have any product attached to it to be removed if a it has products, products needs to be removed with '/removefromorder' first]

Description| Endpoint      | Type         | Requirements
:--------: | :--------:    | :----------: | :----------:
Index [Getting active orders by user id]|'/activeorder/:id'|[GET]|[token required]  [id (user_id) must to be provided in the request's params]
Index [Getting completed orders by user id]|'/completedorder/:id'|[GET]|[token required]  [id (user_id) must to be provided in the request's params]
Create [Add a product to an order(cart)]|'/addtoorder'|[POST]|[token required] [order_id, product_id, quantity must be provided in the body of request]
Index [Get all products in an order (cart) by order's id]|'/products_in_an_order/:id'|[GET]|[token requirded] [order_id must be provided in request's params]
Delete [Remove a product from an order(cart)]| '/removefromorder' | [DELETE]  | [order_id, product_id must be provided in the body of request]
Create [Create an order]|'/createorder/:id'|[POST]|[token required]   [id(user_id) must to be provided in the request's params]
DELETE [Delete an order]|'/deleteorder/:id'|[DELETE]|[[token required]  [id(order_id) must be provided in request's params]   [order must not have any product attached to it. To remove it, products attached to it needs to be removed with '/removefromorder' first]

## Data Shapes <a name='data_shapes'>

#### Product 

Column     | Type       | Constraint          
:--------: |:--------:  | :----------:  
 id        | Integer    | Primary_key|
 name      |varchar     | NOT NULL
 price     |Integer     | NOT NULL
 category  |varchar(100)|NOT NULL

#### User

Column     |Type           | Constraint          
:--------: | :--------:    | :----------:  
 id        | Integer       | Primary_key|
 firstName |varchar        | NOT NULL
 lastName  |varchar        | NOT NULL
 userName  |varchar        |NOT NULL UNIQUE
 password  |text           |NOT NULL


#### Orders

Column     |Type           | Constraint          
:--------: | :--------:    | :----------:  
 id        | Integer       | Primary_key|
 user_id   |bigint         | REFERENCES users(id)
 status    |varchar(30)    | NOT NULL

#### Order_product

Column     |Type           | Constraint          
:--------: | :--------:    | :----------:  
 id        | Integer       | Primary_key|
 order_id  |bigint         | REFERENCES orders(id)   
 product_id|bigint         | REFERENCES products(id)
 quantity  |Integer        |NOT NULL


