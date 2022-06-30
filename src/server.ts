import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import user_routes from './handlers/user-handler';
import product_routes from './handlers/product-handler';
import order_routes from './handlers/order-handler';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
});

app.get('/hel', function (_req: Request, res: Response) {
    res.send('Hello World!')
});

user_routes(app);
product_routes(app);
order_routes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;