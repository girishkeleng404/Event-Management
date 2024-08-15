import { useContext, useEffect, useState } from "react";
import Header from "./miniComponents/HeaderSm";
import Sidebar from "./miniComponents/Sidebar";
import { UserContext } from "../UserContex";
import { useParams } from "react-router-dom";
import OrderInboxSm from "./miniComponents/OrderInboxSm";



export default function OrderInbox() {

    const { user } = useContext(UserContext);
    const [placeData, setPlaceData] = useState([]);
    const [placeId, setPlaceId] = useState("");
    
    const [showOrder, setShowOrder] = useState(false);

    useEffect(() => {

        async function fetchData() {

            try {
                const { id } = user;
                const response = await fetch(`http://localhost:4000/listingPost/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },

                })

                const data = await response.json();
                setPlaceData(data);

            } catch (error) {
                console.error('Error fetching order:', error.message);
            }
        }

        fetchData();
    }, [])



   

   if(showOrder){
       return(
          <OrderInboxSm  placeId={placeId} showOrder={setShowOrder}/>
           
       )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="mx-auto w-11/12 p-4 flex flex-col bg-slate-200">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {placeData.length > 0 && placeData.map((item, inx) => (
                            <div className="aspect-square lg:h-60 lg:w-80 object-cover cursor-pointer " key={inx} onClick={()=> {setShowOrder(true); setPlaceId(item.id)} }>

                                <p className="text-lg"> {item.title} </p>
                                     
                                <img className=" lg:h-60 lg:w-80 aspect-square overflow-hidden object-cover" src={`http://localhost:4000/uploads/${item.added_photos[0]}`} alt="" />
                            </div>
                        ))}

                    </div>

                </main>
            </div>
        </div>
    )
}