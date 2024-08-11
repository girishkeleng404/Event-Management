import { useEffect, useState } from "react";
import Header from "./miniComponents/Header";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContex";
import { useNavigate, useParams } from "react-router-dom";



export default function NewAds() {



    const { user } = useContext(UserContext)
    const [title, setTitle] = useState("");
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isSameDay, setIsSameDay] = useState(false);
    const [eventDate, setEventDate] = useState(null)
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState('');
    const [perks, setPerks] = useState([]);
    const [redirect, setRedirect] = useState(false)

    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)



    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(`/listing/${id}`, { withCredentials: true })
                console.log(response.data)
                const { data } = response;
                setTitle(data.title)
                setType(response.data.type)
                setAddress(response.data.address)
                setAddedPhotos(response.data.added_photos)
                setDescription(data.description)
                setPrice(response.data.price)
                setIsSameDay(response.data.is_same_day)
                
                setEventDate( data.event_date ? data.event_date.split('T')[0]:null)
                setCheckIn( data.check_in? data.check_in.split('T')[0]:null)
                setCheckOut( data.check_out? data.check_out.split('T')[0]:null)
               
                setGuests(response.data.guests)
                setTime(response.data.time)
                setPerks(response.data.perks)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [id])



    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }
    function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
    }
    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        );
    }

    const handleSameDayChange = (event) => {
        setIsSameDay(event.target.checked);
    };

    const handleClick = (ev) => {
        ev.preventDefault();
        const listingData = {
            title, type, address, addedPhotos, description, price, isSameDay, eventDate, checkIn, checkOut, time, guests, perks
        }

         if(id){
             axios.put(`/listing/${id}`, listingData ).then(response => {
                console.log(response)
                navigate('/Dashboard/Adds');
    
            }).catch(err => {
                console.log(err)
            })
         } else{
            const {id} = user;
            axios.post(`/listingPost/${id}`, { ...listingData }).then(response => {
                console.log(response)
                navigate('/Dashboard/Adds');
    
            }).catch(err => {
                console.log(err)
            })
         }
        





    }


    return (
        <div className="">
            
            <Header />
            <div className=" w-10/12 lg:w-6/12 mx-auto  ">
                {preInput("Title", "Title for your place like a name of you place")}

                <input type="text" className="" placeholder="title" value={title} onChange={ev => setTitle(ev.target.value)} />

                {preInput("Type", "Villa, apartment, house,etc")}
                <input type="text" className=" " placeholder="Apartment" value={type} onChange={ev => { setType(ev.target.value) }} />
                {preInput("Address", "Address of your place")}
                <input type="text" className=" " value={address} onChange={ev => { setAddress(ev.target.value) }} />

                {preInput(
                    "Add a photo",
                    "Click here to add a photo to your place."
                )}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput("Description", "Description of your place")}

                <textarea className=" " name="" id="" value={description} onChange={ev => { setDescription(ev.target.value) }}></textarea>

                {preInput("Price")}
                <input className=" " type="text" value={price} onChange={ev => { setPrice(ev.target.value) }} />

                <div className="flex items-center justify-between">
                    {preInput("Date and time", "Date of your event")}

                    <label className="text-lg text-center flex items-center"> Same day
                        <input className="mx-4 size-6" type="checkbox" checked={isSameDay} onChange={handleSameDayChange} />
                    </label>
                </div>



                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-8">
                    <label className="bg-slate-50 text-center"> {isSameDay ? "Event Date : " : "CheckIn : "}

                        <input
                            type="date" className="py-4 bg-inherit  px-2 text-center"
                            onChange={(ev) => isSameDay ? setEventDate(ev.target.value) : setCheckIn(ev.target.value)}
                            value={isSameDay ? eventDate : checkIn}
                        />
                    </label>
                    {!isSameDay && (
                        <label className="bg-slate-50 text-center  "> CheckOut :

                            <input type="date" className="py-4 bg-inherit  px-2 text-center " onChange={(e) => setCheckOut(e.target.value)}
                                value={checkOut}
                            />
                        </label>
                    )}


                    <label className="bg-slate-50 text-center" >Time :

                        <input onChange={ev => setTime(ev.target.value)} type="time" className="py-4 bg-inherit  px-2 text-center "
                            value={time}
                        />
                    </label>


                </div>
                {preInput("Guests", "Total number of guests allowed")}
                <input onChange={ev => setGuests(ev.target.value)} type="number"
                    value={guests} />


                {preInput("Perks", "Select the perks of your place")}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-4">
                    <Perks selected={perks} onChange={setPerks} />
                </div>




                <button onClick={handleClick} className="bg-primary py-2 px-3 my-8 rounded-lg text-white">Submit</button>
            </div>

        </div>
    );
}