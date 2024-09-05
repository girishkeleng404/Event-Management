import express from 'express';
import { multipleUpload, singleUpload, upload_By_Link } from '../controllers/imageUploadController.js';
import multer from 'multer';
import path from "path";


const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
}) });

const router = express.Router();


router.route('/upload_by_link').post(upload_By_Link);
router.route('/upload').post(upload.single('profilePhoto'), singleUpload);

router.route('/uploads').post(upload.array('photos', 100), multipleUpload);

export default router;