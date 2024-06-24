 

 import FitbitIcon from '@mui/icons-material/Fitbit';

 import MenuIcon from '@mui/icons-material/Menu';
 import { UserContext } from '../../UserContex';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useContext(UserContext);
  const { profile } = useContext(UserContext);

  return (
    <header className="bg-gray-50 shadow p-4 flex items-center justify-between">
      <Link to={'/'} className="text-lg font-bold ml-4"> <FitbitIcon/> </Link>
      <button className="bg-white py-1 pr-1 pl-2 rounded-full flex gap-2 border border-gray-300 items-center">
        {/* {user.name} */}
        <MenuIcon />
        <img src={`http://localhost:4000/uploads/${profile.photos}`} alt="profile" className="h-8 w-8 rounded-full" />
      </button>
    </header>
  );
 
}

export default Header;



