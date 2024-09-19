import express from 'express'
import Movie from '../models/Movie.js';

const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  // res.json(req.body);
  // const { title, category, country, year, imdb } = req.body
  const movie = new Movie(req.body)
  movie.save((err, data) => {
    if (err)
      res.json(err)
    res.json(data)
  });
  // // res.json()
  // res.json(data);

});

// module.exports = router;
export default router
