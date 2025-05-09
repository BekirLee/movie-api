// models/Movie.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  director_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: [true,"`{PATH}` mutleq title olmalidir!!!"],
    maxlength:[30,"`{PATH}` alaninda `{VALUE}` `{MAXLENGTH}` dan az olmalidi"],
    minlength:[2,"`{PATH}` alaninda `{VALUE}` `{MINLENGTH}` cox olmalidi"],
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
