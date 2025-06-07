
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authentication');
const fs = require('fs');

// Debug authMiddleware
console.log('authMiddleware:', authMiddleware);

// Debug the entire module import
const studentController = require("../controllers/StudentController");
console.log('Imported StudentController:', studentController);

// Debug the controller imports
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = studentController;

console.log('getAllStudents:', getAllStudents);
console.log('getStudentById:', getStudentById);
console.log('createStudent:', createStudent);
console.log('updateStudent:', updateStudent);
console.log('deleteStudent:', deleteStudent);


// Validation middleware for POST /student
const createStudentValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 16, max: 100 })
    .withMessage('Age must be an integer between 16 and 100'),
  body('department')
    .notEmpty()
    .withMessage('Department is required')
    .isString()
    .withMessage('Department must be a string')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Department must be between 2 and 50 characters'),
  body('enrolledCourses')
    .optional()
    .isArray()
    .withMessage('EnrolledCourses must be an array')
    .custom((value) => {
      if (!value.every((id) => /^[0-9a-fA-F]{24}$/.test(id))) {
        throw new Error('EnrolledCourses must contain valid MongoDB ObjectIDs');
      }
      return true;
    }),
];

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Debug logging for the incoming request
router.post('/', (req, res, next) => {
  console.log('Incoming request headers:', req.headers);
  console.log('Incoming request body (before multer):', req.body);
  next();
});


// Temporarily remove authMiddleware to test getAllStudents
router.get('/', authMiddleware,getAllStudents);
router.get('/:id', authMiddleware, getStudentById);
router.post('/',  authMiddleware,createStudentValidation, validate, createStudent);
router.put('/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent);

module.exports = router;