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
import cookieParser from "cookie-parser";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { callbackify } from "util";
import OpenIDConnectStrategy from "passport-openidconnect";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import env from "dotenv"
import razorpay from "razorpay";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";
import authRoute from './routes/authRoute.js'


env.config();

const app = express();
const port = 4000;

// const saltRounds = 10;

const secretKey = process.env.SECTET_KEY;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'Strict',
        maxAge: 3600000,
        secure: "auto",

    }

}))





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
db.connect();

app.get('/api/data', (req, res) => {
    res.json({ message: "Success" });
})

app.use(authRoute);


// app.post('/login', passport.authenticate('local'), (req, res) => {
//     if (!req.user) {
//         return res.status(400).json({ message: "User not found or authentication failed" });
//     }
//     const authToken = generateAuthToken(req.user);
//     res.cookie('authToken', authToken, {
//         maxAge: 3600000, // 1 hour
//         httpOnly: true,
//         secure: true, // Send the cookie over HTTPS only
//         sameSite: 'Strict' // Strictly same site
//     });
//     console.log(req.user);
//     res.json(req.user);
// })



// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:5173/auth/google/callback'
//     // scope: ['email','profile',]
// },
//     async function (accessToken, resfreshToken, profile, cb) {

//         try {
//             const check = await db.query("SELECT * FROM users WHERE email = $1", [profile.emails[0].value]);
//             if (check.rows.length === 0) {
//                 const result = await db.query("INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING *", [profile.displayName, profile.emails[0].value, 'google']);
//                 console.log(profile);
//                 return cb(null, result.rows[0]);
//             } else {
//                 return cb(null, check.rows[0]);
//             }
//         } catch (error) {
//             console.log(error);
//         }

//         // return cb(null, profile);
//     }
// ))
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['openid', 'email', 'profile',] })
// )

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: 'http://localhost:5173' }),
//     (req, res) => {
//         const user = req.user;
//         console.log(user);
//         console.log("fuck off")
//         const token = jwt.sign(req.user, secretKey);
//         const redirectUrl = `http://localhost:5173/profileForm?token=${token}`;

//         // Redirect to the URL with the token
//         res.redirect(redirectUrl);
//     }
// )

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

// app.get('/profile', async (req, res) => {

//     if (req.isAuthenticated()) {
//         const { id, name, email } = req.user;

//         res.json({ id, name, email });
//     } else {
//         res.status(401).json({ message: "Unauthenticated" });
//     }
// })




app.get('/getUserData', (req, res) => {
    const token = req.query.token;
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }
            console.log("fuck off")
            console.log(user);
            res.json(req.user);
        });
    } else {
        console.log("Token is required")
        res.status(400).send('Token is required');
    }
});

app.get('/user_profile', async (req, res) => {
    const userId = req.query.id;
    try {
        const result = await db.query("SELECT * FROM user_profile WHERE user_id = $1", [userId])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
})


// app.get('/profile', async (req, res) => {
//     // Check if the Authorization header is present
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

//     if (token == null) return res.sendStatus(401); // If no token, return 401 Unauthorized

//     try {
//         // Verify the token
//         const user = verifyAuthToken(token); // Implement this function based on your auth token verification logic

//         // Assuming verifyAuthToken returns the user if the token is valid
//         if (user) {
//             req.user = user; // Optionally set the user in the request if needed
//             // Proceed with your route logic
//             if (req.isAuthenticated()) {
//                 const { id, name, email } = req.user;
//                 res.json({ id, name, email });
//             } else {
//                 res.status(401).json({ message: "Unauthenticated" });
//             }
//         } else {
//             // If the token is not verified
//             return res.status(403).json({ message: "Token is invalid or expired" });
//         }
//     } catch (error) {
//         // Handle any other errors
//         return res.status(500).json({ message: "An error occurred verifying the token" });
//     }
// });









function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Generates a 6-digit OTP
}


app.post('/otpSend', async (req, res) => {
    // const { id } = req.params;
    const { email, isVarified, name } = req.body;
    const otp = generateOTP();
    try {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'girishkeleng30@gmail.com',
                pass: 'vtbq xdgx eiec zamh'
            }
        });

        var mailOptions = {
            from: 'girishkeleng30@gmail.com',
            to: `${email}`,
            subject: 'Your One-Time Password (OTP) for Air',
            text: `Dear ${name},

Your One-Time Password (OTP) is ${otp}. Please use this code to complete your verification. Note that this OTP will expire in 5 minutes.

If you did not request this, please ignore this email.

Thank you,
The Air Team`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Failed to send OTP');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('OTP sent successfully');
            }
        });

        const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        const result = await db.query("INSERT INTO otps(email_or_phone, otp, expiration_time, is_verified) VALUES ($1,$2,$3,$4) RETURNING *", [email, otp, expirationTime, isVarified]);

        res.json(result.rows[0]);


    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while sending OTP');
    }
})


app.post('/auth/verify-otp', async (req, res) => {
    const { email, frontOTP } = req.body;
    try {
        const otpRecord = await db.query("SELECT * FROM otps WHERE email_or_phone = $1 ORDER BY id DESC LIMIT 1", [email]);
        if (otpRecord.rows.length > 0 && otpRecord.rows[0].otp === frontOTP && otpRecord.rows[0].expiration_time > new Date()) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.json(error)
        console.log(error);
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


const uploaderDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploaderDir)) {
    fs.mkdirSync(uploaderDir);
}
app.post('/upload_by_link', async (req, res) => {
    const { link } = req.body;
    const newName = "photo" + Date.now() + '.jpg';
    const destinationPath = path.join(uploaderDir, newName);
    try {
        await imageDownloader.image({
            url: link,
            dest: destinationPath
        })
        console.log(newName)
        res.json(newName);
    } catch (error) {
        console.error("Error downloading image:", error);
        res.status(500).json({ message: "Error downloading image" });
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

app.post('/uploads', upload.array('photos', 100), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        console.error("No files in request.");
        return res.status(400).send({ message: 'No files uploaded. Please ensure the form is correctly configured and the field name matches.' });
    }
    try {
        console.log(req.files);
        const fileNames = req.files.map(file => file.filename);
        res.send(fileNames);
    } catch (error) {
        console.error("Error handling the file upload:", error);
        res.status(500).send({ message: 'Error processing the file.' });
    }
})

app.post('/profileDetails/:id', async (req, res) => {
    const { id } = req.params;
    const { name, bio, social, profilePhoto, phone, email } = req.body;
    try {
        const profilePhotoArray = [profilePhoto];
        const result = await db.query("INSERT INTO user_profile (user_id, name, bio, social_media_link, photos,phone,email) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *", [id, name, bio, social, profilePhotoArray, phone, email]);

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


app.put('/profileDetails/:id', async (req, res) => {
    const { id } = req.params;
    const { name, bio, social, profilePhoto, phone, email } = req.body;

    console.log("Received ID:", id);
    console.log("Received name:", name);
    console.log("Received bio:", bio);
    console.log("Received social:", social);
    console.log("Received profilePhoto:", profilePhoto);
    try {
        const profilePhotoArray = [profilePhoto];

        const result = await db.query("UPDATE user_profile SET name = $1, bio = $2, social_media_link = $3, photos = $4 , phone = $5, email = $6 WHERE user_id = $7 RETURNING *", [name, bio, social, profilePhotoArray, phone, email, id]);

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
        res.status(500).json({ message: "error" });
    }



})

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

app.get('/user_detail/:iid', async (req, res) => {
    const { iid } = req.params;

    try {

        const result = await db.query("SELECT * FROM user_profile WHERE user_id = $1", [iid]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(result.rows[0]);
        console.log(result.rows);



    } catch (error) {
        res.json({ message: "error" })
        console.log(error);
    }
})

// ------------------x-----------

app.post('/listingPost/:id', async (req, res) => {
    // const id= req.user.id;
    const { id } = req.params;
    const { title, type, address, addedPhotos, description, price, isSameDay, eventDate, checkIn, checkOut, time, guests, perks } = req.body;

    try {
        const result = await db.query("INSERT INTO listings (title,type,address, added_photos, description, price, is_same_day, perks, event_date, check_in, check_out, time,user_id,guests) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [title, type, address, addedPhotos, description, price, isSameDay, perks, eventDate, checkIn, checkOut, time, id, guests]);
        const place = result.rows[0];
        console.log(place)
        res.status(201).json({ place });
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})
app.get('/listingPost/:id', async (req, res) => {
    // const id= req.user.id;
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM listings WHERE user_id = $1 ORDER BY id ASC", [id]);
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}
)
app.get('/listing/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM listings WHERE id = $1 ORDER BY id ASC", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}
)
app.get('/listings', async (req, res) => {

    try {
        const result = await db.query("SELECT * FROM listings ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}
)

app.put('/listing/:id', async (req, res) => {
    const { id } = req.params;
    const { title, type, address, addedPhotos, description, price, isSameDay, eventDate, checkIn, checkOut, time, guests, perks } = req.body;
    try {
        const result = await db.query("UPDATE listings SET title = $1, type = $2, address = $3, added_photos = $4, description = $5, price = $6, is_same_day = $7, perks = $8, event_date = $9, check_in = $10, check_out = $11, time = $12, guests = $13 WHERE id = $14 RETURNING *", [title, type, address, addedPhotos, description, price, isSameDay, perks, eventDate, checkIn, checkOut, time, guests, id]);
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
    }
})





// app.get('/listingsIndex', async (req, res) => {
//     const { page = 1, limit = 12 } = req.query; // Default to page 1 and limit of 12

//     try {
//         const offset = (page - 1) * limit; // Calculate the offset
//         const listingsQuery = `
//         SELECT *
//         FROM listings
//         ORDER BY id ASC
//         LIMIT $1 OFFSET $2
//       `;

//         const { rows } = await db.query(listingsQuery, [limit, offset]);
//         const countQuery = `SELECT COUNT(*) FROM listings`;
//         const { rows: countRows } = await db.query(countQuery);

//         const totalListings = parseInt(countRows[0].count, 10);
//         const totalPages = Math.ceil(totalListings / limit);

//         res.json({
//             listings: rows,
//             totalPages,
//             currentPage: parseInt(page, 10),
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



app.get('/sortIndex', async (req, res) => {
    const { page = 1, limit = 12, sort = 'id' } = req.query;  
    let order = 'ASC';
    let sortColumn = 'id';

     
    if (sort === 'newest') {
        sortColumn = 'id';
        order = 'DESC';
    } else if (sort === 'oldest') {
        sortColumn = 'id';
        order = 'ASC';
    } else if (sort === 'high_to_low') {
        sortColumn = 'price'; 
        order = 'DESC';
    } else if (sort === 'low_to_high') {
        sortColumn = 'price';
        order = 'ASC';
    }

    try {
        const offset = (page - 1) * limit;  
        const listingsQuery = `
            SELECT *
            FROM listings
            ORDER BY ${sortColumn} ${order}
            LIMIT $1 OFFSET $2
        `;

        const { rows } = await db.query(listingsQuery, [limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM listings`;
        const { rows: countRows } = await db.query(countQuery);

        const totalListings = parseInt(countRows[0].count, 10);
        const totalPages = Math.ceil(totalListings / limit);

        res.json({
            listings: rows,
            totalPages,
            currentPage: parseInt(page, 10),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get("/searchPlace/:searchText", async (req, res) => {

    const { searchText } = req.params;
    const { page = 1, limit = 6,sort="id" } = req.query;

    let order = 'ASC';
    let sortColumn = 'id';

     
    if (sort === 'newest') {
        sortColumn = 'id';
        order = 'DESC';
    } else if (sort === 'oldest') {
        sortColumn = 'id';
        order = 'ASC';
    } else if (sort === 'high_to_low') {
        sortColumn = 'price'; 
        order = 'DESC';
    } else if (sort === 'low_to_high') {
        sortColumn = 'price';
        order = 'ASC';
    }

    try {
        console.log(searchText);
        const normalizedSearchText = searchText.replace(/ /g, ' & ');

        const result = await db.query(
            `SELECT * FROM listings 
             WHERE to_tsvector(title || ' ' || description || ' ' || address) @@ to_tsquery($1) 
             ORDER BY ${sortColumn} ${order} LIMIT $2 OFFSET $3`,
            [normalizedSearchText, limit, (page - 1) * limit]
        );

        const countQuery = `
        SELECT COUNT(*) FROM listings
        WHERE to_tsvector(title || ' ' || description || ' ' || address) @@ to_tsquery($1)
    `;

        const { rows: countRows } = await db.query(countQuery, [normalizedSearchText]);
        const totalListings = parseInt(countRows[0].count, 10);
        const totalPages = Math.ceil(totalListings / limit);

        res.json({
            listings: result.rows,
            totalPages,
            currentPage: parseInt(page, 10),
        });


    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while searching for listings.");
    }

})







// -------------xxxxxxxxxxxxx------------------


app.post('/orders', async (req, res) => {
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });


    const options = req.body;

    try {
        const response = await razorpay.orders.create(options);
        // res.json({
        //     // order_id:response.id,
        //     // currency:response.currency,
        //     // amount:response.amount

        // })
        console.log(response);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Error creating order" })
    }
})


app.get("/payment/:paymentId", async (req, res) => {
    const { paymentId } = req.params;
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });


    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency,
        })


    } catch (error) {
        res.json({ message: "Error fetching payment" })
    }

})

app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature" });
    }
    res.json({
        message: "Payment successful",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
    })
})


// ----------------xxxxxxxxxx----------------

app.post('/booking/:id', async (req, res) => {
    const { user_id, name, guests, email, phone, note, paymentId, orderId, signature } = req.body;
    const { id } = req.params;

    try {
        // Ensure these fields are either valid strings or null
        const sanitizedOrderId = orderId || null;
        const sanitizedPaymentId = paymentId || null;
        const sanitizedSignature = signature || null;
        console.log(paymentId, orderId, signature)

        const result = await db.query(
            "INSERT INTO booking (name, guest_num, email, phone_no, note, user_id, place_id, razorpay_order_id, razorpay_payment_id, razorpay_signature) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [name, guests, email, phone, note, user_id, id, sanitizedOrderId, sanitizedPaymentId, sanitizedSignature]
        );

        // Check if booking was successfully inserted
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Return the newly inserted booking data
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting booking:", error);
        res.status(500).json({ message: "Error inserting booking" });
    }
});



app.put("/bookingEdit/:id", async (req, res) => {
    const { id } = req.params;
    const { user_id, name, guests, email, phone } = req.body;
    try {

        const response = await db.query("UPDATE booking SET name=$1, guest_num = $2, email = $3, phone_no = $4 WHERE user_id = $5 AND place_id = $6 AND guest_num = $7 RETURNING * ", [name, guests, email, phone, user_id, id, guests]);
        console.log(response.rows[0]);
        res.json(response.rows[0]);

    } catch (error) {
        console.log(error);

    }

})


// -------------xxxxxxxxxxxx------------

app.get("/orders/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.query("SELECT * FROM booking WHERE user_id = $1", [id]);
        if (response.rows.length > 0) {
            res.json(response.rows);
        } else {
            res.status(404).json({ message: "No orders found for this user" });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: "An error occurred while fetching orders", error });
    }
});


app.get("/orders/:user_id/:place_id", async (req, res) => {
    const { user_id, place_id } = req.params;
    try {
        const response = await db.query(
            "SELECT * FROM booking WHERE user_id = $1 AND place_id = $2",
            [user_id, place_id]
        );
        if (response.rows.length > 0) {
            res.json(response.rows);
        } else {
            res.status(404).json({ message: "No orders found for this user and place" });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: "An error occurred while fetching orders", error });
    }
});


app.get('/booking_details/:place_id', async (req, res) => {
    const { place_id } = req.params;
    try {
        const result = await db.query("SELECT * FROM listings WHERE id = $1 ORDER BY id DESC", [place_id]);
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}
)





// ------------xxxxxxxxxx--------------

app.get('/checkOrderForHost/:placeId', async (req, res) => {
    const { placeId } = req.params;

    try {
        const result = await db.query("SELECT * FROM booking WHERE place_id = $1", [placeId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No orders found for this place" })
        }
        res.json(result.rows);
    } catch (error) {
        console.log(error);

    }
})



app.listen(port, () => {
    console.log("Server is running on port 4000");
})

// 988