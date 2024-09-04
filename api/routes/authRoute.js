import express from "express"
import {login, profile, register} from "../controllers/authController.js";
import passport, { Passport } from "passport";
const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(passport.authenticate('local'),login);


// Google OAuth route
router.get('/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173' }),
    (req, res) => {
        const user = req.user;
        const token = jwt.sign(req.user, process.env.JWT_SECRET);
        const redirectUrl = `http://localhost:5173/profileForm?token=${token}`;
        res.redirect(redirectUrl);
    }
);



router.route('/profile').get(profile)

export default router;