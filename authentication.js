import jwt from 'jsonwebtoken';
import { config } from './config/db.js';

export const authenticate = (req, res, next) => {
    // const token = req.headers.authorization;
    const token = jwt.sign(req.headers, config.JWT_SECRET, { expiresIn: '1h' });
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    } else {
        try {
            const verified = jwt.verify(token, config.JWT_SECRET);
            req.user = verified;
            next(); 
        } catch (error) {
            res.status(400).json({ message: 'Invalid Token' });
        }
    } 
};
