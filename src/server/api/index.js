/* eslint-disable no-await-in-loop */
const { join } = require('path');
const { green } = require('chalk');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const {
  apiRouter,
  userRouter,
  gameRouter,
  sessionRouter,
} = require('./routes/index');
const db = require('../db/index');
const { app, server } = require('./socket');

const {
  models: { Session, User },
} = db;

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = join(__dirname, '../../../public');
const DIST_PATH = join(__dirname, '../../../dist');

app.use(cookieParser());

// assigns cookies
app.use(async (req, res, next) => {
  if (!req.cookies.session_id) {
    const session = await Session.create();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    res.cookie('session_id', session.id, {
      path: '/',
      expires: new Date(Date.now() + oneWeek),
    });
    req.session_id = session.id;
    next();
  } else {
    req.session_id = req.cookies.session_id;
    const user = await User.findOne({
      include: [
        {
          model: Session,
          where: { id: req.session_id },
        },
      ],
    });
    if (user) {
      req.user = user;
    }
    next();
  }
});

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));
app.use(express.static(join(__dirname, '../../client/assets')));
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter.router);
app.use('/user', userRouter.router);
app.use('/game', gameRouter.router);
app.use('/session', sessionRouter.router);

const startServer = () => new Promise((res) => {
  server.listen(PORT, () => {
    console.log(green(`server listening on port ${PORT}`));
    res();
  });
});

app.get('*', (req, res) => {
  res.sendFile(join(PUBLIC_PATH, './index.html'));
});

module.exports = {
  startServer,
  app,
};
