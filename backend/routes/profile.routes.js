import express from 'express';
import { updateProfile } from '../controllers/profile.controller.js';

const router = express.Router();

// Profile
router.put('/updateProfile', updateProfile);

export default router;