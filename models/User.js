import mongoose from "mongoose"
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "`{PATH}` is , `{VALUE}` must be greater than `{MINLENGTH}`"]
    }
})

const User = mongoose.model('users', UserSchema)

export default User