const Student = require('../models/Student');
const cloudinary = require('../config/cloudinary')
const fs = require('fs')



const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('enrolledCourses', 'title description credits');
    res.json(students);
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('enrolledCourses', 'title description credits');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
};

const createStudent = async (req, res, next) => {
  const { name, email, age, department, enrolledCourses } = req.body;
  
  try {
    let profilePicture = null;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pictures",
      });
      profilePicture = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
      fs.unlinkSync(req.file.path);
    }
    const student = new Student({ name, email, age, department, enrolledCourses , profilePicture});
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('enrolledCourses', 'title description credits');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};