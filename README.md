## Bug Out

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://bugoutbrx.herokuapp.com/)

### Welcome to the Fray
Sup Brx! The online competitve coding challenge you didn't know you were waiting for is finally here. Grab some friends, run - don't walk - to your computers, and get ready to Bug. Out. 


### Gameplay
You are in a race against the clock and against your competition to solve the coding prompt given. Make sure you aren't the last to finish...

Use powerups against the competition to slow them down in the race to complete coding problems. Don't worry, they WILL return the favor. 


### The Stack
Bug Out is built upon the shoulders of giants, namely those in the PERN stack: PostgreSQL, Express, React, and Node.js. We threw in Redux for state management and Socket.io for client-server communication, and the whole lot of them kept things spicy.


### Go ahead, dig in!
If you wanna check out our code base, have at it, brx!

We used Node.js with NPM and PostgreSQL as part of our stack, and we recommend you use the same. 

In your command line, install all dependencies by running

```js
npm i
```

Once that is locked and loaded, you'll want to create a database, which you take take care of quickly and easily by running the following in your terminal:

```js
createdb BugOut
```

Sweet! Now let's get you set up with that good good data. Run the following to seed your newly created database:

```js
npm run seed
```

That will sync and seed your database. Now you're ready for launch. You excited? We are. Run

```js
npm run start:dev
```

head to `http://localhost:3000`, and you'll be in business.

Go forth and conquer.
