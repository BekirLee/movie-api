// routes/movie.js
import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// updating movies
router.put('/:movie_id', async (req, res) => {

  const movie_id = req.params.movie_id
  const findedMovie = await Movie.findByIdAndUpdate(
    movie_id,
    req.body,
    {
      new: true
    })
  try {

    if (!findedMovie)
      next({ message: 'movie isnt founded', code: 99 })
    res.json(findedMovie)
  } catch (err) {
    console.log(err, 'error for movie isnt founded')
  }
})

// getting all movies
router.get('/', async (req, res) => {
  try {

    const allMovies = await Movie.find({});
    res.json(allMovies);
  }
  catch (err) {
    console.log(err, 'cant get movies')
  }
})


// getting movie by id
router.get('/:movie_id', async (req, res, next) => {
  const movie_id = req.params.movie_id
  const findedMovie = await Movie.findById(movie_id);
  try {

    if (!findedMovie)
      next({ message: "there's no movie like that", code: 99 })
    res.json(findedMovie);
  }
  catch (err) {
    // res.json(er, 'cant find movie by id')
    console.log('noo')
  }
})


// adding movie
router.post('/', async (req, res) => {
  // const { title, category, country, year, imdb} = req.body;

  try {
    const movie = new Movie(req.body);

    const savedMovie = await movie.save();
    res.json('status: 1')
    // res.pos(savedMovie)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


