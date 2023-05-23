const express = require('express');
const multer = require('multer');
const { check } = require('express-validator');
const userController = require('./../controllers/userController');
const router = express.Router();
router
  .route('/')
  .get(userController.getAllUsers)
  .post([
    check('name').isString().not().isEmpty(),
    check('email').isString().not().isEmpty(),
    check('password').isString().not().isEmpty(),
  ],userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch([
    check('name').isString().not().isEmpty(),
    check('email').isString().not().isEmpty(),
    check('password').isString().not().isEmpty(),
  ],userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
