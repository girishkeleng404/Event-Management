import express from 'express'
import { searchPlaceBySearchText, sortIndex } from '../controllers/ISFS_Controller.js';
const router = express.Router();

router.route('/sortIndex').get(sortIndex);
router.route('/searchPlace/:searchText').get(searchPlaceBySearchText);

export default router;