import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import HomeCardPost from './components/HomeCardPost'
import HomeAboutUs from './components/HomeAboutUs'
import HomePackageCard from './components/HomePackageCard'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Link } from 'react-router-dom'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { IoArrowDown } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { PiUserSwitch } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";
import { LuArrowUpRight } from "react-icons/lu";

import AboutImg1 from './assets/aboutus1.jpg'
import AboutImg2 from './assets/aboutus2.jpg'


// import backgroundimg from './assets/footer-backgbround.png'

function App() {

  // Sample travel packages.
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

  //slider settings
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      },
      {
        breakpoint: 900,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
        }
      }
    ]
  };

  const mapSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768, // Small Tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  
  return (
    <>
      {/* header */}
      <header>
        <NavBar page="home"/>
      </header>

      <div className="h-auto lg:h-[100vh]">
        {/* hero section */}
        <HeroSection />
      </div>

      {/* cards section */}
      <div className="mt-20 lg:mt-30">
        <HomeCardPost />
      </div>

      {/* aboutus section */}
      <div className="h-[100vh] flex mt-10 lg:mt-20 md: justify-center items-center">
        <div className="relative w-full h-5/6">
          {/* <HomeAboutUs /> */}
          <img src={AboutImg1} alt="" className="w-full h-full object-cover" />
          {/* overlay */}
          <div className="absolute left-0 top-0 h-full w-2/3 bg-gradient-to-r from-[#0d1b2a]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-l from-[#0d1b2a]/80 to-transparent z-10 pointer-events-none" />

          {/* content  */}
          <div className="absolute inset-0 z-20 flex lg:flex-row flex-col items-center justify-left text-white mx-auto w-full lg:w-5/6 p-4 md:px-15 lg:px-0">
            <div className="w-full lg:w-2/3 px-5 lg:px-0 lg:pr-40 lg:mt-[-60px]">
              <h2 className="text-xl font-semibold text-gray-100 text-center lg:text-left">Who are we?</h2>
              <p className="text-gray-300 flex flex-col font-semibold lg:font-bold text-xl lg:text-title mt-8 mb-3 lg:pr-20 text-center lg:text-left">Discover Your Next Adventure, <span className='text-3xl lg:text-[50px]  text-body'>Your journey begins here</span></p>
              <p className="mt-5 lg:mt-0 mb-4 text-gray-200 text-justify lg:text-left"> At WanderScape Travels, we craft unforgettable travel experiences
                tailored to your dreams. Whether it’s relaxing on a tropical beach,
                exploring ancient cities, or chasing adventure—we’re here to guide
                every step.</p>

              {/* aboutus link */}
              <Link to="/aboutus">
                <div className="absolute bg-body/20 backdrop-blur-md to-transparent z-26 bottom-5 w-55 h-20 rounded-full flex flex-row gap-3 px-2 left-5 md:left-15 lg:left-0 items-center hover:cursor-pointer hover:scale-110 transition">
                  <img src={AboutImg2} alt="" className="w-1/2 h-[80%] rounded-full " />
                  <p className="1/2 text-xs text-body">More about Regency Travel House</p>
                </div>
              </Link>
            </div>

            {/* sustainability */}
            <div className="w-full mt-10 lg:mt-0 lg:w-1/3 h-full lg:h-4/5 y-10 flex lg:flex-col flex-row gap-5 lg:gap-10">
              <div className="bg-white/20 h-2/3 lg:h-1/2 w-full p-3 lg:ml-[-150px] flex backdrop-blur-md rounded-3xl border border-white/20 shadow-xl text-white flex-col lg:flex-row">
                <img src="test2.jpg" alt="" className="h-full rounded-3xl object-cover w-full lg:w-1/2" />
                <div className="w-1/2 flex flex-col px-5 gap-2 items-center lg:justify-center text-center w-full lg:w-1/2">
                  <p className="p-3 text-lg text-gray-200  group-hover:bg-secondary group-hover:cursor-pointer rounded-full">Our Sustainability</p>

                  <Link to="/sustainability">
                    <button className="border w-30 border-body rounded-full py-1 text-sm text-body hover:bg-body hover:text-primary z-2 hover:cursor-pointer">
                      <span className="flex justify-center gap-1 items-center">Click Here <LuArrowUpRight className="bg-secondary w-6 h-6 rounded-full p-1 ml-2" /></span>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bg-white/20 h-2/3 lg:h-1/2 w-ful lg:w-full p-3 ml-0 lg:ml-[10px] flex flex-col-reverse lg:flex-row backdrop-blur-md rounded-3xl border border-white/20 shadow-xl text-white">
                <div className="w-full lg:w-1/2 flex flex-col lg:px-5 gap-2 items-center text-center lg:justify-center ">
                  <p className="hidden lg:block p-3 text-lg text-gray-200  group-hover:bg-secondary group-hover:cursor-pointer rounded-full">Our <br /> Rays Of Hope</p>

                  <p className="lg:hidden p-3 text-lg text-gray-200  group-hover:bg-secondary group-hover:cursor-pointer rounded-full">Our Rays Of Hope</p>

                  <Link to="/sustainability">
                    <button className="border w-30 border-body rounded-full py-1 text-sm text-body hover:bg-body hover:text-primary z-2 hover:cursor-pointer">
                      <span className="flex justify-center gap-1 items-center">Click Here <LuArrowUpRight className="bg-secondary w-6 h-6 rounded-full p-1 ml-2" /></span>
                    </button>
                  </Link>
                </div>

                <img src="team/team7.jpg" alt="" className="h-full rounded-3xl object-cover w-full lg:w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* journey map desktop */}
      <div className="hidden lg:flex h-[65vh] lg:px-10 py-15  gap-1 mt-20 justify-center items-center bg-neutral-100 ">
        <div className="w-full h-full">
          <h2 className="text-xl font-semibold text-gray-600">Find Your Journey Map!</h2>
          <div className="flex gap-5 mt-10">
              <div className="bg-white w-1/2 gap-0 pt-10 h-[300px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6 mx-auto">
                <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
                <h3 className="text-sm lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
                <p className="text-gray-600 text-sm lg:text-base">Explore a curated list of destinations based on your interests, budget, and travel dates.</p>
              </div>

              <div className="bg-white w-1/2 gap-0 pt-10 h-[300px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6 mx-auto">
                <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
                <h3 className="text-sm lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
                <p className="text-gray-600 text-sm lg:text-base">Explore a curated list of destinations based on your interests, budget, and travel dates.</p>
              </div>

             <div className="bg-white w-1/2 gap-0 pt-10 h-[300px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6 mx-auto">
                <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
                <h3 className="text-sm lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
                <p className="text-gray-600 text-sm lg:text-base">Explore a curated list of destinations based on your interests, budget, and travel dates.</p>
              </div>

              <div className="bg-white w-1/2 gap-0 pt-10 h-[300px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6 mx-auto">
                <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
                <h3 className="text-sm lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
                <p className="text-gray-600 text-sm lg:text-base">Explore a curated list of destinations based on your interests, budget, and travel dates.</p>
              </div>

              <div className="bg-white w-1/2 gap-0 pt-10 h-[300px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6 mx-auto">
                <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
                <h3 className="text-sm lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
                <p className="text-gray-600 text-sm lg:text-base">Explore a curated list of destinations based on your interests, budget, and travel dates.</p>
              </div>
                      
          </div>

              
        </div>
      </div>


    
      {/* journey map - mobile */}
      <div className="lg:hidden px-4 sm:px-6 lg:px-10 py-10 mt-10 bg-neutral-100">
        <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left mb-10">
          Find Your Journey Map!
        </h2>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-5">

          <div className="w-full flex gap-5">
            <div className="w-full sm:w-[48%] md:w-full lg:w-[18%] bg-white pt-10 h-[230px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6">
              <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
              <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Explore curated spots tailored to your travel mood and budget.
              </p>
            </div>

            <div className="w-full sm:w-[48%] md:w-full lg:w-[18%] bg-white pt-10 h-[230px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6">
              <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
              <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-700 mb-2">Customize Plans</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Personalize your route, accommodation, and experiences.
              </p>
            </div>
          </div>

          <div className="w-full flex gap-5">
            <div className="w-full sm:w-[48%] md:w-full lg:w-[18%] bg-white pt-10 h-[230px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6">
              <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
              <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Explore curated spots tailored to your travel mood and budget.
              </p>
            </div>

            <div className="w-full sm:w-[48%] md:w-full lg:w-[18%] bg-white pt-10 h-[230px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6">
              <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
              <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-700 mb-2">Customize Plans</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Personalize your route, accommodation, and experiences.
              </p>
            </div>
          </div>

          <div className="w-full flex gap-5">
            <div className="w-full sm:w-[48%] md:w-full lg:w-[18%] bg-white pt-10 h-[230px] lg:h-[280px] rounded-bl-[60px] rounded-tl-[60px] rounded-tr-[60px] shadow-md p-6">
              <div className="mb-4"><CiDiscount1 className="text-sky-700 w-6 h-6" /></div>
              <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-700 mb-2">Discover Destinations</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Explore curated spots tailored to your travel mood and budget.
              </p>
            </div>

            <div className="w-full sm:w-[48%] md:w-full lg:w-[18%]">
            </div>
          </div>

        </div>
      </div>




      {/* packages */}
      <div className='h-auto md:mt-30 mb-10 lg:mb-0 lg:h-[100vh] flex mt-10 lg:mt-20 justify-center items-center'>
        <div className="w-5/6 h-11/12">
          <div className="">
            <h2 className="text-xl font-semibold">We presented best packeges for your trip</h2>
            <p className="text-primary font-bold text-title mt-5 mb-5">Our Packages</p>
          </div>

          <div className="">
            <div className="slider-container">
              <Slider {...settings}>
                {/* packages */}
                {dummyPackages.map((item) => (
                  <HomePackageCard
                    title={item.title}
                    description={item.description}
                    views={item.views}
                    image={item.imageUrl}
                    months={item.months}
                    duration={item.duration} />
                ))}
              </Slider>
            </div>
          </div>
        </div>

      </div>

      {/* footer section*/}
      {/* footer section*/}
      <div className="bg-primary bg-center lg:px-5 px-10 pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-5/6 lg:w-4/5 mt-5 " />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">© All rights reserved by All In One Holdings.</p>
        </div>
      </div>
    </>
  )
}

export default App
