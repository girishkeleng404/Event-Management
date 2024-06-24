import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile]= useState(null);
    const [ready, setReady] = useState(false);


    useEffect(()=>{
        async function fetchData(){
            try {
                const {data} = await axios.get('/profile', {withCredentials: true});
                setUser(data)
                setReady(true)
            } catch (error) {
                // console.log(error);
            }
        }
        if(!user){
            fetchData();
            }
    },[user])

    useEffect(() => {
        if(!user){
            return;
        }
        async function fetchProfile() {
            if (user && !profile) { // Ensure user is not null and profile hasn't been fetched yet
                try {
                    const { data } = await axios.get(`/profile_detail/${user.id}`, { withCredentials: true });
                    console.log(user.id + " Profile Data");
                    setProfile(data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    
        fetchProfile();
    }, [user, profile]); // Depend only on user state; remove profile from dependencies to avoid unnecessary effect invocations
    return (
        <UserContext.Provider value={{ user, setUser, ready, profile, setProfile }}>
            {children}
        </UserContext.Provider>
    );
}