import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import signupRoute from './routes/signup';
import auth from './routes/auth';
import update from './routes/update';
import lostpassword from './routes/lostpassword';
require('dotenv').config();


/* import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import Template from './../template'
import authRoute from './routes/auth'; */

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use('/', signupRoute);
app.use('/', auth);
app.use('/', update);
app.use('/', lostpassword);


export default app;