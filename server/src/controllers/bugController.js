// src/controllers/bugController.js
import Bug from '../models/bug.js';

// Create a new bug
export const createBug = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBug = new Bug({
      title,
      description,
      status: 'open', // default
      createdBy: req.user.id, // assuming auth middleware sets req.user
    });
    const savedBug = await newBug.save();
    res.status(201).json(savedBug);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create bug', error: error.message });
  }
};

// Get all bugs
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({ createdBy: req.user.id });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bugs', error: error.message });
  }
};

// Update bug status/details
export const updateBug = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const bug = await Bug.findById(id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    if (bug.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    Object.assign(bug, updates);
    const updatedBug = await bug.save();
    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update bug', error: error.message });
  }
};

// Delete a bug
export const deleteBug = async (req, res) => {
  try {
    const { id } = req.params;
    const bug = await Bug.findById(id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    if (bug.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await bug.remove();
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete bug', error: error.message });
  }
};
