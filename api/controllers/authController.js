import express from 'express'
import bcrypt from "bcryptjs";
import { generateAuthToken } from '../auth.js'
import db from '../config/database.js';
import passport from 'passport';
const saltRounds = process.env.NUMBER_OF_SALT||10;

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error checking user" });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.json({ message: "Error hashing password" });
        } else {
            try {
                const result = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, hash]);
                const user = result.rows[0];
                const authToken = generateAuthToken(user);

                // Set up user session here
                req.session.user = user; // Adjust according to your session setup

                // Save the session before sending the response
                req.session.save(err => {
                    if (err) {
                        return res.status(500).json({ message: "Error saving session" });
                    }

                    res.cookie('authToken', authToken, {
                        maxAge: 3600000, // 1 hour
                        httpOnly: true,
                        secure: true, // Send the cookie over HTTPS only
                        sameSite: 'Strict' // Strictly same site
                    });

                    // This should now also send the connect.sid cookie
                    res.json(user);
                });
            } catch (error) {
                return res.status(500).json({ message: "Error creating user" });
            }
        }
    });
}

const login = (req, res) => {
    if (!req.user) {
        return res.status(400).json({ message: "User not found or authentication failed" });
    }
    const authToken = generateAuthToken(req.user);
    res.cookie('authToken', authToken, {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: true, // Send the cookie over HTTPS only
        sameSite: 'Strict' // Strictly same site
    });
    console.log(req.user);
    res.json(req.user);
};
export { register, login };