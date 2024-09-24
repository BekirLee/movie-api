import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { api_secret_key } from '../config.js';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // username ve password kontrolü
    if (!username || !password) {
      return res.json({ message: 'Username and password are required' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hash
    });

    const userInfo = await user.save();
    res.json(userInfo);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post('/authenticate', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Can't find user",
        status: false,
        code: 99
      });
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.json({
        message: 'Incorrect password',
        status: false
      });
    }

    const payload = { username };
    const token = jwt.sign(payload, api_secret_key, { expiresIn: '12h' });

    res.json({
      status: true,
      token
    });
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
});



export default router