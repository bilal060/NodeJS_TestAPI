const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.deleteUser = factory.deleteOne(User)
exports.updateUser = factory.updateOne(User)
exports.createUser = factory.createOne(User)
exports.getUser = factory.getOne(User)
exports.getAllUsers = factory.getAll(User)
