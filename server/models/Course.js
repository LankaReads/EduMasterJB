const mongoose = require('mongoose');

// Schema for each week's content
const weekSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  video: { type: String, required: true },
  pdf: { type: String, required: true },
  quiz: { type: String, required: true },
  resources: { type: [String], required: false }, // Additional resources are optional
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  weeks: [weekSchema] // Each course contains an array of weeks
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
