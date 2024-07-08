import User from '../models/usersSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const verifyUserAuth = async (req, res, next) => {
    try {
        
        // Retriving value (jwt token) of 'authorization' key from headers
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({error: 'Token unavailable, Try Loging again'});
        }

        // Decoding the retrieved token using jwt method and secret key (from .env file)
        // finding user document from db using userId which is parsed out from decoded object
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        const user = await User.findById(decoded.userId);
        if(!user) {
            return res.status(404).json({error : 'User not found'});
        }

        // Placing user required user details to user object inside request object and passing to next
        const userData = {
            name: user?.name,
            userId: user?._id
        }

        req.user = userData;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Authorization failed, Please Login'});
    }
}