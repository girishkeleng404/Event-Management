import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(){

    return(
        <div className="h-5/6 bg-gray-50">
        <Header/>
      
  <Outlet/>
  
      
        </div>
    )
}