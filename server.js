import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import multer from 'multer';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import device from 'express-device';
import cloudinary from 'cloudinary';
import mongoSanitize from 'express-mongo-sanitize';
import systemMiddleware from './middleware/systemMiddleware.js';

import { sendResponse, responseCode } from './utils/index.js';
import login from './pages/Auth/login.js';
import dashboard from './pages/Dashboard/App.js';
import Exam from './pages/Exams/App.js';

const app = express();
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(device.capture());

// set security http headers
app.use(
    helmet({
        contentSecurityPolicy: false,
    }),
);

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(mongoSanitize());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
    max: 10000, //   max number of limits
    windowMs: 60 * 60 * 1000, // hour
    message: ' Too many req from this IP , please Try  again in an Hour ! ',
});

app.use('/api', limiter);

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(systemMiddleware);

app.use((req, res, next) => {
    //  Body Parser  => reading data from body into req.body protect from scraping etc
    bodyParser.urlencoded({ extended: true });
    express.json()(req, res, next);
});
app.use(fileUpload({ useTempFiles: true }));

app.post('/api/login', login);
app.use('/api/dashboard', dashboard);
app.use('/api/exam', Exam);

app.use('/', async (req, res) => {
    const data = {
        website: 'api.gotocourse.com',
        status: 'live',
    };
    return sendResponse(responseCode.STATUS_OK, data, res);
});

app.all('*', (req, res, next) => {
    sendResponse([], `Can't find ${req.originalUrl} on the server`, 404, res);
});

export default app;
