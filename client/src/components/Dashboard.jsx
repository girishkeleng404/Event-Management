import { useLocation } from "react-router-dom";
import Header from "./miniComponents/Header";
import MainContent from "./miniComponents/MainContent";
import Sidebar from "./miniComponents/Sidebar";
 import { UserContext } from "../UserContex";
 import { useContext } from "react";


const Dashboard = () => {

  const { ready } = useContext(UserContext);

  
    return (

<div className="min-h-screen bg-gray-100 flex flex-col">
<Header />
<div className="flex flex-1">
  <Sidebar />
  <main className=" mx-auto p-4">
  <MainContent/>
  </main>
</div>
</div>
    );
};

export default Dashboard;