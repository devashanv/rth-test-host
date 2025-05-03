import React, { useEffect, useState }  from 'react'
import Video1 from '../assets/hero-videos/1.mp4'
import Video2 from '../assets/hero-videos/5.mp4'
import Video3 from '../assets/hero-videos/2.mp4'
import Video4 from '../assets/hero-videos/4.mp4'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { Link } from 'react-router-dom'

function HeroSection() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      video: Video1,
      title: "Discover Paradise on Earth",
      description: "Discover the breathtaking beauty of tropical islands with pristine beaches, crystal clear waters, and vibrant marine life. Experience paradise like never before with our exclusive island getaway packages.",
    },
    {
      video: Video3,
      title: "Travel. Explore. Live. Stuning.",
      description: "Create unforgettable memories with your loved one in the world's most romantic destinations. From private beach dinners to luxury spa treatments, we'll make your romantic dreams come true.",
    },
    {
      video: Video2,
      title: "Your Journey Begins Here",
      description: "Embark on thrilling adventures through rugged landscapes, towering mountains, and wild rivers. Our adventure tours are designed to challenge and inspire you while keeping safety our top priority.",
    },
  ];
  
  const contactInfo = [
    { icon: <FaPhoneAlt />, label: "+1 234 567 890" },
    { icon: <FaEnvelope />, label: "info@travelagency.com" },
    { icon: <FaMapMarkerAlt />, label: "123 Beach Avenue, Wanderlust City" },
  ];

  // Auto play every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-full md:h-[50vh] h-[90vh] lg:h-screen overflow-hidden font-sans">
      {/* Videos */}
      {slides.map((slide, index) => (
        <video
          key={index}
          src={slide.video}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${current === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a]/60 via-[#0d1b2a]/20 to-[#0d1b2a]/30 z-20 pointer-events-none" />

    
      {/* Slide Content */}
      <div className="lg:absolute lg:z-30 lg:inset-0 lg:flex lg:items-start lg:py-35 lg:px-20 absolute z-30 inset-0 flex flex-col items-center px-10">

        <div className="lg:text-white lg:pt-25 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:h-4/5 lg:space-y-10 md:w-4/5 text-white pt-20 full flex flex-col justify-center h-4/5 space-y-10">
        
          <h1 className="lg:text-[60px] lg:font-bold lg:leading-tight lg:text-left  lg:pr-40 text-[40px] text-center font-bold leading-tight">
            {slides[current].title}
          </h1>
          <p className="lg:text-lg lg:text-gray-200 lg:leading-8 lg:text-left lg:pr-20 md:text-lg text-base text-center text-gray-100 leading-6">
            {slides[current].description}
          </p>

          {/* CTA Buttons */}
          <div className="lg:flex lg:justify-start lg:flex-wrap lg:gap-4 lg:mt-2 flex justify-center gap-4 mt-2">
            <Link to="/contactus">
              <button className="border text-sm lg:text-base border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black lg:transition">
                Get In Touch
              </button>
            </Link>
            <Link to="/destination-packages">
              <button className="bg-[#ec2326] text-sm lg:text-base text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
                Explore Destination
              </button>
            </Link>
          </div>

          {/* Dot Indicators */}
          <div className="lg:absolute lg:bottom-20 lg:left-27 lg:transform lg:-translate-x-1/2 lg:z-30 lg:flex lg:gap-2 absolute bottom-50 left-18 transform -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* contact info */}
        <div className="lg:absolute lg:w-80 md:flex-row lg:flex-col md:gap-5 lg:gap-2 lg:bottom-8 flex flex-col lg:right-8 lg:z-30 w-full gap-2 mt-[-10px] lg:mt-0">

          <div className="flex flex-row w-full gap-1 group">
            <div className="bg-white/10 flex justify-center items-center lg:w-2/12 backdrop-blur-md rounded-full border border-white/20 lg:shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer p-2 gap-3">
              <BiPhoneCall className="text-lg" />
            </div>
            <div className="lg:bg-white/10 lg:w-10/12 w-full backdrop-blur-md rounded-full border border-white/20 shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer">
              <p className="p-3 lg:text-sm text-xs">+94 70 794 5502</p>
            </div>
          </div>

          <div className="flex flex-row w-full gap-1 group">
            <div className="bg-white/10 flex justify-center items-center lg:w-2/12 backdrop-blur-md rounded-full border border-white/20 lg:shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer p-2 gap-3">
              <MdOutlineEmail className="text-lg" />
            </div>
            <div className="lg:bg-white/10 lg:w-10/12 w-full backdrop-blur-md rounded-full border border-white/20 shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer">
              <p className="p-3 lg:text-sm text-xs">info@regencytravel.com</p>
            </div>
          </div>

          <div className="flex flex-row w-full gap-1 group">
            <div className="bg-white/10 flex justify-center items-center lg:w-2/12 backdrop-blur-md rounded-full border border-white/20 lg:shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer p-2 gap-3">
              <GrLocation className="text-lg" />
            </div>
            <div className="lg:bg-white/10 lg:w-10/12 w-full backdrop-blur-md rounded-full border border-white/20 shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer">
              <p className="p-3 lg:text-sm text-xs group-hover:bg-secondary group-hover:cursor-pointer lg:rounded-full"> 741 Peradeniya Rd, Kandy.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HeroSection