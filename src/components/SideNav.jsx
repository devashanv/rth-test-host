import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SideNav() {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [ setLoading] = useState(true);
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const customerId = localStorage.getItem("customer_id");

    if (token && customerId) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get(`/customers/${customerId}`)
        .then((response) => {
          setCustomer(response.data);
          setError("");
        })
        .catch((error) => {
          console.error("Failed to fetch customer:", error);
          setError("Unable to load customer data. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Missing authentication. Please log in again.");
      setLoading(false);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await API.post("/customers/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("customer_id");
      delete API.defaults.headers.common["Authorization"];
      navigate("/login");
    }
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center flex-col text-center px-4">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout & Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="h-screen bg-white shadow-lg flex flex-col justify-between px-6 py-4">
        <div>
          <div className="w-full flex justify-end items-center px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center gap-6">
              <div className="relative">
                <i className="fas fa-bell text-gray-600 text-xl"></i>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  3
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[10] h-[10px]"
                ></svg>

                <div className="text-right">
                  <span className="block font-semibold text-gray-800 text-sm">
                    {customer?.full_name}
                  </span>
                  <span className="text-xs text-yellow-600 flex items-center gap-1">
                    <i className="fas fa-crown text-yellow-500"></i>
                    Premium Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <Link
              to="/mydashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/mydashboard")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>

            <Link
              to="/mytours"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/mytours")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas fa-map-marked-alt"></i>
              <span>My Tours</span>
            </Link>

            <div className="flex items-center gap-3 text-gray-700 px-3 py-2 hover:bg-gray-100 rounded-md">
              <i className="fas fa-heart"></i>
              <span>Favorites</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 px-3 py-2 hover:bg-gray-100 rounded-md">
              <i className="fas fa-envelope"></i>
              <span>Messages</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 px-3 py-2 hover:bg-gray-100 rounded-md">
              <i className="fas fa-receipt"></i>
              <span>Transactions</span>
            </div>

            <Link
              to="/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/settings")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas fa-map-marked-alt"></i>
              <span>Settings</span>
            </Link>
          </div>

          {/* Promo Section */}
          <div className="h-[200px] mt-10 bg-blue-50 p-4 rounded-xl text-center shadow-sm">
            <h4 className="text-lg font-bold text-blue-700 mb-2">
              50% Discount!
            </h4>
            <p className="text-left text-lg text-gray-600 mb-3">
              Join our loyalty program and get exclusive benefits
            </p>
            <div className="grid grid-cols-2">
              <div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full animate-pulse">
                  Join Now
                </button>
              </div>
              <div>
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[80px] h-auto"
                >
                  {/* Decorative SVG */}
                  <circle cx="100" cy="70" r="40" fill="#FFD166" />
                  <circle cx="85" cy="60" r="5" fill="#333" />
                  <circle cx="115" cy="60" r="5" fill="#333" />
                  <path
                    d="M90 80 Q100 90 110 80"
                    stroke="#333"
                    strokeWidth="2"
                    fill="none"
                  />
                  <ellipse cx="100" cy="140" rx="40" ry="50" fill="#FFD166" />
                  <path
                    d="M80 120 Q100 130 120 120"
                    stroke="#333"
                    strokeWidth="2"
                    fill="none"
                  />
                  <rect x="60" y="140" width="80" height="40" fill="#06D6A0" />
                  <path d="M60 140 L40 180 L60 180 Z" fill="#06D6A0" />
                  <path d="M140 140 L160 180 L140 180 Z" fill="#06D6A0" />
                  <circle cx="70" cy="50" r="5" fill="#FFD166" />
                  <circle cx="130" cy="50" r="5" fill="#FFD166" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Link */}
        <a
          href="#"
          onClick={handleLogout}
          className="hover:font-bold hover:bg-gray-100 px-3 py-2 rounded-md flex items-center gap-3 text-red-600 hover:text-red-800 text-md mt-6"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}

export default SideNav;
