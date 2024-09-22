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

// deleting selected movie
router.delete('/:movie_id', async (req, res) => {

  const movie_id = req.params.movie_id
  const findedMovie = await Movie.findByIdAndDelete(
    movie_id,
    req.body,
    {
      new: true
    })
  try {

    if (!findedMovie)
      next({ message: 'movie isnt founded', code: 99 })
    res.json('findedMovie')
  } catch (err) {
    console.log(err, 'error for movie isnt founded')
  }
})

// getting top10 movies
router.get('/top10', async (req, res) => {

  const movie_id = req.params.movie_id
  const findedMovies = await Movie.find({}).limit(10).sort({ imdb: -1 })
  try {

    if (!findedMovies)
      next({ message: 'movie isnt founded', code: 99 })
    res.json(findedMovies)
  } catch (err) {
    console.log(err, 'error for movie isnt founded')
  }
})

// between years
router.get('/between/:start_year/:end_year', async (req, res) => {

  const { start_year, end_year } = req.params;

  const findedMovies = await Movie.find(
    {
      year: { '$gte': parseInt(start_year), '$lte': parseInt(end_year) }
    }
  )
  try {

    if (!findedMovies)
      next({ message: 'movie isnt founded', code: 99 })
    res.json(findedMovies)
  } catch (err) {
    console.log(err, 'error for movie isnt founded')
  }
})


// getting all movies
router.get('/', async (req, res) => {
  try {
    const allMovies = await Movie.aggregate([
      {
        $lookup: {
          from: 'directors',
          localField: 'director_id',
          foreignField: '_id',
          as: 'director'
        }
      },
      {
        $unwind: "$director"
      }
    ]);
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


