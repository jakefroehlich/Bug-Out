/* eslint-disable no-await-in-loop */
const { join } = require('path');
const { green } = require('chalk');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const {
  apiRouter,
  userRouter,
  gameRouter
  // TODO: userRouter,
  // TODO: gameRouter,
} = require('./routes/index');
const db = require('../db/index');
const { app, server } = require('./socket');

const { models: { Session, User, GameSession } } = db;

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = join(__dirname, '../../../public');
const DIST_PATH = join(__dirname, '../../../dist');

app.use(cookieParser());


const codeGenerator = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// assigns cookies
app.use(async (req, res, next) => {
  if (!req.cookies.session_id) {
    const session = await Session.create();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    res.cookie('session_id', session.id, {
      path: '/',
      expires: new Date(Date.now() + oneWeek),
    })
    req.session_id = session.id;
    next()
  } else {
    req.session_id = req.cookies.session_id;
    const user = await User.findOne({
      include: [
        {
          model: Session,
          where: { id: req.session_id, }
        },
      ],
    });
    if (user) {
      req.user = user
    }
    next()
  }
});

// assign games if they don't have
app.use(async (req, res, next) => {
  const session = await Session.findOne({ where: { id: req.session_id } })
  // console.log(session.gameSessionId)
  if (!session && req.cookies.session_id) {
    const newSession = await Session.create({ id: req.cookies.session_id });
    req.session_id = newSession.id;
    next()
  }
  else if (!session.gameSessionId) {
    let newCode = codeGenerator()
    console.log(newCode)
    let check = await GameSession.findOne({ where: { code: newCode } });
    while (check) {
      newCode = codeGenerator();
      check = await GameSession.findOne({ where: { code: newCode } });
    }
    const newGame = await GameSession.create({ code: newCode });
    await Session.update({ gameSessionId: newGame.id }, { where: { id: session.id } });
    // console.log(newGame);
    next()
  }
  next()
});

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));
// app.use(cors())
app.use(express.json());
app.use('/api', apiRouter.router);
app.use('/user', userRouter.router);
app.use('/game', gameRouter.router);

const startServer = () => new Promise((res) => {
  server.listen(PORT, () => {
    console.log(green(`server listening on port ${PORT}`))
    res()
  })
})

app.get('*', (req, res) => {
  res.sendFile(join(PUBLIC_PATH, './index.html'));
});

module.exports = {
  startServer,
  app
}
