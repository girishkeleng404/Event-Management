import passport from 'passport';
import LocalStrategy from "passport-local";
import db from './database';
import bcrypt from 'bcryptjs'




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