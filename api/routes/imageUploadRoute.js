import express from 'express';
import { multipleUpload, singleUpload, upload_By_Link } from '../controllers/imageUploadController.js';
const router = express.Router();

router.route('/upload_by_link').post(upload_By_Link);
router.route('/upload').post(singleUpload);
router.route('/uploads').post(multipleUpload)

export default router;