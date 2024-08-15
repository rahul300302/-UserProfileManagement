import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/user-profile-management',
    JWT_SECRET:'f4d7a2c2e8b4a0d6c9e3b6c6f1e4f2a1'
}; 
