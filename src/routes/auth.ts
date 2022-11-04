import express from 'express';
const authRouter = express.Router();

// middleware that is specific to this router
authRouter.use((_req, _res, next) => {
  console.log('Time: ', Date.now(), '/auth' + _req.url);
  next();
});

// define the home page route
authRouter.get('/', async (_req, _res) => {
  _res.send('hello');
});

export default authRouter;
