import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Movie= new Schema({

    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb: Number,
    date: {
        type: Date,
        default: Date.now
    }
})

export default Movie