import Header from "../Header";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookingInput from "./miniComponents/BookingInput";


export default function BookingPage({ onChange, data, eventDate, checkInDate }) {
    return (
        <div className="">
            <Header />

            <div className="w-full h-95vh grid grid-cols-[1fr_2fr] bg-cover  " style={{ backgroundImage: `url(http://localhost:4000/uploads/${data.added_photos[0]})` }}>

                <div className="flex flex-col items-center justify-start mt-20">

                    <h1 className="text-3xl text-white"> {data.title} </h1>

                    <div className="flex items-center gap-8 my-4 text-white">
                        <div className="flex items-center ">
                            {/* <LocationOnIcon /> */}
                            <a className="block text-md underline " target="_blank" href={"https://www.google.com/maps/?q=" + data.address}> {" " + data.address}</a>
                        </div>

                        <div>
                            {data.is_same_day ? <h1>Event date: {eventDate}</h1> : <h1>Start Date: {checkInDate}</h1>}

                        </div>
                    </div>
                </div>

                <div className=" relative flex flex-col justify-start items-center bg-slate-100 rounded-l-3xl backdrop-blur-xl bg-white/30 ... gap-8">
                    <h1 className="absolute z-10 top-6 left-4 cursor-pointer" onClick={() => onChange(false)}>
                        <ArrowBackIosNewIcon />
                    </h1>

                    <div className="mt-12">
                        <h1 className="text-3xl text-slate-800">Booking Details</h1>

                    </div>
                    <BookingInput />

                </div>
            </div>






        </div>
    )
}