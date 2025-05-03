import React, { useState, useEffect } from "react";
import SideNav from "../../components/SideNav";
import NavBar1 from "../../components/NavBar1";
import API from "../../api/axiosClient";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrev = () => {
    const prevMonth = new Date(year, month - 1, 1);
    setDate(prevMonth);
  };

  const handleNext = () => {
    const nextMonth = new Date(year, month + 1, 1);
    setDate(nextMonth);
  };

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
    }

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/wishlist")
        .then((response) => {
          setWishlist(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
          setLoading(false);
        });
    }
  }, []);

  const [pendingBookings, setPendingBookings] = useState([]);
  const [loadings, setLoadings] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
    }

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/bookings")
        .then((res) => {
          setPendingBookings(res.data);
          setLoadings(false);
        })
        .catch((err) => {
          console.error("Error loading bookings:", err);
          setLoadings(false);
        });
    }
  }, []);

  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
    }

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/packages")
        .then((res) => {
          setPackages(res.data);
          setLoadingPackages(false);
        })
        .catch((err) => {
          console.error("Error loading bookings:", err);
          setLoadingPackages(false);
        });
    }
  }, []);

  const [bookings, setBookings] = useState([]);
  const [setLoadingsss] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    console.log("Token found:", token);

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (!token) {
        navigate("/login");
      }

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

        <main className="flex-1 bg-gray-100 min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Hello <span className="text-indigo-600">Traveler</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Let's experience the world together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

                {loading ? (
                  <p className="text-gray-600">Loading wishlist...</p>
                ) : wishlist.length === 0 ? (
                  <p className="text-gray-500">No items in wishlist.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="relative group rounded-lg overflow-hidden shadow-md"
                      >
                        <img
                          src={
                            item.package?.image_url ||
                            "https://via.placeholder.com/300"
                          }
                          alt={item.package?.title || "Package"}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white p-4">
                          <h4 className="text-lg font-bold mb-2">
                            {item.package?.title || "No Title"}
                          </h4>
                          <div className="flex items-center gap-3 text-sm mb-4">
                            <p>
                              <i className="fas fa-map-marker-alt mr-1"></i>{" "}
                              {item.package?.start_date || "Unknown"}
                            </p>
                            <p>
                              <i className="fas fa-map-marker-alt mr-1"></i>{" "}
                              {item.package?.end_date || "Unknown"}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white text-sm">
                              Remove
                            </button>
                            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white text-sm">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="recent-bookings bg-white rounded-xl shadow p-6 mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Recent Bookings
                  </h3>
                  <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
                    View All
                  </span>
                </div>

                <div className="space-y-6">
                  {loadings ? (
                    <p className="text-gray-600">Loading bookings...</p>
                  ) : pendingBookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center text-gray-400 border border-dashed border-gray-300 rounded-lg p-10">
                      <i className="fas fa-suitcase text-4xl mb-3"></i>
                      <p className="mb-4">No recent bookings found</p>
                      <button className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700">
                        Browse Tours
                      </button>
                    </div>
                  ) : (
                    pendingBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex gap-4 items-start bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-md bg-gray-200">
                          <img
                            src={
                              booking.package?.image_url ||
                              "https://via.placeholder.com/150"
                            }
                            alt={booking.package?.title || "Booking"}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-700">
                              {booking.package?.title || "Trip"}
                            </h4>
                            <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                              {booking.status}
                            </span>
                          </div>

                          <div className="flex gap-6 text-sm text-gray-600 mt-2">
                            <div className="flex items-center gap-2">
                              <i className="fas fa-calendar-alt"></i>
                              <span>
                                {booking.date_from} - {booking.date_to}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="fas fa-users"></i>
                              <span>{booking.adults} Adults</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-indigo-600">
                              LKR {booking.total_price}
                            </span>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="side-column space-y-8">
              <div className="calendar-card bg-white p-6 rounded-xl shadow">
                <div className="calendar-card bg-white p-6 rounded-xl shadow w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {monthNames[month]} {year}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handlePrev}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <i className="fas fa-chevron-left" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
                    {days.map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-sm text-center text-gray-800">
                    {Array.from({ length: firstDay }).map((_, index) => (
                      <div key={`empty-${index}`} />
                    ))}

                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const isCurrentDay = isToday(day);
                      return (
                        <div
                          key={day}
                          className={`py-2 rounded-lg transition cursor-pointer ${
                            isCurrentDay
                              ? "bg-indigo-500 text-white font-semibold"
                              : "hover:bg-indigo-100"
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="calendar-events mt-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-3">
                    Upcoming Trips
                  </h4>

                  <div className="events-list space-y-4">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => {
                        const travelDate = new Date(booking.travel_date);
                        const day = travelDate.getDate();
                        const month = travelDate.toLocaleString("default", {
                          month: "short",
                        });

                        return (
                          <div
                            key={booking.id}
                            className="event-item flex items-center gap-4 p-3 bg-gray-100 rounded-md shadow-sm"
                          >
                            <div className="event-date bg-indigo-600 text-white rounded-md w-12 h-12 flex flex-col items-center justify-center font-bold">
                              <span className="event-day text-lg">{day}</span>
                              <span className="event-month text-xs uppercase">
                                {month}
                              </span>
                            </div>

                            <div className="event-info">
                              <h5 className="event-title font-semibold text-gray-800">
                                {booking.package?.title || "Untitled Trip"}
                              </h5>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-events flex flex-col items-center text-gray-400 p-6 border border-dashed border-gray-300 rounded-lg">
                        <i className="fas fa-calendar-plus text-2xl mb-2"></i>
                        <p>No upcoming trips</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="stats-card bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Loyalty Program
                </h3>
                <div className="stats-grid grid grid-cols-2 gap-4">
                  <div className="stat-item flex items-center gap-3 bg-gray-50 p-3 rounded-md shadow-sm">
                    <div className="stat-icon text-indigo-600 text-xl">
                      <i className="fas fa-globe-americas"></i>
                    </div>
                    <div className="stat-info">
                      <span className="stat-value font-bold text-gray-800">
                        12
                      </span>
                      <span className="stat-label text-sm text-gray-500 block">
                        Total Trips
                      </span>
                    </div>
                  </div>

                  <div className="stat-item flex items-center gap-3 bg-gray-50 p-3 rounded-md shadow-sm">
                    <div className="stat-icon text-indigo-600 text-xl">
                      <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <div className="stat-info">
                      <span className="stat-value font-bold text-gray-800">
                        7
                      </span>
                      <span className="stat-label text-sm text-gray-500 block">
                        Wishlist
                      </span>
                    </div>
                  </div>

                  <div className="stat-item flex items-center gap-3 bg-gray-50 p-3 rounded-md shadow-sm">
                    <div className="stat-icon text-indigo-600 text-xl">
                      <i className="fas fa-passport"></i>
                    </div>
                    <div className="stat-info">
                      <span className="stat-value font-bold text-gray-800">
                        5
                      </span>
                      <span className="stat-label text-sm text-gray-500 block">
                        Countries
                      </span>
                    </div>
                  </div>

                  <div className="stat-item flex items-center gap-3 bg-gray-50 p-3 rounded-md shadow-sm">
                    <div className="stat-icon text-yellow-500 text-xl">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="stat-info">
                      <span className="stat-value font-bold text-gray-800">
                        Premium
                      </span>
                      <span className="stat-label text-sm text-gray-500 block">
                        Member
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 popular-trips space-y-6">
            <div className="section-header flex justify-between items-center">
              <h3 className="section-title text-xl font-semibold text-gray-800">
                Recommended For You
              </h3>
              <span className="view-all text-indigo-600 hover:underline cursor-pointer text-sm">
                View All
              </span>
            </div>

            {loadingPackages ? (
              <p className="text-gray-600">Loading recommended trips...</p>
            ) : packages.length === 0 ? (
              <div className="no-trips-placeholder col-span-full flex flex-col items-center text-gray-400 p-6 border border-dashed border-gray-300 rounded-lg">
                <i className="fas fa-compass text-3xl mb-2"></i>
                <p className="text-sm">No recommended trips found</p>
              </div>
            ) : (
              <div className="trips-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.slice(0, 3).map((pkg) => (
                  <div
                    key={pkg.id}
                    className="trip-card bg-white rounded-xl shadow overflow-hidden relative"
                  >
                    <div className="trip-image-container relative">
                      <img
                        src={pkg.image_url || "https://via.placeholder.com/150"}
                        alt={pkg.title || "Trip"}
                        className="trip-image w-full h-56 object-cover"
                      />

                      <div className="trip-badge absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <i className="fas fa-fire"></i> Popular
                      </div>

                      <div className="trip-overlay absolute top-2 right-2">
                        <button className="trip-wishlist-btn text-white bg-black/30 hover:bg-black/50 rounded-full p-2">
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                    </div>

                    <div className="trip-info p-4 space-y-2">
                      <div className="trip-header flex justify-between items-center">
                        <h4 className="trip-title font-medium text-gray-800 text-lg">
                          {pkg.title}
                        </h4>
                      </div>

                      <p className="trip-location text-sm text-gray-500 flex items-center gap-1">
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {pkg.destination?.name || "Unknown"}
                      </p>

                      <div className="trip-meta flex gap-4 text-gray-500 text-sm">
                        <span className="trip-duration flex items-center gap-1">
                          <i className="fas fa-calendar-alt"></i>{" "}
                          {pkg.start_date} - {pkg.end_date}
                        </span>
                        <span className="trip-difficulty flex items-center gap-1">
                          <i className="fas fa-clock"></i> {pkg.duration_days}{" "}
                          Days
                        </span>
                      </div>

                      <div className="trip-footer flex justify-between items-center pt-2 border-t mt-2">
                        <span className="trip-price text-gray-800 font-semibold text-md">
                          LKR {pkg.price_per_person}
                        </span>
                        <button className="trip-book-btn bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
