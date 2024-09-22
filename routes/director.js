import express from 'express';
import Director from '../models/Director.js';
import mongoose from 'mongoose';

const router = express.Router();

//adding new movie director
router.post('/', async (req, res) => {
    try {
        const director = new Director(req.body)
        const directorSave = await director.save()
        res.json(directorSave)
    } catch (err) {
        console.log(err, 'error while posting new director')
    }
})

//director update
router.put('/:director_id', async (req, res, next) => {
    const directorId = req.params.director_id;
    const director = await Director.findByIdAndUpdate(
        directorId,
        req.body,
        { new: true });

    if (!director)
        next({ message: 'no director like that', code: 89 })
    res.json(director);

})

//get all directors with their movies (join)
router.get('/', async (req, res, next) => {

    const allDirectors = await Director.aggregate(
        [
            {
                $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: 'director_id',
                    as: 'movies'
                }
            },
            {
                $unwind: {
                    path: "$movies",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        _id: "$_id",
                        title: "$title",
                        bio: "$bio",
                    },
                    movies: {
                        $push: "$movies"
                    }
                }
            },
            {
                $project: {
                    _id: "$_id._id",
                    title: "$_id.title",
                    bio: "$_id.bio",
                    movies: '$movies'
                }
            }
        ]);

    try {
        res.json(allDirectors)
    }
    catch (err) {
        console.log(err, 'error while fetching all directors')
    }
})


// get director's infos
router.get('/:director_id', async (req, res, next) => {
    // const objectId = new mongoose.Types.ObjectId()

    const singleDirector = await Director.aggregate(
        [
            {
                $match: {
                    '_id': new mongoose.Types.ObjectId(req.params.director_id)
                    // '_id': new mongoose.Types.ObjectId(req.params.director_id)

                }
            },
            {
                $lookup: {
                    from: 'movies',
                    localField: '_id',
                    foreignField: 'director_id',
                    as: 'movies'
                }
            },
            {
                $unwind: {
                    path: "$movies",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        _id: "$_id",
                        title: "$title",
                        bio: "$bio",
                    },
                    movies: {
                        $push: "$movies"
                    }
                }
            },
            {
                $project: {
                    _id: "$_id._id",
                    title: "$_id.title",
                    bio: "$_id.bio",
                    movies: '$movies'
                }
            }
        ]);

    try {
        res.json(singleDirector)
    }
    catch (err) {
        console.log(err, 'error while fetching all directors')
    }
    //     try {
    //         const directorId = req.params.director_id;
    //         const director = await Director.findById(directorId);
    //         if (!director)
    //             next({ message: 'cant find director with id' })
    //         res.json(director);
    //     }
    //     catch (err) {
    //         console.log(err, 'error with finding directors info')
    //     }
})

export default router