// blogRoutes.js

const express = require('express');
const router = express.Router();
const Blog = require('../models/Blogs'); // Import the Blog model
 // For automatic deletion of old posts

// Route to get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await Blog.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new blog post
router.post('/', async (req, res) => {
    const { title, content, image, author } = req.body;
    const post = new Blog({
        title,
        content,
        image,
        author,
        date: new Date(),
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Route to update a blog post by ID
router.put('/:id', async (req, res) => {
    const { title, content, image, author } = req.body;

    try {
        const post = await Blog.findByIdAndUpdate(req.params.id, { title, content, image, author }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Route to delete a blog post by ID
// Route to delete a blog post by ID
router.delete('/:id', async (req, res) => {
    try {
        const post = await Blog.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
