const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Adjust the path as necessary

// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new post
router.post('/', async (req, res) => {
    const { title, content, image, author, links } = req.body;
    const post = new Post({
        title,
        content,
        image,
        author,
        links,
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update a post by ID
router.put('/:id', async (req, res) => {
    const { title, content, image, author, links } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content, image, author, links }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a post by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
