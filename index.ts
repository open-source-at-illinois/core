import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import eventsRouter from './src/routes/events';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
app.use(
  cors({
    origin: '*',
  })
);

const mongoConnectOptions: mongoose.ConnectOptions = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  heartbeatFrequencyMS: 10000,
};

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined!');
}

mongoose
  .connect(MONGO_URI, mongoConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const healthHandler = (_: Request, res: Response) => res.send("I'm alive!");
app.get('/', healthHandler);
app.get('/health', healthHandler);

app.use('/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`OSAI Core running on port: ${PORT}`);
});
