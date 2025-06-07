const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const { body, validationResult } = require('express-validator');

const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourses,
} = require('../controllers/CourseController');



// Validation middleware for POST /courses
const createCourseValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  body('credits')
    .notEmpty()
    .withMessage('Credits are required')
    .isInt({ min: 1, max: 10 })
    .withMessage('Credits must be an integer between 1 and 10'),
];

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


router.get('/', authMiddleware, getAllCourses);
router.post('/', authMiddleware, createCourseValidation, validate,createCourse);
router.put('/:id', authMiddleware, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);
router.get('/search', authMiddleware, searchCourses);

module.exports = router;