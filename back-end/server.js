import express, { urlencoded } from 'express'
import morgan from 'morgan';
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import {connectToDb} from './connections/dbConnect.js'
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(express.json());
app.use(urlencoded({extended: true}));

connectToDb();

app.use('/api/auth' , authRoutes);
app.use('/api/category' , categoryRoutes);
app.use('/api/product' , productRoutes);
app.use('/api/list' , wishlistRoutes);

app.listen(5000 , () => {
    console.log('Server running');
})




