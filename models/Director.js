// models/Movie.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  //   director_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model('director', DirectorSchema);
export default Movie;
