const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require(`../models/userModel`)
const { catchAsync } = require(`../utils/catchAsync`);
const AppError = require(`../utils/appError`);

const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, statusCode, message, res) => {
  const token = signToken(user.id);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOption.secure = true; // client cann't access it

  res.cookie('jwt', token, cookieOption); // save jwt in cookie

  //Remove password from output
  user.password = undefined;


  res.status(statusCode).json({
    status: true,
    message,
    data:user,
    token,
  });
};


exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //1) check username && password exist,
  if (!username || !password) {
    return next(new AppError('please provide username & password', 400));
  }

  const user = await User.findOne({ username: username }).select('+password');



  if (
    !user ||
    !(
      (await user.correctPassword(
        password,
        user.password
      ))
    )
  ) {


    return next(new AppError('Incorrect username or password', 400));
  }


  createSendToken(user, 200, 'log in successfully', res);

});




exports.logOut = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    status: true,
    message: 'You logged out',
    token: ""
  });
});


//MIDDLEWARE CHECK IF USER STILL LOGGED IN
exports.protect = catchAsync(async (req, res, next) => {
  //1)Getting token and check it's there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {

    return next(new AppError("Your're not logged in please log in", 401)); //401 => is not 'authorized
  }
  //2)Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)check if user still exist in the route
  const currentUser = await User.findById(decoded.id).select('-passwordOtp -passwordOtpExpires -passwordChangedAt');
  if (!currentUser) {

    return next(
      new AppError(`Your Session expires please Login again`, 401)
    );
  }
  //4)check if user changed password after the token has issued
  if (currentUser.changesPasswordAfter(decoded.iat)) {
    //iat=> issued at

    return next(
      new AppError(
        'user has changed password recently please log in again',
        401
      )
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser; // pyasse el data le middleware tany
  next();
});


exports.restrictTo = (...roles) => {
  //function feha paramter we 3awz a7oot feha middleware
  //roles ['admin','lead-guide']
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to preform this action', 401)
      );
    }
    next();
  };
};

