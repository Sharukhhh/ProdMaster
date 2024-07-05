import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();


export const createToken = async (userId) => {

    const token = await jwt.sign({userId : userId} , process.env.JWT_KEY , {expiresIn : '2hr'});

    return token;
}