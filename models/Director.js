// models/Movie.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  //   director_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    maxlength: 60,
    minlength: 2
  },
  bio: {
    type: String,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Director = mongoose.model('director', DirectorSchema);
export default Director;
