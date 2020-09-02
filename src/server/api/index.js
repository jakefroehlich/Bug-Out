const path = require('path');
const chalk = require('chalk');
<<<<<<< HEAD:server/api/index.js
const {app, server} = require('./socket');
const routes = require('./routes/index');
const express = require('express');
=======
const express= require('express');
>>>>>>> 69a4be768f4eede86bb32219a96179faeaabd4cd:src/server/api/index.js
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app =require('./server');
const routes=require('./routes/index');
const { models: { Session, User } } = require('../db/index');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH = path.join(__dirname, '../../dist');

app.use(cookieParser());

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

app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));
app.use(cors())
app.use(express.json());

const startServer = () => new Promise((res) => {
  server.listen(PORT, () => {
    console.log(chalk.green(`server listening on port ${PORT}`))
    res()
  })
})

<<<<<<< HEAD:server/api/index.js
routes.forEach(({ path, router }) => {
=======
// eslint-disable-next-line no-shadow
routes.forEach(({path, router})=>{
>>>>>>> 69a4be768f4eede86bb32219a96179faeaabd4cd:src/server/api/index.js
  app.use(path, router);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, './index.html'));
});

module.exports = {
  startServer,
  app
}