import { Link } from "react-router-dom";

export default function OrderDisplay({ orderData, urData }) {

    const extractedDates = orderData.map((item, index) => ({
        eventDate: item.event_date ? item.event_date.split('T')[0] : null,
        checkInDate: item.check_in ? item.check_in.split('T')[0] : null,
    }));

    // const addedDate = (profile.created_at ? profile.created_at.split('T')[0] : null)


    return (
        <div className="w-11/12 grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* {urData.map((userData, inx) => ( 
                <Link to={`/orderDetails/${userData.id}`} key={inx}> */}

                    {orderData.map((listingArray, inx) => (
                        <div className=" " key={inx}>




                            {listingArray.map((listing, inx) => (
                                <Link to={`/orderDetails/${listing.id}`}  key={inx} className="grid lg:grid-cols-[2fr_6fr] gap-8 grid-cols-[2fr_3fr] ">


                                    <div className="lg:w-44 aspect-square overflow-hidden">
                                        <img className="aspect-square w-44" key={inx} src={`http://localhost:4000/uploads/${listing.added_photos[0]}`} alt="" />
                                    </div>


                                    <div className="">
                                        <p className="lg:text-xl text-lg capitalize">{listing.title}</p>
                                        <p className="lg:text-lg">{listing.address}</p>
                                        {/* <p>{listing.description}</p> */}

                                        {listing.event_date && (listing.event_date.split('T')[0])}
                                        {listing.check_in && (listing.check_in.split('T')[0])}


                                        {/* {urData && urData.length > 0 && urData.map((userData, inx) => (

                                    (userData.place_id === listing.id) && (
                                        <div key={inx}>

                                            <p>For {userData.guest_num} guests </p>


                                        </div>
                                    )
                                ))} */}

                                        {/* {urData && urData.length > 0 && urData
                                    .filter(userData => userData.place_id === listing.id)
                                    .map((userData, i) => (
                                        <div key={i}>
                                            <p>For {userData.guest_num} guests</p>
                                        </div>
                                    ))
                                } */}



                                    </div>

                                </Link>
                            ))}








                        </div>


                    ))}
                {/* </Link>
            ))} */}
        </div>
    )
}