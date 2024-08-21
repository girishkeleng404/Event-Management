import { useEffect, useState } from "react"

export default function Location() {
    const [location, setLocation] = useState(null)
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.log(error)

                }
            );
        } else {
            console.log("Location not available")
        }
    }, []);


    return (
        <div>
            <div className="flex items-end gap-1">

                <h1 className="hidden sm:block">Location</h1>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>

            </div>

        </div>

    )
}