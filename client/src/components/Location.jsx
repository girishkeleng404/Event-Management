import { useEffect, useState } from "react"

export default function Location() {
    const [location, setLocation]= useState(null)
    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setLocation({
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                    });
                },
                (error)=>{
                    console.log(error)
                
                }
            );
        } else{
            console.log("Location not available")
        }
    },[]);

    
  return (
    <div>
      <h1>Location</h1>
    </div>
  )
}