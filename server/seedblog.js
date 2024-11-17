require("dotenv").config();
const mongoose = require('mongoose');
const Blog = require('./models/Blogs'); // Adjust path as necessary

const MONGO_URI = process.env.MONGO_URI;

// Initial blog data with posts
const initialBlogs = [
    {
        title: 'Introduction to AI',
        content: 'This post introduces the basics of Artificial Intelligence...',
        image: 'https://via.placeholder.com/100x100',
        author: 'Alice Johnson',
        date: new Date(),
        tags: ['AI', 'Technology', 'Basics'],
        resources: [
          'https://www.example.com/ai_resource1',
          'https://www.example.com/ai_resource2'
        ]
    },
    {
        title: 'The Future of Renewable Energy',
        content: 'This post explores renewable energy technologies...',
        image: 'https://via.placeholder.com/100x100',
        author: 'Bob Brown',
        date: new Date(),
        tags: ['Energy', 'Environment', 'Future'],
        resources: [
          'https://www.example.com/energy_resource1',
          'https://www.example.com/energy_resource2'
        ]
    },
    // Add other blogs similarly
];

const seedBlogDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Blog.countDocuments({});
        if (count === 0) {
            await Blog.insertMany(initialBlogs);
            console.log('Initial blogs seeded');
        } else {
            console.log('Blogs already exist, skipping seeding.');
        }
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedBlogDatabase();
