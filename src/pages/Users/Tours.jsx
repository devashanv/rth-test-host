import SideNav from "../../components/SideNav";
import NavBar1 from "../../components/NavBar1";
import API from "../../api/axiosClient";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaMapMarkedAlt,
  FaHeart,
  FaEnvelope,
  FaReceipt,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaCrown,
  FaAward,
  FaFilter,
  FaSort,
  FaChevronDown,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoon,
  FaUserFriends,
  FaStar,
  FaEye,
  FaLeaf,
} from "react-icons/fa";

const Tours = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Date Added");

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
  };

  const [bookings, setBookings] = useState([]);
  const [setLoadingsss] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log("Token found:", token);

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/booking/confirmed")
        .then((res) => {
          console.log("Confirmed bookings loaded:", res.data);
          setBookings(res.data);
          setLoadingsss(false);
        })
        .catch((err) => {
          console.error(
            "Error loading confirmed bookings:",
            err.response || err.message
          );
          setLoadingsss(false);
        });
    } else {
      console.warn("No token found in localStorage");
      setLoadingsss(false);
    }
  }, []);

  return (
    <div>
      <header>
        <NavBar1 />
      </header>
      <div className="flex ">
        <aside className="w-1/5 ">
          <SideNav />
        </aside>

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaAward className="text-yellow-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Regency Rewards</h3>
                  <p className="text-sm text-white/80">
                    Earn points with every booking and unlock exclusive benefits
                  </p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-xl">1,250</div>
                  <div className="text-xs text-white/80">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-xl">Gold</div>
                  <div className="text-xs text-white/80">Tier</div>
                </div>
              </div>
              <div className="w-full md:w-72">
                <div className="flex justify-between text-xs mb-1">
                  <span>650 to Platinum</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-2/3 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="text-2xl font-bold">
                My <span className="text-blue-600">Tours</span>
              </h1>
              <div className="flex gap-4 mt-4 md:mt-0">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-blue-600">
                  <FaFilter /> {selectedFilter} <FaChevronDown />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-blue-600">
                  <FaSort /> {selectedSort} <FaChevronDown />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden relative"
                >
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded font-semibold z-10">
                    {booking.status?.toUpperCase()}
                  </div>

                  <img
                    src={booking.image}
                    alt={booking.package?.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="grid grid-cols-3">
                    <div className="col-span-2 p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold text-[18px]">
                          {booking.package?.title}
                        </h3>
                        <p className="text-[13px] text-gray-500 flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-blue-600" />
                          {booking.package?.country}
                        </p>
                      </div>

                      <div className="flex justify-between py-4 border-t border-b border-gray-200 text-xs text-center">
                        <div className="flex flex-col items-center">
                          <FaCalendarAlt className="text-blue-600 mb-1" />
                          <span className="font-bold">
                            {booking.travel_date}
                          </span>
                          <span className="text-[11px] text-gray-400 uppercase mt-1">
                            Date
                          </span>
                        </div>

                        <div className="flex flex-col items-center">
                          <FaMoon className="text-blue-600 mb-1" />
                          <span className="font-bold">
                            {booking.package?.duration_days
                              ? booking.package.duration_days - 1
                              : 0}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase mt-1">
                            Nights
                          </span>
                        </div>

                        <div className="flex flex-col items-center">
                          <FaUserFriends className="text-blue-600 mb-1" />
                          <span className="font-bold">
                            {booking.number_of_travelers}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase mt-1">
                            People
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-blue-600 font-bold text-xl">
                          {booking.price}
                          <span className="text-gray-500 text-sm font-normal ml-1">
                            /person
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border-l border-gray-200 flex flex-col justify-center items-center p-4 text-center">
                      <div className="text-green-600 font-bold text-[16px] flex items-center mb-1">
                        <FaLeaf className="mr-2" />
                        {booking.carbon}
                      </div>
                      <div className="text-gray-500 text-[11px]">
                        CO₂ Footprint
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tours;
