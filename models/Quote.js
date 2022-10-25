import mongoose from "mongoose";
const {Schema} = mongoose;

const QuoteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number
},{timestamps: true});

const Quote = mongoose.model("Quote",QuoteSchema);
export default Quote;