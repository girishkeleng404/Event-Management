import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContex"
import Footer from "../../Footer";


export default function Hero2({place_id,hostId}){

    const {user}= useContext(UserContext)
    

    const [orderData, setOrderData] = useState([]);
  
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (user && user.id) {

                    const { id } = user;
                    const response = await fetch(`http://localhost:4000/orders/${id}/${place_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message);
                    }
                    const data = await response.json();
                    setOrderData(data);
                    // setReady(true);
                } else {
                    throw new Error('Profile or user_id is undefined');
                }
            } catch (error) {
                console.error('Error fetching order:', error.message);
                setError(error.message);
            }
        }

        fetchOrder();
    }, [user,place_id]);

    return(
        <div className="grid grid-cols-1 ">
         <h1 className="text-4xl underline">Reservation Details</h1>
        {error && <p>Error: {error}</p>}
        {orderData.length > 0 ? (
            orderData.map((order, index) => (
                <div className="text-lg mt-4 " key={index}>
                    <p>Name: {order.name}</p>
                    <p>For {order.guest_num} guests </p>
                    <p> Email: {order.email} </p>
                     <p>Phone: {order.phone_no} </p>
                     <p>Order id : {order.razorpay_order_id} </p>
                  
                </div>
            ))
        ) : (
            <p>No orders found.</p>
        )}

    
    </div>
    )
}