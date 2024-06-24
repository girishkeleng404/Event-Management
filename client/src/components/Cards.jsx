import Header from "./miniComponents/Header";
import Sidebar from "./miniComponents/Sidebar";

 

export default function Cards(){
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className=" mx-auto p-4">

                </main>
            </div>
        </div>
    )
}