const Course = require('../models/Course');

// Utility to escape special RegExp characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};


// List all courses
const getAllCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || 'title';

    const sortOptions = {};
    if (sort.startsWith('-')) {
      sortOptions[sort.substring(1)] = -1;
    } else {
      sortOptions[sort] = 1;
    }

    const courses = await Course.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments();

    res.json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCourses: total,
    });
  } catch (err) {
    console.error(`Error fetching courses: ${err.message}`);
    next(err);
  }
};


// Search Course
const searchCourses = async (req, res, next) => {
  try {
    const { title } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || 'title';

    if (!title) {
      return res.status(400).json({ message: 'Title query parameter is required for search' });
    }

    const escapedTitle = escapeRegExp(title);
    const query = {
      $or: [
        { title: { $regex: escapedTitle, $options: 'i' } },
        { description: { $regex: escapedTitle, $options: 'i' } },
      ],
    };

    const sortOptions = {};
    if (sort.startsWith('-')) {
      sortOptions[sort.substring(1)] = -1;
    } else {
      sortOptions[sort] = 1;
    }

    const courses = await Course.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments(query);

    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found with the given title' });
    }

    const titleMatches = courses.some(course =>
      course.title.match(new RegExp(escapedTitle, 'i'))
    );
    if (!titleMatches) {
      return res.status(404).json({ message: 'No courses found with the given title' });
    }

    res.json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCourses: total,
    });
  } catch (err) {
    console.error(`Error searching courses: ${err.message}`);
    next(err);
  }
};


// Create a new course 
const createCourse = async (req, res, next) => {
  const { title, description, credits } = req.body;

  try {
    const course = new Course({ title, description, credits });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(`Error creating course: ${err.message}`);
    next(err);
  }
};


// Update course 
const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(`Error updating course: ${err.message}`);
    next(err);
  }
};


// Delete course 
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error(`Error deleting course: ${err.message}`);
    next(err);
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourses,
};