import { Link } from "react-router-dom"
import Header from "./miniComponents/HeaderSm"
import Sidebar from "./miniComponents/Sidebar"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { UserContext } from "../UserContex";
import { useContext } from "react";
import axios from "axios";

export default function Adds() {

  const {user} = useContext(UserContext);
  const [listingData, setListingData] = useState([]);

  useEffect(()=>{
   const fetchData = async()=>{

      try {
        let {id}= user;
    await axios.get(`/listingPost/${id}`, { withCredentials: true }).then(response=>{
      console.log(response.data)
      setListingData(response.data)
    
    })
  } catch (error) {
    console.log(error)
  }
   }

fetchData();
  },[])


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className=" mx-auto w-11/12 p-4 flex flex-col bg-slate-200">
            <div className="mx-auto">
              <Link
            className=" text-center items-center inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full  my-8 "
            to={"/Dashboard/Adds/new"}
          >
            <AddIcon />
            Add ads
          </Link>
            </div>
            <div className="w-full flex flex-col gap-4">

              {listingData.length > 0 && listingData.map((item,inx)=>(
                <Link to={`/Dashboard/Adds/${item.id}`} key={item.id||inx} className="grid grid-cols-[1fr_6fr] gap-8">
                  {/* {item.added_photos.map((photo,photoInx)=>( 
                    <div className="" key={photoInx}>
                      <img className="h-32 w-36" src={`http://localhost:4000/uploads/${photo}`}alt={`Photo of ${item.title}`} />
                     
                    </div>
                  ))} */}
                  {item.added_photos && (
                    <div>
                    <img className="h-32 w-40" src={`http://localhost:4000/uploads/${item.added_photos[0]}`}alt={`Photo of ${item.title}`} />
                  </div>
                  )}
                  
                 <div>
                  <h1>{item.title}</h1>
                 <h1> {item.type} </h1>
                 <h1> {item.address} </h1>
                 <h1> {item.description} </h1>
                 </div>

                 
                </Link>
               
              ))}
               
            </div>
          
        </main>
      </div>
    </div>
  )
}