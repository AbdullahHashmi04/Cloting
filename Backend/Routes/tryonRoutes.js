// tryonRoutes.js - ES Module Version
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createTryOn, getTryOnHistory, getTryOnById, deleteTryOn } from '../Controller/tryonController.js';
// import { protect } from '../middleware/authMiddleware.js'; // Uncomment when you have auth

const router = express.Router();

console.log("Route is correct")

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tryon/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPEG, JPG, PNG) are allowed'));
  }
});

// Routes
router.post(
  '/create',
  // protect, // Uncomment when you have authentication middleware
  upload.fields([
    { name: 'personImage', maxCount: 1 },
    { name: 'clothImage', maxCount: 1 }
  ]),
  createTryOn
);

router.get('/history/:userId', getTryOnHistory);
// router.get('/history/:userId', protect, getTryOnHistory); // With auth

router.get('/:id', getTryOnById);
// router.get('/:id', protect, getTryOnById); // With auth

router.delete('/:id', deleteTryOn);
// router.delete('/:id', protect, deleteTryOn); // With auth

router.get('/',(req,res)=>{
    res.send("hello world")
})

export default router;
