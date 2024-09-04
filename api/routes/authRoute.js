import express from 'express';
import passport from '../config/passport_config.js';
import { getUserData, login, profile, register } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.route('/register').post(register);
// Local route
router.route('/login').post(passport.authenticate('local'), login);

// Google OAuth route
router.route('/auth/google').get(passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

router.route('/auth/google/callback').get(passport.authenticate('google', { failureRedirect: 'http://localhost:5173' }), (req, res) => {
    const user = req.user;
    const token = jwt.sign(req.user, process.env.JWT_SECTET_KEY);
    const redirectUrl = `http://localhost:5173/profileForm?token=${token}`;
    res.redirect(redirectUrl);
});

router.route('/profile').get(profile);
router.route('/getUserData').get(getUserData);

export default router;
