import { useContext, useEffect, useState } from "react";
import Header from "../../Header";
import { UserContext } from "../../UserContex";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ProfileHome() {

  const [userData, setUserData] = useState([])
  const [userPlace, setUserPlace] = useState([])
  const { user } = useContext(UserContext)
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {

      try {
        await axios.get(`/profile_detail/${id}`, { withCredentials: true }).then(Response => {
          console.log(Response.data)
          setUserData(Response.data)
        })
      } catch (error) {
        console.log(error)
      }

    }
    fetchData();
  }, [])


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/listingPost/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await response.json();
        setUserPlace(data);

      } catch (error) {
        console.log('Error fetching order:', error.message);
      }
    }

    fetchProfile();
  }, [])

  const addedDate = (userData.created_at ? userData.created_at.split('T')[0] : null)

  return (
    <div className="">
      <Header />
      <div className="lg:w-8/12 m-auto bg-slate-50 h-svh grid lg:grid-cols-[1fr_2fr]">

        <div>
          <div className="flex flex-col justify-start items-center pt-8 px-8 gap-4">
            <img
              src={`http://localhost:4000/uploads/${userData.photos}`}
              alt=""
              className="h-32 rounded-full aspect-square drop-shadow-xl object-cover"
            />
            <div className="capitalize text-lg font-semibold"> {userData.name} </div>
            <div className="text-center text-gray-600">{userData.bio}</div>
          </div>

          <div className="grid px-8 my-6 gap-2">
            <p className="text-left text-gray-700 font-medium">
              <span className="font-semibold">Member Since:</span> {addedDate}
            </p>
            <p className="text-left text-gray-700 font-medium">
              <span className="font-semibold">Total Events Hosted:</span> {userPlace.length}
            </p>
          </div>


          <div className="grid px-6 gap-2 ">
            <p className="text-xl font-semibold">Recent Events</p>
            {userPlace.length > 0 && userPlace.slice(-3).map((item, inx) => (
              <div key={inx} className="border rounded-xl hover:drop-shadow-xl">
                <Link to={`/DetailsPage/${item.id}`} className="grid grid-cols-[1fr_2fr] gap-4 items-top p-4 rounded-md">
                  <img
                    src={`http://localhost:4000/uploads/${item.added_photos[0]}`}
                    alt=""
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-lg font-semibold capitalize overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.title}
                    </p>

                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 p-8">
          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          {/* Add content for reviews here */}
        </div>

      </div>
    </div>
  );
}