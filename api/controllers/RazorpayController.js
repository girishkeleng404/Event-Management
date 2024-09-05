
import Razorpay from "razorpay";
import crypto from "crypto";

const orders = async(req,res)=>{
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
}



const paymentByPaymentId = async (req,res)=>{
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
}


const orderValidate = async(req,res)=>{
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
}



export {orders, paymentByPaymentId, orderValidate};