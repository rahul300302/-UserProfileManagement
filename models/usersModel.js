import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    department: { type: String },
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now }
});
 
export default mongoose.model('user_data', userSchema);
 