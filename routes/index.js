import express from 'express'
import User from '../models/User.js';
const router = express.Router();
import bcrypt from 'bcrypt'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  try {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, async (err, hash) => {
      // Store hash in your password DB.
      const user = new User({
        username,
        password: hash
      })

      const userInfo = await user.save();
      res.json(userInfo);
    });
  }
  catch (err) {
    res.json(err)
  }

});


export default router