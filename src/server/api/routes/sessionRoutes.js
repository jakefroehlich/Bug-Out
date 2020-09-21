/* eslint-disable no-await-in-loop */
const { Router } = require('express');
const {
  models: { Session },
} = require('../../db/index');

const sessionRouter = Router();

sessionRouter.get('/current', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    res.status(201).send(session);
  } catch (e) {
    console.log('Error getting session');
    console.log(e);
  }
});

// updates name of the session
sessionRouter.put('/updateName', async (req, res) => {
  try {
    const { name } = req.body;
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ name });
    res.status(201).send();
  } catch (e) {
    console.log('Error updating name');
    console.log(e);
  }
});

sessionRouter.post('/makeHost', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ host: true });
    res.status(201).send(session);
  } catch (e) {
    console.log('Error making host');
    console.log(e);
  }
});

sessionRouter.put('/score', async (req, res) => {
  try {
    const { score } = req.body;
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ score });
    res.status(201).send(session);
  } catch (e) {
    console.log('Error updating score');
    console.log(e);
  }
});
// sessionRouter.get('/roomPlayers', async (req, res) => {
//   try {
//     const session = await Session.findOne({ where: { gameSessionId: req.session_id }});

//   }
// })

module.exports = {
  path: '/session',
  router: sessionRouter,
};
