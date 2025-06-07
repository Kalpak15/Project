
const Student = require('../models/Student');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');


// List of all students with course info 
const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('enrolledCourses', 'title description credits');
    res.json(students);
  } catch (err) {
    console.error(`Error fetching students: ${err.message}`);
    next(err);
  }
};


// Get a student by ID with their courses 
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('enrolledCourses', 'title description credits');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error(`Error fetching student by ID: ${err.message}`);
    next(err);
  }
};


//  Create a new student 
const createStudent = async (req, res, next) => {
  const { name, email, age, department, enrolledCourses } = req.body;
  
  try {
   
    const student = new Student({ name, email, age, department, enrolledCourses});
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(`Error creating student: ${err.message}`);
    next(err);
  }
};


//  Update student data 
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
    console.error(`Error updating student: ${err.message}`);
    next(err);
  }
};


//  Delete a student
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error(`Error deleting student: ${err.message}`);
    next(err);
  }
};

// Debug the exports
const exportsObj = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
console.log('Exporting StudentController functions:', exportsObj);

module.exports = exportsObj;