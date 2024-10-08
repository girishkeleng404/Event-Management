import { useContext, useState } from "react"
import { UserContext } from "../../UserContex"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function BookingInput({ name, setName, email, setEmail, guests, setGuests, phone, setPhone, note, setNote }) {

    // const {user,profile}= useContext(UserContext)
    // const [name, setName] = useState(profile.name)

    return (
        <div className="flex flex-col gap-6 lg:gap-16">

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Name:</Label>
                    <Input type="text" id="name" placeholder="" value={name} onChange={ev => setName(ev.target.value)} />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="guest">Guests</Label>
                    <Input type="number" id="guets" placeholder="" value={guests} onChange={ev => { setGuests(ev.target.value) }} />
                </div>


                {/* <div className="flex items-center gap-2">
                    <label className="lg:text-xl">email:</label>
                    <input type="email" className="h-7 lg:h-8"  />
                </div> */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="" value={email} onChange={ev => { setEmail(ev.target.value) }} />
                </div>


                {/* <div className="flex items-center gap-2">
                    <label className="lg:text-xl">Phone: </label>
                    <input type="text" className="h-7 lg:h-8" value={phone} onChange={ev => { setPhone(ev.target.value) }} />
                </div> */}

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="phone">Phone No:</Label>
                    <Input type="text" id="phone" value={phone} onChange={ev => { setPhone(ev.target.value) }} />
                </div>


            </div>

            <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Your Preferences</Label>
                <Textarea placeholder="Type your message here." id="message-2" value={note} onChange={(ev) => setNote(ev.target.value)} />
                <p className="text-sm text-muted-foreground">
                    Your message will be copied to the host.
                </p>
            </div>

        </div>
    )
}