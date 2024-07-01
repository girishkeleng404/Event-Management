import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem('profile');
        return savedProfile ? JSON.parse(savedProfile) : null;
    });
    const [ready, setReady] = useState(false);
    // const [forceUpdate, setForceUpdate] = useState(true);
    const [gRedirect, setGRedirect] = useState(false);
  
    useEffect(()=>{
        async function fetchData(){
            try {
                const {data} = await axios.get('/profile', {withCredentials: true  });
                setUser(data)
                localStorage.setItem('user',JSON.stringify(data));
                setReady(true)
            } catch (error) {
                // console.error("Error fetching user data:", error);
                setUser(null);
                localStorage.removeItem('user');
            }
        }
        if(!user ){
            fetchData();
            }
    },[user])

    useEffect(() => {
        if(!user){
            return;
        }
        async function fetchProfile() {
            if (user && user.id) { // Ensure user is not null and profile hasn't been fetched yet
                try {
                    const { data } = await axios.get(`/profile_detail/${user.id}`, { withCredentials: true });
                    console.log(user.id + " Profile Data");
                    setProfile(data);
                    localStorage.setItem('profile', JSON.stringify(data));
                    setReady(true);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                    setProfile(null);
                    localStorage.removeItem('profile');
                }
            }
        }
    
        if (user) {
            fetchProfile();
        } else {
            setProfile(null);
            localStorage.removeItem('profile');
        }

        setReady(true);
    }, [user]); // Depend only on user state; remove profile from dependencies to avoid unnecessary effect invocations

    
    return (
        <UserContext.Provider value={{ user, setUser, ready, profile, setProfile,gRedirect,setGRedirect }}>
            {children}
        </UserContext.Provider>
    );
}