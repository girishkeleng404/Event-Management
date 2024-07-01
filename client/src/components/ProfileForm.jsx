import { useContext, useEffect, useState } from "react"
import PhotoUploader from "../PhotoUploader"
import FitbitIcon from '@mui/icons-material/Fitbit';
import { Link, useParams, useNavigate,Navigate,  } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

import { UserContext } from "../UserContex";
import axios from "axios";

export default function ProfileForm() {
    const [profilePhoto, setProfilePhoto] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [social, setSocial] = useState('')
    const { user, setUser,gRedirect } = useContext(UserContext);
    const {id} = useParams();
    const {profile, setProfile} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
     const navigate = useNavigate();

    useEffect(() => {
        console.log('Profile Photo Updated:', profilePhoto);
    }, [profilePhoto]);


 
    useEffect(()=>{
        async function fetchData(userId){
            try{
                const {data} = await axios.get(`/user_profile?id=${userId}`, { withCredentials: true});
                setUser(data);
                navigate('/')
                console.log(data);
            } catch(error){
                console.log(error);
        }}
        if(user && user.id){
            fetchData(user.id);
        }
  },[user])


    useEffect(() => {
        // This can be enhanced to securely fetch user info
        localStorage.setItem('isAuthenticated', true);
    }, []);


     async function handleClick() {
        try {
            axios.post('/logout');

            setUser(null);
            setProfile(null)

            setRedirect('/');
           
            

        } catch (error) {
            console.log(error);
        }
    }
    {user ? (
        <div>{user.name}</div>
    ) : (
        <div>Loading...</div>
    )}
    async function formSubmit() {
      
        try {
            console.log("Request URL: ", "/profileDetails/" + id);
            const {data} = await axios.post(`/profileDetails/${user.id}`, { name, bio, social, profilePhoto });
            // console.log(id);
            setProfile(data);
            // console.log(JSON.stringify(data))
            // console.log(JSON.stringify(profile))
            // console.log(data+"Profile Updated");
            // console.log(profile, "Profile Updated")
            // navigate('/');
            // console.log(data+"Profile Updated");
             
            setRedirect(true);
        } catch (error) {
            console.log(error+"Profile Update Failed");
        }

    }
    if (redirect) {

        return <Navigate to={'/login'}/>
    }


    // setName(user.name);
    return (
        <div className="relative bg-gray-400 sm:p-8  max-h-screen overflow-hidden">
            <Link to={'/'} className="absolute top-4 left-4 sm:top-8 sm:left-8">
                <FitbitIcon style={{ fontSize: '1.5rem' }} />
            </Link>

            <Link to={'/'} onClick={handleClick} className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-gray-100 sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer border border-gray-200">Logout</Link>

            

            <div className=" flex flex-col h-auto sm:h-screen items-center justify-center gap-4 sm:gap-16 pb-2 sm:pb-10">
                <div>
                    <h2 className="text-xl sm:text-3xl">Complete your Profile</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <PhotoUploader photo={profilePhoto} setPhoto={setProfilePhoto} />
                    <div className="w-full sm:w-6/12">
                        <label>Name</label>
                          {!gRedirect && user && (
                              <input type="text" placeholder={user.name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded-md border border-gray-300" />
                          )}
                      
                        <label>About</label>
                        <textarea placeholder="Write about yourself" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 rounded-md border border-gray-300" />
                        <label>Website or social link</label>
                        <input type="text" placeholder="https://" value={social} onChange={(e) => setSocial(e.target.value)} className="w-full p-2 rounded-md border border-gray-300" />
                    </div>
                </div>
                <button onClick={formSubmit} className="absolute right-12 bottom-8 bg-primary text-white px-3 py-2 rounded-md cursor-pointer">Sign up</button>
            </div>

            
        </div>


    )
}