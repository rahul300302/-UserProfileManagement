// controllers/userLoginController.js
import { LastLogin } from '../../models/usersModel.js';

export const saveUserLoginDetails = async (req) => {
    const userId = req.id;
    console.log("hihi");
    
    try {
        await LastLogin.findOneAndUpdate(
            { userId },
            { lastLogin: new Date() },
            { upsert: true, new: true }
        );
        console.log( 'Last login details saved successfully.' );
        
        req.socket.emit('response',{ message: 'Last login details saved successfully.' });
    } catch (error) {
        req.socket.emit('response',{ message: 'Failed to save last login details.' });
    }
};
