import axios from "axios";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function IndexPage() {
  const [listingData, setListingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listingsPerPage = 12;
  const [sortText, setSortText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/sortIndex', {
          params: {
            page: currentPage,
            limit: listingsPerPage,
            sort: sortText,
          },
          withCredentials: true,
        });
        setListingData(response.data.listings);
        setTotalPages(response.data.totalPages);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, sortText]);



  async function sortData(ev) {

    const newValue = ev.target.value;
    setSortText(newValue);

  }


  const nextPage = () => {  setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages)); window.scrollTo(0, 0);  }
  
  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    window.scrollTo(0, 0);
  }

  return (
    <div className="overflow-hidden">
      <Layout />


      <div className="bg-slate-50 py-6  ">
        <div className="pb-8 flex justify-between lg:justify-around pr-6">
          <div className="grid grid-cols-4">

          </div>
          <div className="">
            <select
              className="outline-none bg-inherit border py-1 px-2 "
              name="sort"
              id="sort"

              onChange={sortData}
            >
              <option value="oldest" >Oldest</option>
              <option value="newest"  >Newest</option>
              <option value="high_to_low"  >High to Low</option>
              <option value="low_to_high"  >Low to high</option>
            </select>

          </div>
        </div>

        <div className=" mx-3 overflow-hidden">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 lg:px-12 md:px-10 mx-auto   ">



            {listingData.length > 0 && listingData.map((item, inx) => (
              <Link to={`/DetailsPage/${item.id}`} key={item.id || inx} className="flex flex-col  ">
                <div className=" flex flex-col justify-center items-center my-4">
                  <div className=" ">
                    {item.added_photos && (
                      <img className="w-full aspect-square rounded-lg object-cover " src={`http://localhost:4000/uploads/${item.added_photos[0]}`} alt={`Photo of ${item.title}`} />
                    )}
                  </div>
                  <div className="text-gray-800 text-start ">
                    <h1 className="text-lg capitalize">{item.title}</h1>
                    <h1 className="text-sm"> {item.type} </h1>
                    <h1 className="text-sm"> {item.address} </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>



        <div className="flex justify-center my-8 gap-2">
          {currentPage && currentPage > 1 ? (
            <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-100 p-2 rounded-lg flex items-center">
              <ArrowBackIosIcon />
              {/* Previous */}
            </button>
          ) : null}
          <p className="bg-gray-50 p-1 rounded-lg flex items-center">{currentPage} of {totalPages}</p>

          <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-transparent p-1 rounded-lg flex items-center">
            {/* Next */}
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
