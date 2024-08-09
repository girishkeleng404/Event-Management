import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { UserContext } from "../UserContex";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Perks from "../Perks";
import PerksDis from "../PerksDis";
import Footer from "../Footer";
import BookingPage from "./BookingPage";


export default function DetailsPage() {

    const { user } = useContext(UserContext)
    const { id } = useParams();
    const [listingData, setListingData] = useState([])
    const [iid, setIid] = useState()
    const [profile, setProfile] = useState([])
    const [book, setBook] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`/listing/${id}`, { withCredentials: true }).then(response => {
                    console.log(response.data)
                    setListingData(response.data)
                    setIid(response.data.user_id);
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            try {
                await axios.get(`/user_detail/${iid}`, { withCredentials: true }).then(response => {
                    console.log(response.data)
                    setProfile(response.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [iid])



    const eventDate = (listingData.event_date ? listingData.event_date.split('T')[0] : null)
    const checkInDate = (listingData.check_in ? listingData.check_in.split('T')[0] : null)
    const addedDate = (profile.created_at ? profile.created_at.split('T')[0] : null)

    if (book) {
        return (
            <div>
                {/* <Header /> */}
                <BookingPage onChange={setBook} data={listingData} eventDate={eventDate} checkInDate={checkInDate} />
            </div>
        )
    }


    return (


        <div className="overflow-x-hidden h-screen">
            <Header />
            <div className=" bg-slate-100 m-auto relative flex flex-col justify-between ">

                {listingData.added_photos && listingData.added_photos.length > 0 && (
                    <div className="absolute top-0 left-0 h-screen">
                        <img className=" w-screen h-4/6 object-cover filter brightness-50" src={`http://localhost:4000/uploads/${listingData.added_photos[0]}`} alt={`Photo of `} />
                        <div className="w-10/12 lg:w-8/12 mx-auto my-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr]  gap-20 ">

                            <div>
                                <h1 className="text-2xl my-4">About the place</h1>
                                <p>{listingData.description} </p>
                                <div className="my-8">
                                    <h1 className="text-2xl my-4">perks</h1>


                                    <PerksDis selected={listingData.perks} display={true} />

                                </div>
                            </div>
                            <div >



                                <div>
                                    <h1 className="text-3xl my-4">Know your host</h1>
                                </div>
                                <div className=" py-2 px-6 backdrop-blur bg-slate-100 rounded-xl shadow-lg ">

                                    <div className="flex items-center justify-between ">


                                        <div className="flex items-center gap-4 my-4">
                                            <img src={`http://localhost:4000/uploads/${profile.photos}`} alt="" className="h-16 w-16 rounded-full" />

                                            <Link to={`/UserProfile/${listingData.user_id}`} className="text-xl align-baseline cursor-pointer capitalize">{profile.name}</Link>
                                        </div>
                                        <div>
                                            <h1> {addedDate} </h1>

                                        </div>
                                    </div>



                                    <h1> {profile.bio} </h1>
                                    {/* <h1> {profile.social_media_link} </h1> */}
                                </div>
                            </div>


                        </div>
                        <Footer />
                    </div>
                )}

                <div className="relative z-10 text-white flex flex-col pt-12 pl-12 ">


                    <div className="flex flex-col items-start gap-8">
                        <h1 className=" text-2xl lg:text-7xl"> {listingData.title} </h1>
                        <h2 className="hidden md:block text-md "> {listingData.description} </h2>
                        <div>
                            {/* <h1>Price: {listingData.price}</h1> */}
                            <div className="flex items-center gap-8 my-4">
                                <div className="flex items-center">
                                    <LocationOnIcon />
                                    <a className="block text-xl underline " target="_blank" href={"https://www.google.com/maps/?q=" + listingData.address}> {" " + listingData.address}</a>
                                </div>

                                <div>
                                    {listingData.is_same_day ? <h1>Event date: {eventDate}</h1> : <h1>Start Date: {checkInDate}</h1>}

                                </div>
                            </div>



                            {/* <button className="bg-primary py-2 px-4 my-4 rounded-lg mr-4">Host info</button> */}
                            <div className="grid grid-cols-2 items-center gap-12">
                                <button onClick={() => setBook(true)} className="py-2 px-8 my-4 rounded-lg bg-primary">Reserve</button>
                                <div className="flex gap-4 text-xl">
                                    <span>Price:</span>
                                    <div className="text-xl"> ₹ {listingData.price}  </div>
                                </div>

                            </div>

                        </div>
                    </div>




                </div>

            </div>



        </div>


    )
}