import { useContext, useEffect, useState } from "react";
import Header from "./miniComponents/Header";
import Sidebar from "./miniComponents/Sidebar";

import { UserContext } from "../UserContex";
import OrderDisplay from "./miniComponents/orderDispay";


export default function Order() {

    const { user } = useContext(UserContext)
    const [orderData, setOrderData] = useState([]);
    const [listingData, setListingData] = useState([]);
    const [error, setError] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (user && user.id) {

                    const { id } = user;
                    const response = await fetch(`http://localhost:4000/orders/${id}`, {
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
                    setReady(true);
                } else {
                    throw new Error('Profile or user_id is undefined');
                }
            } catch (error) {
                console.error('Error fetching order:', error.message);
                setError(error.message);
            }
        }

        fetchOrder();
    }, [user]);


 


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Array.isArray(orderData) && orderData.length > 0) {
                    const fetchPromises = orderData.map(async (order) => {
                        if (order.user_id) {
                            const { place_id } = order;
                            const response = await fetch(`http://localhost:4000/booking_details/${place_id}`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            });
                            if (!response.ok) {
                                throw new Error('Failed to fetch listing data');
                            }
                            const data = await response.json();
                            return data; // Return the fetched data
                        } else {
                            throw new Error('Order data or user_id is undefined');
                        }
                    });
    
                    // Wait for all fetch requests to complete
                    const allData = await Promise.all(fetchPromises);
    
                    // Combine all fetched data into a single array
                    setListingData(allData);
                    console.log(allData);
                    setReady(false); // Set ready to false after data is fetched
                } else {
                    throw new Error('Order data is empty or undefined');
                }
            } catch (error) {
                console.error('Error fetching listing data:', error);
                setError(error.message);
            }
        };
    
        if (ready) {
            fetchData();
        }
    }, [orderData, ready]);
    


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className=" mx-auto p-4 w-11/12 ">
                    {/* {error ? (
                        <p>Error: {error}</p>
                    ) : orderData.length > 0 ? (
                        orderData.map(order => (
                            <div key={order.id}>
                                <p>Name: {order.name}</p>
                                <p>Email: {order.email}</p>
                                <p>place_id:{order.place_id}</p>

                                
                            </div>
                        ))
                    ) : (
                        <p>No orders found</p>
                    )} */}

                  <OrderDisplay orderData={listingData} urData={orderData}/>

                </main>
            </div>
        </div>
    )
}