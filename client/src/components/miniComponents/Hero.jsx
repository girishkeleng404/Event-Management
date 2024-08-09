import axios from "axios"
import { useEffect, useState } from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Hero2 from "./Hero2";
import Hero3 from "./Hero3";
import Footer from "../../Footer";



export default function Hero({ id }) {

    const [listingData, setListingData] = useState([])
    const [hostId, setHostId] = useState()



    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`/listing/${id}`, { withCredentials: true }).then(response => {
                    console.log(response.data)
                    setListingData(response.data)
                    setHostId(response.data.user_id);

                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const eventDate = (listingData.event_date ? listingData.event_date.split('T')[0] : null)
    const checkInDate = (listingData.check_in ? listingData.check_in.split('T')[0] : null)
    // const addedDate = (profile.created_at ? profile.created_at.split('T')[0] : null)

    return (
        <div className="hero">
            <div className="relative">

                {listingData.added_photos && listingData.added_photos.length > 0 && (
                    <div className="absolute h-screen top-0 left-0 lg:h-screen ">
                        <img
                            className="w-screen h-screen object-cover filter brightness-50  "
                            src={`http://localhost:4000/uploads/${listingData.added_photos[0]}`}
                            alt={listingData.title || "Listing Image"}
                        />



                    </div>

                )}

                <div className="relative z-10 text-white flex flex-col pt-12 pl-12 backdrop-blur-xl bg-white/30  h-screen " >
                    <div className="flex flex-col items-start gap-8">
                        <h1 className=" text-2xl lg:text-7xl capitalize"> {listingData.title} </h1>
                        <h2 className="hidden md:block text-md "> {listingData.description} </h2>
                        <div>
                            {/* <h1>Price: {listingData.price}</h1> */}
                            <div className="flex items-center gap-8 my-4">
                                <div className="flex items-center">
                                    <LocationOnIcon />
                                    <a className="block text-xl underline capitalize " target="_blank" href={"https://www.google.com/maps/?q=" + listingData.address}> {" " + listingData.address}</a>
                                </div>

                                <div>
                                    {listingData.is_same_day ? <h1>Event date: {eventDate}</h1> : <h1>Start Date: {checkInDate}</h1>}

                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] mt-8 lg:mt-16 gap-20 pl-8">

                                <Hero2 place_id={id} hostId={hostId} />

                                <Hero3 place_id={id} iid={hostId} />
                            </div>



                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}