import mongoose from "mongoose";

export const connectToMongo = (MONGO_URI)=> {
    try {
        mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}, ()=> {
            console.log("Connected to mongoDB successfully!");
        });
    } catch (error) {
        console.log(`Mongoose error: ${error}`);
    }
}