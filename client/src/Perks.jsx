import WifiIcon from '@mui/icons-material/Wifi';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import BedIcon from '@mui/icons-material/Bed';
import AirIcon from '@mui/icons-material/Air';


export default function Perks({ selected, onChange }) {

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            onChange(prev => [...prev, name])
        } else {
            onChange(prev => prev.filter(item => item !== name))
        }
    }

    return (
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('Wifi')} name="Wifi" onChange={handleCheck} />
                <WifiIcon />

                <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('Parking')} name="Parking" onChange={handleCheck} />
                <LocalParkingIcon />

                <span>Parking</span>
            </label>

            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('Drinks')} name="Drinks" onChange={handleCheck} />
                <LocalBarIcon />

                <span>Drinks</span>
            </label>

            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" checked={selected.includes("Food")} name='Food' onChange={handleCheck} />
                <LocalDiningIcon />
                <span>Food</span>
            </label>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" checked={selected.includes("Music")} name='Music' onChange={handleCheck} />
                <LibraryMusicIcon/>
                <span>Music</span>
            </label>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" checked={selected.includes("Bedroom")} name='Bedroom' onChange={handleCheck} />
               <BedIcon/>
                <span>Bedroom</span>
            </label>
            <label className='border p-4 flex rounded-xl gap-2 items-center cursor-pointer' >
                <input type="checkbox" checked={selected.includes("AC")} name='AC' onChange={handleCheck} />
               <AirIcon/>
                <span>AC</span>
            </label>
        </>
    );
}