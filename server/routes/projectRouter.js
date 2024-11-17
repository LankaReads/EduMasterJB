// routes/projectRouter.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});

// Create a new project
router.post('/', async (req, res) => {
    const { title, description, imageUrl, link } = req.body;
    const newProject = new Project({ title, description, imageUrl, link });

    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: "Error creating project" });
    }
});

// Update a project
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: "Error updating project" });
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
});

module.exports = router;
