import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import router from './Routes/Routes.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
// app.use(cors());

mongoose.connect(process.env.DATABASE_URL).
    then(res => console.log('database connected')).
    catch(err => console.log(err));

app.use(router)


app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on port ${process.env.PORT}`)
})
