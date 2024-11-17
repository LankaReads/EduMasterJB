// projectSeed.js
const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const seedProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Clear existing projects
        await Project.deleteMany();

        // Define initial projects
        const projects = [
            {
                title: 'Renewable Energy Innovations',
                description: 'Research on cutting-edge renewable energy technologies.',
                imageUrl: 'https://via.placeholder.com/350',
                link: 'https://example.com/renewable-energy'
            },
            {
                title: 'Urban Smart City Development',
                description: 'Exploring the future of urbanization with smart city concepts.',
                imageUrl: 'https://via.placeholder.com/350',
                link: 'https://example.com/smart-city'
            },
            {
                title: 'AI in Healthcare',
                description: 'Using AI to transform healthcare and improve patient outcomes.',
                imageUrl: 'https://via.placeholder.com/350',
                link: 'https://example.com/ai-healthcare'
            }
        ];

        // Insert projects into the database
        await Project.insertMany(projects);
        console.log('Projects seeded successfully!');

        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('Error seeding projects:', error);
    }
};

seedProjects();
