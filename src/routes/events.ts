import express from 'express';
import Event from '../models/event';
import { toMaskedEvent } from '../utils';
const router = express.Router();

// middleware that is specific to this router
router.use((_req, _res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', async (_req, res) => {
  const events = await Event.find({});
  res.send(events.map(toMaskedEvent));
});

export default router;
