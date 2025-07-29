import express from 'express';
import { createBug,
  getBugs,
  updateBug,
  deleteBug,
} from '../controllers/bugController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Protect all bug routes so only logged-in users can access
router.use(protect);

// Create a new bug
router.post('/', createBug);

// Get all bugs for logged-in user
router.get('/', getBugs);

// Update a bug by ID
router.patch('/:id', updateBug);

// Delete a bug by ID
router.delete('/:id', deleteBug);

export default router;
