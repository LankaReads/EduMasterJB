const mongoose = require('mongoose');
const Post = require('./models/Post'); // Adjust the path as necessary
require('dotenv').config(); // Load environment variables

const seedPosts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Clear existing posts
        await Post.deleteMany();

        // Define initial posts
        const posts = [
            {
                title: 'The Journey to the Center of the Earth',
                content: 'A thrilling adventure exploring the depths of the Earth...',
                image: 'https://example.com/image1.jpg',
                author: 'Jules Verne',
                links: ['https://example.com/related1', 'https://example.com/related2']
            },
            {
                title: '1984: A Dystopian Novel',
                content: 'A cautionary tale about a totalitarian regime...',
                image: 'https://example.com/image2.jpg',
                author: 'George Orwell',
                links: ['https://example.com/related3', 'https://example.com/related4']
            },
            {
                title: 'The Great Gatsby',
                content: 'A story about the American Dream and its disillusionment...',
                image: 'https://example.com/image3.jpg',
                author: 'F. Scott Fitzgerald',
                links: ['https://example.com/related5', 'https://example.com/related6']
            }
        ];

        // Insert posts into the database
        await Post.insertMany(posts);
        console.log('Posts seeded successfully!');

        // Disconnect from the database
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.error('Error seeding posts:', error);
    }
};

// Run the seed function
seedPosts();
