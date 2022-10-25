import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quotes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Quote"
        }
    ],
    createdAt: Number,
    updatedAt: Number
},{timestamps:true});

const User = mongoose.model("User",UserSchema);
export default User;