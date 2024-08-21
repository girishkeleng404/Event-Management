import { useContext, useState } from "react"
import { UserContext } from "../../UserContex"

export default function BookingInput({ name, setName, email, setEmail, guests, setGuests, phone, setPhone, note, setNote }) {

    // const {user,profile}= useContext(UserContext)
    // const [name, setName] = useState(profile.name)

    return (
        <div className="flex flex-col gap-6 lg:gap-16">

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 ">
                    <label className=" lg:text-xl">Name: </label>
                    <input className="capitalize h-7 lg:h-8" type="text" value={name} onChange={ev => setName(ev.target.value)} />
                </div>
                <div className="flex items-center gap-2">
                    <label className="lg:text-xl">Guests </label>
                    <input type="number" className="h-7 lg:h-8" value={guests} onChange={ev => { setGuests(ev.target.value) }} />
                </div>
                <div className="flex items-center gap-2">
                    <label className="lg:text-xl">email:</label>
                    <input type="email" className="h-7 lg:h-8" value={email} onChange={ev => { setEmail(ev.target.value) }} />
                </div>
                <div className="flex items-center gap-2">
                    <label className="lg:text-xl">Phone: </label>
                    <input type="text" className="h-7 lg:h-8" value={phone} onChange={ev => { setPhone(ev.target.value) }} />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <label className="lg:text-xl">Preference:</label>
                <textarea
                    name="Preference"
                    id="Preference"
                    rows=""  // Defines the number of visible rows
                    value={note}
                    onChange={(ev) => setNote(ev.target.value)}
                    className="border rounded p-2 h-24 lg:h-32"
                ></textarea>
            </div>

        </div>
    )
}