import { Link } from "react-router-dom"
import Header from "./miniComponents/Header"
import Sidebar from "./miniComponents/Sidebar"

export default  function Adds(){
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className=" mx-auto p-4">
               
                <Link
            className=" text-center items-center inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/Dashboard/Adds/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add ads
          </Link>
                </main>
            </div>
        </div>
    )
}