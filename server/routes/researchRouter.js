// routes/researchRouter.js
const express = require('express');
const Research = require('../models/Research');
const router = express.Router();

// Get all research data
router.get('/', async (req, res) => {
    try {
        const researchData = await Research.find();
        res.json(researchData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new research data
router.post('/', async (req, res) => {
    const { title, description, imageUrl, link } = req.body;
    const research = new Research({ title, description, imageUrl, link });
    try {
        await research.save();
        res.status(201).json(research);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update existing research data
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedResearch = await Research.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResearch) return res.status(404).json({ message: 'Research not found' });
        res.json(updatedResearch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete research data
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedResearch = await Research.findByIdAndDelete(id);
        if (!deletedResearch) return res.status(404).json({ message: 'Research not found' });
        res.json({ message: 'Research deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
