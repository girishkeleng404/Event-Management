import { useContext, useState } from "react"
import { UserContext } from "../../UserContex"

export default function BookingInput({name,setName,email,setEmail,guests,setGuests,phone,setPhone,note,setNote}) {

    // const {user,profile}= useContext(UserContext)
    // const [name, setName] = useState(profile.name)

    return (
        <div className="flex flex-col gap-16">

            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 ">
                <label className="text-xl">Name: </label>  
                <input className="capitalize" type="text" value={name} onChange={ev=>setName(ev.target.value)} />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xl">Guests </label>  
                <input type="number" value={guests} onChange={ev=>{setGuests(ev.target.value)}}/>
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xl">email:</label>  
                <input type="email" value={email} onChange={ev=>{setEmail(ev.target.value)}} />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xl">Phone: </label>  
                <input type="text" value={phone} onChange={ev=>{setPhone(ev.target.value)}} />
            </div>
            </div>
       
            <div className="flex items-center gap-2">
                <label className="text-xl">Preference:</label>  
                <textarea name="" id="" value={note} onChange={ev=>{setNote(ev.target.value)}}></textarea>
            </div>

        </div>
    )
}