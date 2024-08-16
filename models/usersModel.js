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
 
const lastLoginSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now }
});

const fieldChangeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    fieldOldValue: { type: String, required: true },
    fieldNewValue: { type: String, required: true },
    changedAt: { type: Date, default: Date.now }
});

export default mongoose.model('user_data', userSchema);
export const LastLogin = mongoose.model('LastLogin', lastLoginSchema);
export const FieldChange = mongoose.model('FieldChange', fieldChangeSchema);