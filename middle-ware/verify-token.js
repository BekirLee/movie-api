import jwt from "jsonwebtoken";
import { api_secret_key } from "../config.js";

export default (req, res, next) => {
    const token = req.headers['x-acces-token'] || req.body.token || req.query.token;
    if (token) {
        jwt.verify(token, api_secret_key, (err, decoded) => {
            if (!err) {
                req.decode = decoded;
                next()
            }
            else {
                res.json({
                    status: false,
                    message: "undecoded token!",
                })
            }
        })
    }
    else {
        res.json({
            status: false,
            message: 'No token!'
        })
    }

}