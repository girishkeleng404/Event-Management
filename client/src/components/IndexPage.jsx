import axios from "axios";
import Layout from "../Layout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContex";
import { Link } from "react-router-dom";
import Footer from "../Footer";



export default function IndexPage(){
    const [listingData, setListingData] = useState([])
     
    useEffect(()=>{
        const fetchData = async()=>{
     
           try {
         await axios.get('/listings', { withCredentials: true }).then(response=>{
           console.log(response.data)
           setListingData(response.data)
         
         })
       } catch (error) {
         console.log(error)
       }
        }
     
     fetchData();
       },[])
    
    return(
        <>
        <Layout />

        <div className="bg-slate-50 py-8">


       
        <div className="w-11/12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 px-12 m-auto">

        {listingData.length > 0 && listingData.map((item,inx)=>(
                <Link to={`/DetailsPage/${item.id}`} key={item.id||inx} className="flex flex-col ">
                  {/* {item.added_photos.map((photo,photoInx)=>( 
                    <div className="" key={photoInx}>
                      <img className="h-32 w-36" src={`http://localhost:4000/uploads/${photo}`}alt={`Photo of ${item.title}`} />
                     
                    </div>
                  ))} */}
                  <div className="m-auto flex flex-col ">

                 
                  <div>
                    {item.added_photos && (
                         <img className="w-10/12 aspect-square rounded-lg " src={`http://localhost:4000/uploads/${item.added_photos[0]}`}alt={`Photo of ${item.title}`} />
                    )}
                   
                  </div>
                 <div className="text-gray-800">
                  <h1 className="text-lg capitalize">{item.title}</h1>
                 <h1 className="text-sm"> {item.type} </h1>
                 <h1 className="text-sm"> {item.address} </h1>
                 {/* <h1> {item.description} </h1> */}
                 </div>
                 </div>
                 
                </Link>
               
              ))}
        </div>
        </div>
        <Footer/>
        </>
    )
}