import db from "../config/database.js";

const bookingById = async (req,res)=>{
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
}

const bookingEditById = async (req,res)=>{
    const { id } = req.params;
    const { user_id, name, guests, email, phone } = req.body;
    try {

        const response = await db.query("UPDATE booking SET name=$1, guest_num = $2, email = $3, phone_no = $4 WHERE user_id = $5 AND place_id = $6 AND guest_num = $7 RETURNING * ", [name, guests, email, phone, user_id, id, guests]);
        console.log(response.rows[0]);
        res.json(response.rows[0]);

    } catch (error) {
        console.log(error);

    }
}

export {bookingById,bookingEditById}