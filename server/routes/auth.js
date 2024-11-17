const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Teacher Registration Route
router.post('/teacher/signup', async (req, res) => {
  const { userName, userEmail, password } = req.body;
  try {
    const existingTeacher = await Teacher.findOne({ userEmail });
    if (existingTeacher) {
      return res.status(400).json({ error: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({
      userName,
      userEmail,
      password: hashedPassword,
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Student Registration Route
router.post('/student/signup', async (req, res) => {
  const { userName, userEmail, password } = req.body;
  try {
    const existingStudent = await Student.findOne({ userEmail });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      userName,
      userEmail,
      password: hashedPassword,
    });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

module.exports = router;
