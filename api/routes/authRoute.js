import express from "express"
import {login, register} from "../controllers/authController.js";
import passport from "passport";
const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(passport.authenticate('local'),login);

export default router;