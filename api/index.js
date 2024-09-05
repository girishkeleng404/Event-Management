import express from "express"
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import multer from "multer";
import imageDownloader from "image-downloader";
import path from "path";
import { fileURLToPath } from "url";
import { generateAuthToken } from "./auth.js";
import fs from "fs";
import cookieParser from "cookie-parser";
import { callbackify } from "util";
import OpenIDConnectStrategy from "passport-openidconnect";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import env from "dotenv"
import razorpay from "razorpay";
import Razorpay from "razorpay";
import crypto from "crypto";


import authRoute from './routes/authRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import userRoute from './routes/userRoute.js'
import profileRoute from './routes/profileRoute.js'
import otpRoute from './routes/otpRoute.js'
import listingRoute from './routes/listingRoute.js'
import ISFS_Route from './routes/ISFS_Route.js'
import RazorpayRoute from './routes/RazorpayRoute.js'

import passport from './config/passport_config.js'
import db from "./config/database.js";


env.config();

const app = express();
const port = 4000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secretKey = process.env.JWT_SECTET_KEY;

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

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/data', (req, res) => {
    res.json({ message: "Success" });
})

// authentication routes
app.use(authRoute);

// logout route
app.use(logoutRoute);

// all user routes
app.use(userRoute);

// otp routes
app.use(otpRoute);




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


// ------------xxxxx----------------
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

// --------------xxxxxxxxxxx----------------

// All profileRoutes
app.use(profileRoute);

// used by NewAds.jsx and Adds.jsx in clientSide
app.use(listingRoute);

// ------------------x-----------\
// to short and search places
app.use(ISFS_Route);



// -------------xxxxxxxxxxxxx------------------


app.use(RazorpayRoute);

// app.post('/orders', async (req, res) => {
//     const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });


//     const options = req.body;

//     try {
//         const response = await razorpay.orders.create(options);
//         // res.json({
//         //     // order_id:response.id,
//         //     // currency:response.currency,
//         //     // amount:response.amount

//         // })
//         console.log(response);
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ message: "Error creating order" })
//     }
// })


// app.get("/payment/:paymentId", async (req, res) => {
//     const { paymentId } = req.params;
//     const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });


//     try {
//         const payment = await razorpay.payments.fetch(paymentId);

//         if (!payment) {
//             return res.status(404).json({ message: "Payment not found" });
//         }
//         res.json({
//             status: payment.status,
//             method: payment.method,
//             amount: payment.amount,
//             currency: payment.currency,
//         })


//     } catch (error) {
//         res.json({ message: "Error fetching payment" })
//     }

// })

// app.post("/order/validate", async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//     const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//     sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = sha.digest("hex");
//     if (digest !== razorpay_signature) {
//         return res.status(400).json({ message: "Invalid signature" });
//     }
//     res.json({
//         message: "Payment successful",
//         orderId: razorpay_order_id,
//         paymentId: razorpay_payment_id
//     })
// })


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