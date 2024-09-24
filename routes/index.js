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

router.post('/authenticate', (req, res, next) => {
  try {
    const { username, password } = req.body;

    User.findOne(
      { username }, async function (err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          res.json({
            status: false,
            message: "cant find user"
          })
        }
        else {
          bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
              res.json({
                message: 'error in result',
                status: false
              })
            }
            else {
              const payload = { username };
              const token = jwt.sign(payload, api_secret_key, { expiresIn: '12h' })
              res.json({
                status: true,
                token
              })
            }
          })
        }
      }
    )
  }

  catch (err) {
    res.json(err)
  }
});


export default router