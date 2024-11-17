const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a course by ID (for "Open Course" page)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new course (can be used to populate DB)
router.post('/', async (req, res) => {
  const { title, teacher, description, image, weeks } = req.body;

  if (!title || !teacher || !description || !image || !weeks) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newCourse = new Course({
    title,
    teacher,
    description,
    image,
    weeks
  });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error('Error saving course:', err);
    res.status(400).json({ message: 'Error saving course' });
  }
});


// Update a course by ID (for "Teacher Open Course" page)
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;