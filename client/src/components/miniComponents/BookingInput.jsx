export default function BookingInput() {
    return (
        <div className="flex flex-col gap-16">

            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                <label className="text-xl">Name: </label>  
                <input type="text" />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xl">Guests </label>  
                <input type="number" />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xl">email:</label>  
                <input type="email" />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xl">Phone: </label>  
                <input type="text" />
            </div>
            </div>
       
            <div className="flex items-center gap-2">
                <label className="text-xl">Preference:</label>  
                <textarea name="" id=""></textarea>
            </div>

        </div>
    )
}