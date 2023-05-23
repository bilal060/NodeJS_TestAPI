
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');

exports.deleteOne = Model =>  catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id);
    console.log(req.params.id)
    if(!doc){
        return next(new AppError('No doc Find by this Id' ,404))
    }
    res.status(204).json({
        status: 'success',
        data:null

    });
})
exports.updateOne = Model =>  catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    if(!doc){
        return next(new AppError('No doc Find by this Id' ,404))
    }
    res.status(200).json({
        status: 'success',
        data:{
            doc
        }

    });
})
exports.createOne = Model =>  catchAsync(async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError('Invalid data received', 422));
    }
    const doc = await Model.create(req.body);
    if(!doc){
        return next(new AppError('No doc Find by this Id' ,404))
    }
    res.status(200).json({
        status: 'success',
        data:{
            doc
        }
    });
})
exports.getOne = (Model)=> catchAsync(async(req,res,next)=>{
    let doc = await Model.findById(req.params.id)
    if(!doc){
        return next(new AppError('No doc Find by this Id' ,404))
    }
    res.status(200).json({
        status: 'success',
        data:{
            doc
        }
    });
})
exports.getAll = Model=> catchAsync(async (req, res, next) => {
    const docs = await Model.find();
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs
      }
    });
});