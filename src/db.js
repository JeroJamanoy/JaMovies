import mongoose from "mongoose";


export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost/JaMovies')
        console.log('DB is connected')
    }catch(error){
        console.log('DB connection error', error)
    }
}