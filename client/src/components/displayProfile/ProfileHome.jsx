import { useContext, useEffect, useState } from "react";
import Header from "../../Header";
import { UserContext } from "../../UserContex";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProfileHome() {

  const [userData, setUserData] = useState([])
  const { user } = useContext(UserContext)
  const {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
 
      try {
        await axios.get(`/profile_detail/${id}`, { withCredentials: true }).then(Response =>{
          console.log(Response.data)
          setUserData(Response.data)
        })
      } catch (error) {
        console.log(error)
      }

    }
     fetchData();
  }, [])


  return (
    <div className="">
      <Header />
      <div className="lg:w-8/12 m-auto bg-slate-50 h-svh grid lg:grid-cols-[1fr_2fr]">
      <div className="flex flex-col justify-start items-center pt-8 px-8 gap-4">
        <img src={`http://localhost:4000/uploads/${userData.photos}`} alt="" className="h-32 rounded-full aspect-square drop-shadow-xl" />
          <div className="capitalize text-lg"> {userData.name} </div>
          <div className="">{userData.bio}</div>
      </div>
      <div className="bg-orange-50">
       reviews
      </div>
      
      </div>
    </div>
  );
}