import WifiIcon from '@mui/icons-material/Wifi';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import BedIcon from '@mui/icons-material/Bed';
import AirIcon from '@mui/icons-material/Air';
import LocalBar from '@mui/icons-material/LocalBar';

export default function PerksDis({ selected, display }) {

    const hasWifi = selected && selected.includes("Wifi");
    const hasParking = selected && selected.includes("Parking");
    const hasDrinks = selected && selected.includes("Drinks");
    const hasFood = selected && selected.includes("Food");
    const hasMusic = selected && selected.includes("Music");
    const hasBedroom = selected && selected.includes("Bedroom");
    const hasAC = selected && selected.includes("AC");

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>



            {display && hasWifi && (
                <div className="border py-4 px-4 text-center rounded-xl"> <WifiIcon /> Wifi</div>
            )}


            {display && hasParking && (
                <div className="border py-4 px-4 text-center rounded-xl"> <LocalParkingIcon /> Parking</div>
            )}


            {display && hasDrinks && (
                <div className="border py-4 px-4 text-center rounded-xl"> <LocalBar /> Drinks</div>
            )}


            {display && hasFood && (
                <div className="border py-4 px-4 text-center rounded-xl"> <LocalDiningIcon /> Food</div>
            )}

            {display && hasBedroom && (
                <div className="border py-4 px-4 text-center rounded-xl"> <BedIcon /> Bedroom</div>
            )}
            {display && hasAC && (
                <div className="border py-4 px-4 text-center rounded-xl"> <AirIcon />  AC</div>
            )}
            {display && hasMusic && (
                <div className="border py-4 px-4 text-center rounded-xl"> <LibraryMusicIcon /> Music</div>
            )}

        </div>
    )
}