import passport, { session } from 'passport';
import LocalStrategy from "passport-local";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from './database';
import bcrypt from 'bcryptjs'


// app.use(passport.initialize());
// app.use(passport.session());


passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            if (result.rows.length > 0) {
                const checkPassport = result.rows[0];
                const match = await bcrypt.compare(password, checkPassport.password);
                if (match) {
                    return done(null, checkPassport)
                } else {
                    return done(null, false, { message: "Password is incorrect" });
                }
            } else {
                return done(null, false, { message: "User not found" });
            }
        } catch (error) {
            return done(error);
        }
    }
))



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5173/auth/google/callback'
    // scope: ['email','profile',]
},
    async function (accessToken, resfreshToken, profile, cb) {

        try {
            const check = await db.query("SELECT * FROM users WHERE email = $1", [profile.emails[0].value]);
            if (check.rows.length === 0) {
                const result = await db.query("INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING *", [profile.displayName, profile.emails[0].value, 'google']);
                console.log(profile);
                return cb(null, result.rows[0]);
            } else {
                return cb(null, check.rows[0]);
            }
        } catch (error) {
            console.log(error);
        }

        // return cb(null, profile);
    }
))


passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err, null)
    }
})


export default passport;