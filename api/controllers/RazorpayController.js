
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


export {orders};