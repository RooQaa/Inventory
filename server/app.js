const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter')
const inventoryRouter = require('./routes/inventoryRouter')


const app = express();

// 🔹 Security Middleware
app.use(cors());

app.options('*', cors());


// Serving static files
app.use('/api/public', express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// 🔹 Logging (Only in Development Mode)
if (process.env.NODE_ENV === 'development') {
 
   app.use(morgan('dev'));
}

// 🔹 Rate Limiting
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again later',
});
app.use('/api', limiter);

// 🔹 Security: Prevent NoSQL Injection & XSS Attacks
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// 🔹 API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/inventory', inventoryRouter);


// 🔹 Handle Unknown Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the URL ${req.originalUrl} on this server`, 404));
});

// 🔹 Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
