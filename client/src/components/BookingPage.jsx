import Header from "../Header";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookingInput from "./miniComponents/BookingInput";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContex";
import Razorpay from "./Razorpay";
import { useParams } from "react-router-dom";


export default function BookingPage({ onChange, data, eventDate, checkInDate, }) {



    const {id} = useParams();
    const { user, profile } = useContext(UserContext);
    const [name, setName] = useState(profile.name)
    const [guests, setGuests] = useState(1)
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState(user.email)
    const [note, setNote] = useState("")
   
    const [responseState, setResponseState] = useState([])
    const[verify_Payment_Signature, setVerify_Payment_Signature] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [paymentId, setPaymentId] = useState("")
    const [signature, setSignature] = useState('');
    const [verification, setVerification] = useState(false);





    const priceNum = Number(data.price);
    let twentyPercent = priceNum * 0.2;
    const totalPrice = (Number(data.price) + twentyPercent).toFixed(0);

    useEffect(() => {
        const postBooking = async () => {
            try {
                console.log("check" + orderId, paymentId, signature);
                const response = await fetch(`http://localhost:4000/booking/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        name,
                        guests,
                        email,
                        phone,
                        note,
                        orderId,
                        paymentId,
                        signature,
                        
                    }),
                });
                const data = await response.json();
                console.log('Payment verification response:', data);
                setVerification(true);
                setResponseState(data);
    
                // Clear state values
                setOrderId('');
                setPaymentId('');
                setSignature('');
                setVerify_Payment_Signature([]);
            } catch (error) {
                console.log(error);
            }
        };
    
        if (verify_Payment_Signature && verify_Payment_Signature.message === "Payment successful") {
            postBooking();
        } else {
            console.log(verify_Payment_Signature);
            console.log("Payment Signature not verified");
        }
    }, [verify_Payment_Signature]);
   

    if (verification) {
        window.location.href = "http://localhost:5173/Dashboard/Orders";
    }

    return (
        <div className="">
            <Header />

            <div className="w-full h-95vh grid grid-cols-[1fr_2fr] bg-cover " style={{ backgroundImage: `url(http://localhost:4000/uploads/${data.added_photos[0]})` }}>

                <div className="flex flex-col items-center justify-start pt-20   ">

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


                <div className="grid grid-cols-[3fr_2fr]  bg-slate-100 rounded-l-3xl backdrop-blur-xl bg-white/30 ... gap-8">
                    <div className=" relative flex flex-col justify-start items-center px-8">


                        <h1 className="absolute z-10 top-6 left-4 cursor-pointer" onClick={() => onChange(false)}>
                            <ArrowBackIosNewIcon />
                        </h1>

                        <div className="my-12">
                            <h1 className="text-3xl text-slate-800">Booking Details</h1>

                        </div>
                        <BookingInput name={name} setName={setName} email={email} setEmail={setEmail} guests={guests} setGuests={setGuests} phone={phone} setPhone={setPhone} note={note} setNote={setNote}/>


                    </div>
                    <div className="grid py-12">
                       <Razorpay data={data} twentyPercent={twentyPercent} totalPrice={totalPrice} setOrderId={setOrderId} paymentId={paymentId} setPaymentId={setPaymentId} setSignature={setSignature} setResponseState={setResponseState} setVerify_Payment_Signature={setVerify_Payment_Signature} />
                    </div>
                </div>

            </div>






        </div>
    )
}