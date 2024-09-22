// models/Movie.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  //   director_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  category: String,
  country: String,
  year: Number,
  imdb: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
