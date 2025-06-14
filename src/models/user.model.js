import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    number_phone:{
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema);