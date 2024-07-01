import { useState } from "react";
import Header from "./miniComponents/Header";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";

export default function NewAds() {

    const [title, setTitle] = useState("");
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isSameDay, setIsSameDay] = useState(false);
    const [perks, setPerks] = useState([]);

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

    return (
        <div className=" ">
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

                <textarea className=" " name="" id="" value={description} onChange={ev=>{setDescription(ev.target.value)}}></textarea>

                {preInput("Price")}
                <input className=" " type="text" value={price} onChange={ev=>{setPrice(ev.target.value)}}/>

                 <div className="flex items-center justify-between">
                     {preInput("Date and time", "Date of your event")}

                     <label className="text-lg text-center flex items-center"> Same day 
                        <input className="mx-4 size-6" type="checkbox" checked={isSameDay} onChange={handleSameDayChange} />
                        </label>  
                 </div>
               
                

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-8">
                    <label className="bg-slate-50 text-center"> {isSameDay? "Event Date : ": "CheckIn : "}

                        <input type="date" className="py-4 bg-inherit  px-2 text-center" />
                    </label>
                 {!isSameDay && (
                     <label className="bg-slate-50 text-center  "> CheckOut :

                        <input type="date" className="py-4 bg-inherit  px-2 text-center " />
                    </label>
                 )}
                   

                    <label className="bg-slate-50 text-center" >Time :

                        <input type="time" className="py-4 bg-inherit  px-2 text-center " />
                    </label>


                </div>
                {preInput("Guests", "Total number of guests allowed")}
                <input type="number" />


                {preInput("Perks", "Select the perks of your place")}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 gap-4">
               <Perks selected={perks} onChange={setPerks}/>
                </div>
             
               



            </div>
        </div>
    );
}