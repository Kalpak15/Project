const express = require('express');
const router = express.Router();
const upload =require('../utils/multer')
const authMiddleware = require('../middleware/authentication');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");

// const {checkDownload} = require("../controllers/downloadController");

router.get('/', authMiddleware, getAllStudents);
router.get('/:id', authMiddleware, getStudentById);
router.post('/', upload.single("profilePicture"),authMiddleware, createStudent);
router.put('/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent);

module.exports = router;