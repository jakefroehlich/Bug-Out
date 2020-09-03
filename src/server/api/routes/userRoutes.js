const { Router } = require('express');
const bcrypt = require('bcrypt');
const { models:{ User, Session } }= require('../../db/index');

const apiRouter = Router();

apiRouter.post('/login', async (req, res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email
    }
  })
  if(!user){
    res.sendStatus(401);
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match){
      const usersSession = await Session.findByPk(req.session_id)
      await usersSession.setUser(user)
      res.status(200).send(user);
    } else {
      res.sendStatus(401)
    }
  }
})

apiRouter.get('/whoami', (req, res) => {
  if (req.user) {
    res.send({
      email: req.user.email,
      role: req.user.role,
      loggedIn: true,
    });
  } else {
    res.send({
      email: null,
      role: 'guest',
      loggedIn: false,
    });
  }
});

// create a user
apiRouter.post("/create", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const createdUser = await User.create({ email, name, password });
    res.status(201).send(createdUser)
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
})

// add name to seesion for guest users 
apiRouter.put("/guest-session", async (req, res) => {
  try {
    const { name } = req.body;
    await Session.update({name}, {where : {id: req.session_id}})
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
})

// adds users to a game session
apiRouter.put("/session/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const { gameSessionId } = req.body;
    await Session.update({gameSessionId}, {where : {id}})
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
})

// add stats to the user's profile after the game
apiRouter.put("/user/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const { score, winner } = req.body;
    if (req.user.highScore<score && winner){
      await User.update({highScore:score, gamesPlayed: req.user.gamesPlayed+=1, gamesWon: req.user.gamesWon+=1}, {where : {id}})
    } else if (req.user.highScore<score ) {
      await User.update({highScore:score, gamesPlayed: req.user.gamesPlayed+=1}, {where : {id}})
    } else {
      await User.update({gamesPlayed: req.user.gamesPlayed+=1}, {where : {id}})
    }
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
})

module.exports={
  path: '/user',
  router: apiRouter
}