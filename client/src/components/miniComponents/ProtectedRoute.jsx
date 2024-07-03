import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../UserContex";


function useQuery() {
    return new URLSearchParams(window.location.search);
}


export default function ProtectedRoute(){

    const { user, setUser, setGRedirect } = useContext(UserContext);
    const navigate = useNavigate();
    
    const query = useQuery();
    const token = query.get('token');
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        if (token) {
            axios.get(`http://localhost:4000/getUserData?token=${token}`, { withCredentials: true })
                .then(response => {
                    const userData = response.data;
                    if (userData && userData.name) {
                        setGRedirect(true);
                        setUser(userData);
                        navigate('/profileForm');
                    } else {
                        console.error('User data not retrieved');
                        navigate('/login');
                    }
                }).catch(err => {
                    console.error('Error fetching user data:', err);
                    navigate('/login');
                }).finally(() => {
                    setLoading(false);
                });
        }  else{

              axios.get('http://localhost:4000/auth/google/callback', { withCredentials: true })
        .then(response =>{
            console.log(response)
            // const {redirectUrl} = response.data;
            // if(user.name){
            //     window.location.href = redirectUrl;
            // } else {
            //     setUser(response.data);
            //     window.location.href = '/'
            // }
            const userData = response.data;
            if (userData && userData.name) {
                setUser(userData);
                navigate('/');
            } else {
                console.error('User data not retrieved');
                navigate('/login');
            }
            
        
        }).catch(err=>{
            console.log(err)
        
        })
        }

      
    },[token,navigate, setUser])

    return(
        <div>justify</div>
    )
}