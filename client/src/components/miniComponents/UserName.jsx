import { useEffect } from "react"

export default function UserName({name,setName,setShow}){
 
 
    function handleChange(e){
        setName(e.target.value)
    }


    // useEffect(()=>{
    //     if(name){
    //         setShow(true)
    //     }
    // },[]);

   

    return(
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold">Create your accoutnt</h1>
            <p className="text-gray-500">Choose your username</p>
            <input type="text" placeholder="username" onChange={(e)=>handleChange(e)} />
        </div>
    )
}