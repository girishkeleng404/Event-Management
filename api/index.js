import express from "express"
import cors from "cors";
import pg from "pg";
import bcrypt from "bcryptjs";
import session from "express-session";
import bodyParser from "body-parser";
import multer from "multer";
import imageDownloader from "image-downloader";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import LocalStrategy from "passport-local";
import { generateAuthToken } from "./auth.js";
import fs from "fs";



const app = express();
const port = 4000;

const saltRounds = 10;
app.use(session({
    secret: "Fuck off",
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        maxAge:3600000,
        secure: "auto",

    }

}))


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Event-management',
    password: 'girish12',
    port: 5432
})
db.connect();

app.get('/api/data', (req, res) => {
    res.json({ message: "Success" });
})


app.post('/register', async (req, res) => {
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
});

app.post('/login', passport.authenticate('local'), (req, res) => {
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
})

app.post('/logout', (req, res, cb) => {
    req.logout((err) => {
        if (err) {
            return cb(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return cb(err);
            }
            res.clearCookie('authToken', { path: '/' });
            res.clearCookie('connect.sid', { path: '/' });
            res.json({ message: 'Logged out successfully' });
        })
    })
})

app.get('/profile', async (req, res) => {

    if (req.isAuthenticated()) {
        const { id, name, email } = req.user;

        res.json({ id, name, email });
    } else {
        res.status(401).json({ message: "Unauthenticated" });
    }
})

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



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('profilePhoto'), async (req, res) => {
    if (!req.file) {
        console.error("No file in request.");
        return res.status(400).send({ message: 'No file uploaded. Please ensure the form is correctly configured and the field name matches.' });
    }
    try {
        console.log(req.file);
        res.send({ message: 'File uploaded successfully', fileName: req.file.filename });
    } catch (error) {
        console.error("Error handling the file upload:", error);
        res.status(500).send({ message: 'Error processing the file.' });
    }
});


// app.post('/profileDetails/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, bio, social, profilePhoto } = req.body;
//     try {
//         const profilePhotoArray = [profilePhoto];
//         const result = await db.query("INSERT INTO user_profile (user_id, name, bio, social_media_link, photos) VALUES ($1, $2, $3, $4, $5) RETURNING *", [id, name, bio, social, profilePhotoArray]);
       
//         res.json(result.rows[0])
//     } catch (err) {
//         console.log(err);
//         res.json({ message: "error" })
//     }
// })

app.post('/profileDetails/:id', async (req, res) => {
    const { id } = req.params;
    const { name, bio, social, profilePhoto } = req.body;
    try {
        const profilePhotoArray = [profilePhoto];
        const result = await db.query("INSERT INTO user_profile (user_id, name, bio, social_media_link, photos) VALUES ($1, $2, $3, $4, $5) RETURNING *", [id, name, bio, social, profilePhotoArray]);
       
        // Assuming the user's session is already established and you want to update or save something specific after this operation
        req.session.userProfile = result.rows[0]; // Example: Save the user profile in the session

        // Save the session before sending the response
        req.session.save(err => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error saving session" });
            }

            res.json(result.rows[0]);
        });
    } catch (err) {
        console.log(err);
        res.json({ message: "error" });
    }
});


app.get('/profile_detail/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM user_profile WHERE user_id = $1", [id]);
        res.json(result.rows[0]);
        console.log(result.rows);
    } catch (error) {
        res.json({ message: "error" })
        console.log(error);
    }
})



app.listen(port, () => {
    console.log("Server is running on port 5000");
})