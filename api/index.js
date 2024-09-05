import express from "express"
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import env from "dotenv"

import authRoute from './routes/authRoute.js'
import logoutRoute from './routes/logoutRoute.js'
import userRoute from './routes/userRoute.js'
import profileRoute from './routes/profileRoute.js'
import otpRoute from './routes/otpRoute.js'
import listingRoute from './routes/listingRoute.js'
import ISFS_Route from './routes/ISFS_Route.js'
import RazorpayRoute from './routes/RazorpayRoute.js'
import imageUploadRoute from './routes/imageUploadRoute.js'
import bookingRoute from './routes/bookingRoute.js'
import orderRoute from './routes/orderRoute.js'

import passport from './config/passport_config.js'
import db from "./config/database.js";


env.config();

const app = express();
const port = 4000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: 'Strict',
        maxAge: 3600000,
        httpOnly: true,
        secure: 'auto',

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

// DetailsPage.jsx use this routes in client side
app.use(userRoute);

// otp routes
app.use(otpRoute);

// PhotoUploader and PhotosUploader.jsx use this route in client side
app.use(imageUploadRoute);


// All profileRoutes
app.use(profileRoute);

// used by NewAds.jsx and Adds.jsx in clientSide
app.use(listingRoute);


// to short and search places
app.use(ISFS_Route);


app.use(RazorpayRoute);


app.use(bookingRoute);


app.use(orderRoute);



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