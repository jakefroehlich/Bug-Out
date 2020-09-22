/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
const { Router } = require('express');
const {
  models: { Session },
} = require('../../db/index');
const GameSession = require('../../db/models/gameSession');

const sessionRouter = Router();

sessionRouter.get('/name', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    res.status(201).send(session.name);
  } catch (e) {
    console.log('Error updating name');
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

sessionRouter.put('/correct/:id', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    const correctAnswer = true;
    session.update({ correctAnswer });
    const { id } = req.params;
    const game = await GameSession.findOne({ where: { id }, include: [Session] });
    let correct = 0;
    let roundEnd = false;
    game.sessions.forEach((sesh) => {
      if (sesh.correctAnswer) {
        correct++;
      }
    });
    if (correct === game.sessions.length - 1 || correct === game.sessions.length) {
      roundEnd = true;
    }
    res.status(201).send(roundEnd);
  } catch (e) {
    console.log('Error updating correct answer');
    console.log(e);
  }
});

sessionRouter.put('/reset-correct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = GameSession.findOne({ where: { id }, include: [Session] });
    const correctAnswer = false;
    game.sessions.forEach((session) => {
      session.update({ correctAnswer });
    });
    res.send(game);
  } catch (e) {
    console.log('Error updating players correct values');
    console.log(e);
  }
});

module.exports = {
  path: '/session',
  router: sessionRouter,
};
