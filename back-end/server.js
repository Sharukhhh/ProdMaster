import express, { urlencoded } from 'express'
import morgan from 'morgan';
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import {connectToDb} from './connections/dbConnect.js'
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(express.json());
app.use(urlencoded({extended: true}));

connectToDb();

app.use('/api/auth' , authRoutes);
app.use('/api/category' , categoryRoutes);

app.listen(5000 , () => {
    console.log('Server running');
})




