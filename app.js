const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//const publicRoutes = require('./src/routes/v1');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

const corsOptions = {
    exposedHeaders: "accessToken",
};

app.use(cors(corsOptions));
app.use(cors());
app.use(logger('dev'));
app.use(express.json({
    limit: '5mb'
    
}));
app.use(express.urlencoded({
    extended: false,
    limit: '5mb',

}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')));


// Public & protected routes
//app.use('/api/v1', publicRoutes);
// app.use('/api/v1', authMiddleware.verifyToken)

app.use(errorHandler);

module.exports = app;