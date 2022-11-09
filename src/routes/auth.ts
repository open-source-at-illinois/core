import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import passportDiscord from 'passport-discord';
import refresh from 'passport-oauth2-refresh';

dotenv.config();
const authRouter = express.Router();

var scopes = ['identify'];
var prompt = 'consent';

const DiscordStrategy = new passportDiscord.Strategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID || '',
    clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:7000/auth/callback',
    scope: scopes,
  },
  (_accessToken, refreshToken, profile: any, done) => {
    profile.refreshToken = refreshToken;
    process.nextTick(() => done(null, profile));
  }
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));
passport.use(DiscordStrategy);
refresh.use(DiscordStrategy);

authRouter.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
  })
);
authRouter.use(passport.initialize());
authRouter.use(passport.session());
authRouter.get(
  '/',
  passport.authenticate('discord', { scope: scopes, prompt: prompt }),
  () => {}
);

authRouter.get(
  '/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  function (_req, res) {
    res.redirect('/auth/info');
  } // auth success
);

authRouter.get('/logout', function (req, res) {
  req.logout({}, () => {});
  res.redirect('/');
});

authRouter.get(
  '/info',
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
  },
  function (req, res) {
    //console.log(req.user)
    res.json(req.user);
  }
);

export default authRouter;
