import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Hero3({ id, iid }) {


    const [profile, setProfile] = useState([])

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

    return (
        <div className="pb-4">
            <p className="text-4xl underline">Host details:</p>

            <div className="flex items-center gap-4 my-4">
                <img src={`http://localhost:4000/uploads/${profile.photos}`} alt="" className="h-16 w-16 rounded-full" />

                {/* <Link to={`/UserProfile/${listingData.user_id}`} className="text-xl align-baseline cursor-pointer capitalize">{profile.name}</Link> */}
            </div>
            <Link to={`/UserProfile/${profile.user_id}`} className="text-lg">Name : {profile.name} </Link>
            <p className="text-lg" >email : {profile.email} </p>
            <p className="text-lg" >Social : {profile.social_media_link}</p>
            <p className="text-lg" >Phone: {profile.phone} </p>

             <p className="hidden md:block text-md ">  {profile.bio} </p>
        </div>
    )
}