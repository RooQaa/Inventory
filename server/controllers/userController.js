const User = require('../models/userModel');
const { catchAsync } = require(`../utils/catchAsync`);
const { filterObj } = require(`../utils/filterObj`);
const AppError = require(`../utils/appError`);



// Protect handlers
exports.getUsers = catchAsync(async (req, res, next) => {

    const data = await User.find();
    if (!data) return next(new AppError(`Not Found`, 404));
    res.status(200).json({
        status: true,
        length: data.length,
        data
    })
})

exports.getOneUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError(`Not Found`, 404));
    res.status(200).json({
        status: true,
        data: user
    })
})

exports.createUser = catchAsync(async (req, res, next) => {
    const doc = await User.create(req.body);
    res.status(201).json({
        status: true,
        message: "Create User Successfully",
        doc
    })
})


exports.deleteUser = catchAsync(async (req, res, next) => {
    const doc = await User.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError(`Not Found`, 404));
    res.status(200).json({
        status: true,
        message: "User deleted Successfully"
    })
})
exports.updateUser = catchAsync(async (req, res, next) => {
    const filteredBody = filterObj(req.body, 'username', 'role', 'isActive');
    const doc = await User.findByIdAndUpdate(req.params.id, filteredBody, { new: true, runValidators: true })
    
    if (!doc) return next(new AppError(`Not Found`, 404));
    res.status(200).json({
        status: true,
        message: "User Updated Successfully"
    })
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    
    // 1) Get user from collection
  
    const user = await User.findById(req.user.id).select('+password');
  
    if (!user) {
      return next(new AppError("Account not found", 404));
    }
    // 2) Check if posted current password is correct
    if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
  
      return next(new AppError("Current password isn't correct", 400));
    }
    if (!req.body.newPassword || !req.body.newPasswordConfirm) {
      return next(new AppError("Please Enter new Password and password Confirm", 400));
    }
    if (req.body.newPassword !== req.body.newPasswordConfirm) {
      return next(new AppError("Password and Password confirm aren't the same", 400));
    }
    if ((await user.correctPassword(req.body.newPassword, user.password))) {
      return next(new AppError("it's the same Password", 400));
    }
    // 3) If so, update password
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
  
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: true,
      message: "Password Updated "
    })
  }
  );