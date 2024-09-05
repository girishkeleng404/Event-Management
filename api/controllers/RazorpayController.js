
import Razorpay from "razorpay";

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


export {orders, paymentByPaymentId};