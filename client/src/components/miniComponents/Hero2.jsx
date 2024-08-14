import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContex"
import Footer from "../../Footer";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from "react-router-dom";

export default function Hero2({ place_id, hostId }) {

    const { user } = useContext(UserContext)
    const {id} = useParams();


    const [orderData, setOrderData] = useState([]);

    const [error, setError] = useState(null);
    const [editPermission, setEditPermission] = useState(false);
    const [name, setName] = useState('');
    const [guests, setGuests] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [refreshData, setRefreshData] = useState(false);

  

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (user && user.id) {

                    const { id } = user;
                    const response = await fetch(`http://localhost:4000/orders/${id}/${place_id}`, {
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
                    setName(data[0].name);
                    setGuests(data[0].guest_num);
                    setEmail(data[0].email);
                    setPhone(data[0].phone_no);
                    // setReady(true);
                } else {
                    throw new Error('Profile or user_id is undefined');
                }
            } catch (error) {
                console.error('Error fetching order:', error.message);
                setError(error.message);
            }
        }

        fetchOrder();
    }, [user, place_id,refreshData]);

    const toggleEditPermission = () => {
        setEditPermission(prevState => !prevState);
    };

    async function editOrder() {
         try {
            const response = await fetch(`http://localhost:4000/bookingEdit/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    user_id: user.id,
                    name,
                    guests,
                    email,
                    phone,
                })
            });
            
            const data = await response.json();
            setOrderData(data);
             setEditPermission(false);
             setRefreshData(true);
            //  window.location.reload();
         } catch (error) {
            console.log(error);
         }
    }


    return (
        <div className="grid grid-cols-1 ">
            <div className="flex items-baseline gap-4">

                <h1 className="text-4xl underline">Reservation Details</h1>
                <div className="cursor-pointer" onClick={toggleEditPermission}>
                    <EditIcon />
                </div>

            </div>

            {error && <p>Error: {error}</p>}
            {!editPermission && orderData.length > 0 ? (
                orderData.map((order, index) => (
                    <div className="text-lg mt-4 " key={index}>
                        <p>Name: {order.name}</p>
                        <p>For {order.guest_num} guests </p>
                        <p> Email: {order.email} </p>
                        <p>Phone: {order.phone_no} </p>
                        <p>Order id : {order.razorpay_order_id} </p>

                    </div>
                ))
            ) : (
                <div>
                    <div className="w-9/12 ">
                        <div className="grid lg:grid-cols-[1fr_6fr] items-center">
                            <label className="text-lg" > Name :</label>
                            <input className="bg-transparent outline-none" type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
                        </div>
                        <div className="grid lg:grid-cols-[1fr_6fr] items-center">
                            <label className="text-lg" >Guests :</label>
                            <input className="bg-black bg-opacity-30 outline-none" type="text" value={guests} readOnly />
                        </div>
                        <div className="grid lg:grid-cols-[1fr_6fr] items-center">
                            <label className="text-lg" > Email :</label>
                            <input className="bg-transparent outline-none" type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                        </div>
                        <div className="grid lg:grid-cols-[1fr_6fr] items-center">
                            <label className="text-lg" > Phone :</label>
                            <input className="bg-transparent outline-none" type="text" value={phone} onChange={(ev) => setPhone(ev.target.value)} />
                        </div>


                        <div className="flex items-end justify-end">
                            <div className=" bg-primary w-min px-6 py-2 rounded-xl items-end cursor-pointer  "
                                onClick={editOrder}>
                                Edit
                            </div>

                        </div>
                    </div>



                </div>
            )}


        </div>
    )
}