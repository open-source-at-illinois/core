import express from 'express';
import Event from '../models/event';
import { sortEventsChronologically, toMaskedEvent } from '../utils';
const router = express.Router();

// middleware that is specific to this router
router.use((_req, _res, next) => {
  console.log('Time: ', Date.now(), '/events' + _req.url);
  next();
});

// define the home page route
router.get('/', async (_req, res) => {
  let isActive: any|undefined = _req.query.active;
    
  let events;
 
  if(isActive !== undefined) {
    events = await Event.find({
      active: (isActive.toLowerCase() === 'true'),
    })
  } else {
    events = await Event.find({});
  }

  res.send(events.map(toMaskedEvent));
});

router.get('/latest', async (_req, res) => {
  const events = await Event.find({
    active: true,
  });
  /* A type that is defined in the `utils.ts` file. */
  const sortedEvents = events
    .map(toMaskedEvent)
    .sort(sortEventsChronologically);

  res.send(sortedEvents[0]);
});

export default router;
