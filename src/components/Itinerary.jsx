import React, { useState } from 'react';
import { motion } from "framer-motion"; 

const Itinerary = ({ day, index, isActive, onToggle }) => {
    const itineraryData = [
        {
          title: "Day 1 - Constanța, Romania",
          date: "Oct 20, 2019",
          distance: "137 km",
          description:
            "I had a good trip! Sorry I gave so little news but I needed some quite time in nature :) Going to Vietnam now",
        },
        {
          title: "Day 2 - Silistra, Bulgaria",
          date: "Oct 18, 2019",
          distance: "68 km",
          description: "",
        },
        {
          title: "Day 3 - Tutrakan, Bulgaria",
          date: "Oct 17, 2019",
          distance: "184 km",
          description: "",
        },
      ];
        const [openIndex, setOpenIndex] = useState(0);
      
        const toggle = (index) => {
          setOpenIndex(openIndex === index ? null : index);
        };
      
        return (
          <div className="relative border-l-4 border-gray-200 pl-6">
            {itineraryData.map((item, index) => (
              <div key={index} className="mb-8 relative">
                {/* Vertical Line Dot */}
                <div className="absolute left-[-20px] bg-blue-50 top-1.5">
                  <div
                    className={`w-4 h-4 rounded-full border-4 ${
                      openIndex === index
                        ? "border-red-500 bg-white"
                        : "border-gray-300 bg-white"
                    }`}
                  ></div>
                </div>
      
                {/* Distance */}
                <div className="flex justify-between items-start gap-4">
                  <div className="w-full">
                    <h3
                      className="text-lg font-semibold cursor-pointer"
                      onClick={() => toggle(index)}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
      
                    {/* Accordion */}
                    {openIndex === index && item.description && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-100 lg:w-110 sm:w-65 p-4 rounded border mt-2 "
                      >
                        <p className="mb-3 text-gray-700 ">{item.description}</p>
                        {/* <div className="flex gap-3">
                          <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-600">
                            Edit
                          </button>
                          <button className="bg-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-400">
                            Attach
                          </button>
                          <button className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded hover:bg-red-200">
                            Delete
                          </button>
                        </div> */}
                      </motion.div>
                    )}
                  </div>
      
                  <span className="text-sm bg-gray-100 bg-blue-500 px-3 py-1 rounded-full whitespace-nowrap">
                    {item.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      };
      
export default Itinerary
    ;