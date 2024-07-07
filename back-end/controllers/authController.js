import bcrypt from 'bcrypt';
import User from '../models/usersSchema.js'
import {hashingPassword} from '../utils/passwordUtils.js'
import {createToken} from '../utils/tokenUtils.js'


/*
    DESCRIPTION : User Registration
    path : /api/auth/register 
*/
export const registerUser = async (req, res) => {
    try {

        const {name , email , password} = req.body;

        if(name && email && password){
            // checking if exisiting user
            const isExistingUser = await User.findOne({email});
            if(isExistingUser){
                return res.status(404).json({error : 'User Already Exists'});
            }

            // encrypting the password before storing to db
            const securedPassword = await hashingPassword(password);

            // creating user document in db
            await User.create({
                name,
                email,
                password : securedPassword
            });

            return res.status(201).json({message : 'Account Created!'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}


/*
    DESCRIPTION : User Sign in
    path : /api/auth/login
*/
export const login = async (req, res) => {
    try {
        const {email , password} = req.body;

        if(email && password){

            // checking if user exists
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({error : 'User not found, Kindly Create your account'});
            }

            // checking between given password encrypted password
            const isCorrectPassword = await bcrypt.compare(password , user.password);

            if(isCorrectPassword){
                // generating jwt token for authorization 
                const token = await createToken(user._id);
                const userData = {
                    name: user?.name , 
                    userId: user?._id
                }

                return res.json({message : 'Logged In Successfully', userData, token });

            } else {
                return res.status(401).json({error : 'Password Does not match!'});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server error'});
    }
}