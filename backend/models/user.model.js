import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    country: {
        type: String,
        default: '',
    },
    language: {
        type: String,
        default: 'en-US',
    },
    profilePic: {
        type: String,
        default: "",
    },
    // createdAt, updateAt => Member since <createdAt>
},
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;