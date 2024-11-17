const mongoose = require('mongoose');
const Research = require('./models/Research'); // Adjust the path as necessary
require('dotenv').config(); // Load environment variables

const seedResearch = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Clear existing research entries
        await Research.deleteMany();

        // Define initial research data
        const researchData = [
            {
                title: 'Exploring Quantum Computing',
                description: 'An in-depth study on the advancements in quantum computing technology.',
                imageUrl: 'https://via.placeholder.com/350',
                link: 'https://example.com/quantum-computing',
            },
            {
                title: 'Climate Change Impacts on Biodiversity',
                description: 'Research on how climate change affects biodiversity across ecosystems.',
                imageUrl: 'https://via.placeholder.com/350',
                link: 'https://example.com/climate-change-biodiversity',
            },
            {
                title: 'Artificial Intelligence in Healthcare',
                description: 'An exploration of AI applications in improving healthcare outcomes.',
                imageUrl: 'https://via.placeholder.com/350',
                link: 'https://example.com/ai-healthcare',
            }
        ];

        // Insert research data into the database
        await Research.insertMany(researchData);
        console.log('Research data seeded successfully!');

        // Disconnect from the database
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('Error seeding research data:', error);
    }
};

// Run the seed function
seedResearch();
