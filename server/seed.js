require("dotenv").config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const MONGO_URI = process.env.MONGO_URI;

// Initial courses data with weeks
const initialCourses = [
    {
        title: 'Maths',
        teacher: 'Mr. John Doe',
        description: 'Learn basic to advanced mathematics.',
        image: 'https://via.placeholder.com/100x100',
        weeks: [
          {
            week: 1,
            video: "https://www.youtube.com/watch?v=maths_week1",
            pdf: "https://www.example.com/maths_week1.pdf",
            quiz: "https://www.example.com/maths_quiz1",
            resources: ["https://www.example.com/maths_resource1", "https://www.example.com/maths_resource2"]
          },
          {
            week: 2,
            video: "https://www.youtube.com/watch?v=maths_week2",
            pdf: "https://www.example.com/maths_week2.pdf",
            quiz: "https://www.example.com/maths_quiz2",
            resources: ["https://www.example.com/maths_resource3"]
          }
        ]
    },
    {
        title: 'Physics',
        teacher: 'Mrs. Jane Smith',
        description: 'Explore the fundamental principles of physics.',
        image: 'https://via.placeholder.com/100x100',
        weeks: [
          {
            week: 1,
            video: "https://www.youtube.com/watch?v=physics_week1",
            pdf: "https://www.example.com/physics_week1.pdf",
            quiz: "https://www.example.com/physics_quiz1",
            resources: ["https://www.example.com/physics_resource1"]
          },
          {
            week: 2,
            video: "https://www.youtube.com/watch?v=physics_week2",
            pdf: "https://www.example.com/physics_week2.pdf",
            quiz: "https://www.example.com/physics_quiz2",
            resources: ["https://www.example.com/physics_resource2", "https://www.example.com/physics_resource3"]
          }
        ]
    },
    // Add other courses similarly
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Course.countDocuments({});
        if (count === 0) {
            await Course.insertMany(initialCourses);
            console.log('Initial courses seeded');
        } else {
            console.log('Courses already exist, skipping seeding.');
        }
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
