import { useLocation } from "react-router-dom";
import Header from "./miniComponents/Header";
import MainContent from "./miniComponents/MainContent";
import Sidebar from "./miniComponents/Sidebar";
 


const Dashboard = () => {

   
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