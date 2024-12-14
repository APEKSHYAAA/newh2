import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// define shape of the User documents in the collection
const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    userType: {
        type: String,
        enum: ['Investor', 'Business'],
        required: true
    },
});

const User = model('User', userSchema);
export default User;