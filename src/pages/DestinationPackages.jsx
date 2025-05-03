import React, { useState, useEffect } from 'react'
import NavBar1 from '../components/NavBar1'
import Footer from '../components/Footer'
import HomePackageCard from '../components/HomePackageCard'
import axios from "axios"
import FAQs from '../components/FAQs'
import {useSearchParams } from 'react-router-dom'

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import LoyaltyDoll from '../components/LoyaltyDoll';
import HeaderLineArt from '../assets/packges_lineart.png'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function DestinationPackages() {

  //top mount
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  //get category from home
  const [homeCategory] = useSearchParams();
  const getCategory = homeCategory.get("category");

  
  //get category from home
  const [homeCountry] = useSearchParams();
  const getCountry = homeCategory.get("country");
  
  //fetch from database
  useEffect(() => {

    if (getCategory) {
      //category end point
    }else {
      //all pacakges end point
    }

    const fetchPackages = async () => {
      try {

      } catch (error) {
        //console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, []);

  //sample
  const dummyPackages = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Dhambadiva Full Tour ${i + 1}`,
    description:
      "A journey to Dhambadiva is a sacred pilgrimage for Buddhists, visiting places like Bodh Gaya, Sarnath, and Kushinagar.",
    imageUrl: "https://source.unsplash.com/600x400/?mountain,himalaya", // placeholder image
    views: 2465 + i * 10,
    months: "December - April",
    duration: "14 Days",
  }));


  /* Pagination option */
  // pagination
  const [allPackages, setAllPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  // Calculate current items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPackages = dummyPackages.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(dummyPackages.length / itemsPerPage);

  //pagination change
  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  /* sorting functionality */
  // Filter options.
  const countryOptions = ["India", "Nepal", "Bhutan", "Myanmar", "China"];
  const categoryOptions = ["Beach", "Adventure", "Cultural", "Family"];
  const priceOptions = ["Below $500", "$500-$1000", "Above $1000"];
  const daysOptions = ["1-3 days", "4-7 days", "8+ days"];
  const activityOption = ["Adventures", "Boad Rides", "Cable Cars", "Cruise Journey", "Honeymoon"];

  // Sample travel packages
  const samplePackages = [
    { id: 1, name: "India Adventure Tour", country: "India", category: "Adventure", price: 450, days: 3, activities: ["Adventures"] },
    { id: 2, name: "Nepal Trekking", country: "Nepal", category: "Adventure", price: 700, days: 5, activities: ["Cable Cars"] },
    { id: 3, name: "Bhutan Culture Trip", country: "Bhutan", category: "Cultural", price: 1200, days: 8, activities: ["Cruise Journey"] },
    { id: 4, name: "Tibet Family Fun", country: "Tibet", category: "Family", price: 600, days: 6, activities: ["Boat Rides", "Honeymoon"] },
    { id: 5, name: "India Beach Escape", country: "India", category: "Beach", price: 400, days: 2, activities: ["Boat Rides"] },
    { id: 6, name: "Nepal Honeymoon Retreat", country: "Nepal", category: "Family", price: 950, days: 4, activities: ["Honeymoon"] },
  ];


  const [selectedFilters, setSelectedFilters] = useState([]);
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? "" : type);
  };

  //filter handle
  const handleSelectFilter = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters(prev => [...prev, filter]);
    }
  };

  const handleRemoveFilter = (filter) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  //dropdown list
  const dropdownFilter = (label, options, type) => (
    <div className="relative w-1/5 mx-1">
      <button
        onClick={() => toggleDropdown(type)}
        className="px-4 py-2 flex items-center w-full justify-between bg-white rounded-full hover:bg-gray-100 hover:bg-gray-100 hover:cursor-pointer"
      >
        <span>{label}</span>
        <IoMdArrowDropdown/>
      </button>
      {openDropdown === type && (
        <div className="absolute z-10 mt-2 w-52 bg-body border border-gray-200 rounded-lg shadow-lg">
          {options.map(option => (
            <div
              key={option}
              onClick={() => {
                handleSelectFilter(option);
                setOpenDropdown("");
              }}
              className="px-4 py-3 hover:bg-blue-100 cursor-pointer text-base"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );


  // Filtering logic
  const filteredPackages = samplePackages.filter(pkg =>
    selectedFilters.length === 0 ||
    selectedFilters.includes(pkg.country) ||
    selectedFilters.includes(pkg.category) ||
    selectedFilters.some(f =>
      (f === "Below $500" && pkg.price < 500) ||
      (f === "$500-$1000" && pkg.price >= 500 && pkg.price <= 1000) ||
      (f === "Above $1000" && pkg.price > 1000)
    ) ||
    selectedFilters.some(f =>
      (f === "1-3 days" && pkg.days >= 1 && pkg.days <= 3) ||
      (f === "4-7 days" && pkg.days >= 4 && pkg.days <= 7) ||
      (f === "8+ days" && pkg.days >= 8)
    ) ||
    pkg.activities.some(act => selectedFilters.includes(act))
  );

  /*FAQs sectoion*/
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      title: "What documents are required for international travel?",
      content:
        "You'll typically need a valid passport, visa (if applicable), and any health documents such as vaccination certificates depending on your destination.",
    },
    {
      title: "Can I reschedule or cancel my booking?",
      content:
        "Yes, most bookings can be rescheduled or canceled within a certain time frame. Check your booking details or contact our support team for assistance.",
    },
    {
      title: "Do you offer travel insurance?",
      content:
        "Absolutely! We partner with leading providers to offer affordable and comprehensive travel insurance options.",
    },
    {
      title: "Do you offer travel insurance?",
      content:
        "Absolutely! We partner with leading providers to offer affordable and comprehensive travel insurance options.",
    },
    {
      title: "Do you offer travel insurance?",
      content:
        "Absolutely! We partner with leading providers to offer affordable and comprehensive travel insurance options.",
    },
  ];

  return (
    <>
      <header className="">
        <NavBar1 page="destination"/>
      </header>

      {/* header section */}
      <div className="w-full mx-auto bg-gray-100 py-20">
        <div className="w-5/6 mx-auto flex">
          <section className="py-2 text-left w-3/5 mb-4 leading-line-height mb-10">
            <h1 className="text-lg font-bold lg:text-5xl text-primary">Find Your Dream Package</h1>
            <p className="text-gray-400 font-normal text-base mt-6 w-full pr-30 leading-7">Discover top travel packages tailored for unforgettable escapes. Handpicked destinations, seamless planning, exclusive deals, breathtaking views, cultural experiences, thrilling adventures, and personalized services — your perfect journey starts here with the best in travel.</p>
          </section>

          {/* search bar */}
          <section className="w-2/5">
            <div className="mt-5 mb-[-50px]">
              <form action="" className="flex gap-3 lg:gap-4">
                <input
                  type="text"
                  name="userEmail"
                  id="user_email"
                  placeholder="search your package here.."
                  className="w-full text-sm lg:text-para py-[6px] lg:px-5 lg:py-3 rounded-full border-2 border-gray-300 text-black lg:font-normal focus:ring-1 focus:ring-secondary/[0.2] focus:outline-none focus:border-secondary/[0.9] placeholder:text-gray-400 placeholder:text-xs lg:placeholder:text-sm hover:border-secondary" />

                <button className={"border-2 border-secondary rounded-full text-body text-xs md:w-full lg:w-32 lg:text-base hover:bg-secondary/[0.8] hover:cursor-pointer transition duration-300 ease-in-out hover:border-transparent bg-secondary font-semibold px-3"}>
                  Search
                </button>
              </form>
            </div>
          </section>
        </div>

        <img src={HeaderLineArt} alt="" className="opacity-[0.08] top-55 h-60 left-235 object-contail mx-auto absolute" />
      </div>

      {/* filter section */}
      <div className="w-5/6 mx-auto px-4 py-8 mt-20">
        {/* Dropdown Filters Bar */}
        <div className="bg-white border-2 border-gray-300 w-full rounded-full p-2 mb-6 flex justify-between">
          {dropdownFilter("Country", countryOptions, "country")}
          {dropdownFilter("Category", categoryOptions, "category")}
          {dropdownFilter("Price", priceOptions, "price")}
          {dropdownFilter("Days", daysOptions, "days")}
          {dropdownFilter("Activities", activityOption, "activities")}
        </div>

        {/* Chips for selected filters */}
        {selectedFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {selectedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {filter}
                <button
                  onClick={() => handleRemoveFilter(filter)}
                  className="ml-2 text-blue-800 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Filtered Packages Display */}
        <div className="w-full mx-auto">
          {filteredPackages.length > 0 ? (
            <div className="flex px-5 flex-wrap mx-auto justify-left items-center gap-9">
              {/*loyalty card */}
              <div className="relative w-93 bg-gradient-to-br from-[#0b0a3d] via-[#261aa7] to-[#9b1d74] px-10 flex flex-col gap-4 py-8 h-122 rounded-[30px]">
                <h1 className="text-5xl text-body font-bold leading-15">Collect Your Loyalty Points </h1>
                <LoyaltyDoll />

                <h1 className="text-lime-300 text-2xl font-bold">10% <span>per booking,</span></h1>
                <p className="text-gray-200 text-normal">Join our Loyalty Program and turn every journey into rewards! Enjoy exclusive perks, member-only deals, and unforgettable experiences every time you travel with us</p>
              </div>
              {filteredPackages.map(pkg => (
                  <HomePackageCard
                    key={pkg.id}
                    title={pkg.name}
                    description={pkg.country}
                    views={pkg.category}
                    image="aaa"
                    months={pkg.price} 
                    duration={pkg.days} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No packages found.</p>
          )}
      </div>

        {/* pagination */}
        <Stack spacing={2} className="w-1/2 mx-auto flex items-center mt-20">
          <Pagination
            count={totalPages}
            page={currentPage}
            color="primary"
            onChange={handlePageChange} />
        </Stack>
      </div>


      {/* FAQ */}
      <div className="flex my-10justify-center items-center h-[100vh] my-20  py-5">
        <div className="w-5/6 h-full mx-auto px-10">
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-600">Your Questions, Answered Clearly</h2>
            <p className="text-primary font-bold text-title mt-8 mb-3">FAQs</p>
            <p className="mb-3 text-gray-500">We understand that planning your journey comes with many questions. This section covers the most common inquiries to help you make informed decisions with confidence. If you need further assistance, our team is just a message away.</p>
          </div>

          {/* accordion */}
          <div>
            {faqs.map((faq, index) => (
              <FAQs
                key={index}
                title={faq.title}
                content={faq.content}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}

          </div>
        </div>
      </div>

      {/* footer section*/}
      <div className="bg-primary bg-center px-20 pt-10 print:hidden mt-10">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-4/5 mt-20" />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">© All rights reserved by All In One Holdings.</p>
        </div>
      </div>
    </>
  )
}

export default DestinationPackages