import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import { notFound, errorHandler } from './middelware/errorMiddelware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRouters.js';
import orderRoutes from './routes/orderRoutes.js';
import Order from './models/orderModel.js';
const app = express();
app.use(express.json());

dotenv.config();

connectDB();

app.get('/', (req, res) => {
  res.send('API is running ..');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
