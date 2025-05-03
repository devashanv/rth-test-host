import React, { useState, useEffect } from "react";
import { Pencil, Upload } from "lucide-react";
import SideNav from "../../components/SideNav";
import NavBar1 from "../../components/NavBar1";
import API from "../../api/axiosClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    country_of_residence: "",
    date_of_birth: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await API.get("/customer/profile");
        setProfile(response.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        country_of_residence: profile.country_of_residence,
        date_of_birth: profile.date_of_birth,
      };

      const response = await API.put("/customer/profile", updatedProfile);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 shadow bg-white">
        <NavBar1 />
      </header>

      {/* Layout Container */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-full md:w-1/5 min-h-screen border-r border-gray-200 bg-white shadow-md">
          <SideNav />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-4/5 p-6 md:p-10">
          <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-12 border border-white/30">
            <h2 className="text-3xl font-bold text-gray-800 mb-10">
              User Profile
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={profile.avatar || "https://i.pravatar.cc/150?img=32"}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow-md"
                  />
                  <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full cursor-pointer">
                    <Upload className="text-white w-4 h-4" />
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={profile.full_name}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      name="country_of_residence"
                      value={profile.country_of_residence}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={profile.date_of_birth}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  className="cursor-pointer flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
                >
                  <Pencil size={18} /> Update Profile
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
