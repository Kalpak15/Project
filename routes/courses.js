const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/CourseController');


router.get('/', authMiddleware, getAllCourses);
router.post('/', authMiddleware, createCourse);
router.put('/:id', authMiddleware, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);

module.exports = router;