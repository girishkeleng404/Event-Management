import { useEffect, useState } from "react";
import HeaderSm from "./HeaderSm";
import Sidebar from "./Sidebar";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
            <div className=" "  >
                <HeaderSm />
                <div className="flex flex-1 ">
                    <Sidebar />

                    <div className="relative">
                        <div className="absolute top-4 left-4" onClick={() => showOrder(false)}>
                            <ArrowBackIosNewIcon />
                        </div>
                    </div>
                    <div className="w-10/12 mx-auto bg-purple-100">
                        
                     {orderData.length && orderData.length>0 && orderData.map((item,inx)=>(
                        <div key={inx}>

                            <p>{item.name}</p>
                        </div>
                     ))}

                    </div>


                </div>
            </div>
        </div>
    )
}