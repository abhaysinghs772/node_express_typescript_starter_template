import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

dotenv.config();

/* ROUTES */
import { authRoute } from './routes/index';

/* APP */
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authRoute);

/* mongoDB connection */
// chnage this string to your own db's connection string
const uri = `mongodb+srv://${process.env.MONGO_USERID}:${process.env.MONGO_PASSWORD}@cluster0.ljrgvuv.mongodb.net/<your_db_name>?retryWrites=true&w=majority`;
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

app.listen(3000, async () => {
  await connectDB();
  console.log(`server is up and running on port 3000`);
});
