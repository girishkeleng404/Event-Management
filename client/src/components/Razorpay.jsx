import axios from "axios";
import { useEffect, useState } from "react";

export default function Razorpay({data,totalPrice,twentyPercent,setOrderId,paymentId, setPaymentId, setSignature, setResponseState, setVerify_Payment_Signature,guests}) {



    const [paymentIdd, setPaymentIdd] = useState("")
    // const [responseState, setResponseState] = useState([])
    const [order, setOrder] = useState(null);

    const amount =guests*(totalPrice*100);
    const currency = "INR";
    const receiptId = 'mkLove';

    const totalPriceAfter = (Number((data.price)*guests) + twentyPercent).toFixed(0);



    useEffect(() => {
        // Load the Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
            fetchOrder();
        }
         
        return () => {
            document.body.removeChild(script);
        };
    }, []);






    const fetchOrder = async () => {
        try {
            const response = await fetch('http://localhost:4000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount, 
                    currency,
                    receipt: receiptId,
                }),
            });
            const data = await response.json();
            console.log('Order data:', data);
            setOrder(data);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

   
useEffect(()=>{
    if(paymentIdd){
      axios.get(`http://localhost:4000/payment/${paymentIdd}`)
      .then((response)=>{
         console.log(response.data)
         setResponseState(response.data)
      })
      .catch((error)=>{
          console.log(error)
      })
    }
},[paymentIdd])


    async function paymentHandler(e) {

        e.preventDefault();
        
        
        if (!order) {
            alert('Order not created yet. Please wait.');
            return;
        }
  
        let options = {
            "key": "rzp_test_ez6jFmqS6M89Oi",
             amount, 
             currency,
            "name": "Air Corp", 
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id,
            "handler": async function (response){
                setOrderId(response.razorpay_order_id);
                setPaymentId(response.razorpay_payment_id);
                setPaymentIdd(response.razorpay_payment_id);
                setSignature(response.razorpay_signature);
            
                // Log updated state values
                console.log('Order ID set to:', response.razorpay_order_id);
                console.log('Payment ID set to:', response.razorpay_payment_id);
                console.log('Signature set to:', response.razorpay_signature);

                const body ={
                    ...response,
                }
                const validateRes =  await fetch("http://localhost:4000/order/validate",{
                    method:"POST",
                    body:JSON.stringify(body),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const jsonRes = await validateRes.json();
                setVerify_Payment_Signature(jsonRes)
                console.log(jsonRes)
            },
            "prefill": { 
                "name": `pussy`,  
                "email":"llll@gmail.com", 
                "contact": "9999999978" 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });

        rzp1.open();
       
    }



    return(
        <div>
         <div className="flex flex-col gap-4 w-9/12 mx-auto  ">
                            <div className="flex gap-2">
                                <span className="text-lg">Price : {guests} x </span>
                                <div className="text-lg"> ₹{data.price} </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-lg">Service tax: </span>
                                <div className="text-lg"> ₹{twentyPercent} </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-xl">Total Price : </span>
                                <div className="text-xl"> ₹{totalPriceAfter} </div>
                            </div>

                            <button className="bg-primary" onClick={paymentHandler}>Pay</button>
                        </div>
        </div>
    )
}