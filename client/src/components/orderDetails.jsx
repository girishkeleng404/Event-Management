import Header from "./miniComponents/Header";
import { UserContext } from "../UserContex";
import { useContext, useEffect, useState } from "react";
import DetailsPage from "./DetailsPage";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hero from "./miniComponents/Hero";

export default function OrderDetails(){

    const {user}= useContext(UserContext);
    const {id} = useParams();
    

   

    return (
        <div>
           <Header/>

           <div>
 
           <Hero id={id}/>

           </div>
        </div>
    )
}