import nodemailer from "nodemailer";
import db from "../config/database.js";

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Generates a 6-digit OTP
}
const emailOTP = async (req, res) => {

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
}


const verifyOTP = async(req,res)=>{

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

}

export { emailOTP, verifyOTP };