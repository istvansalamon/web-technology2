const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../entity/user');
const router = express.Router();

router.post('/auth/login', async (req, res) => {
    console.log("req.body", req.body);

    res.json({ status: "done" }); 
});


// Register route
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Ellenőrizd, hogy van-e már ilyen felhasználói név az adatbázisban
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('A felhasználónév már foglalt');
      }
  
      // Ha nem létezik, akkor mentés az adatbázisba
      const user = new User({ username, password });
      await user.save();
  
      res.status(201).send('Felhasználó regisztrálva');
    } catch (error) {
      res.status(500).send('Hiba történt a regisztráció során');
    }
  });

 //Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
