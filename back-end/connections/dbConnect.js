import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const mongoConnectionString = process.env.DATABASE_URL;

export const connectToDb = async () => {
    try {
        await mongoose.connect(mongoConnectionString);
        console.log('connected successfully');
    } catch (error) {
        console.log('error while prisma connection');
    }
}