import { useEffect, useState } from "react";
import HeaderSm from "./HeaderSm";
import Sidebar from "./Sidebar";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from "react-router-dom";

export default function OrderInboxSm({ placeId, showOrder }) {

    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/checkOrderForHost/${placeId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json();
                setOrderData(data);

            } catch (error) {
                console.log('Error fetching order:', error.message);
            }
        }

        fetchOrderData();
    }, [])

    return (
        <div>
            <div className=""  >
                <HeaderSm />
                <div className="flex flex-1 ">
                    <Sidebar />

                    <div className="relative">
                        <div className="absolute top-1 left-2" onClick={() => showOrder(false)}>
                            <ArrowBackIosNewIcon />
                        </div>
                    </div>
                    <div className="w-9/12 mx-auto ">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-4">

                           

                            {orderData && orderData.length > 0 && orderData.map((item, inx) => (
                                <div key={inx} className="bg-slate-50 py-2 px-4 rounded-md">

                                    <Link to={`/UserProfile/${item.user_id}`} className="text-lg">Booked by {item.name}</Link>
                                    <p>Contact No:  {item.phone_no} </p>
                                    <p> Email:  {item.email} </p>
                                    <p> payment_Id :  {item.razorpay_payment_id} </p>
                                    <p> Order_Id :  {item.razorpay_order_id} </p>
                                    <p></p>



                                </div>
                            ))}
                             {orderData.length === 0 && (
                                <div className="text-center text-2xl col-span-4 bg-red-500">
                                    No orders found for this place
                                </div>
                            )}

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}