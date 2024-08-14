import { useContext, useEffect, useState } from "react";
import Header from "./miniComponents/HeaderSm";
import Sidebar from "./miniComponents/Sidebar";
import { UserContext } from "../UserContex";
import { useParams } from "react-router-dom";



export default function OrderInbox() {

    const {user} = useContext(UserContext);
    const [placeData, setPlaceData] = useState([]);

    useEffect(() => {

        async function fetchData() {

            try {
                const {id} = user;
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



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="mx-auto w-11/12 p-4 flex flex-col bg-slate-200">
                    <div className="grid grid-cols-4 gap-8">
                      {placeData.length >0 && placeData.map((item,inx)=>(
                        <div key={inx}>
                            <p className="text-lg"> {item.title} </p>

                            <img src={ `http://localhost:4000/uploads/${item.added_photos[0]}`} alt="" />
                        </div>
                      ))}

                    </div>

                </main>
            </div>
        </div>
    )
}