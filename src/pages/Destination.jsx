import React, { useState, useRef, useEffect } from 'react'
import NavBar1 from '../components/NavBar1'
import img from '../assets/destination/destination-sample.jpg'
import BreadCrumbs from '../components/BreadCrumbs'

// import { Collapse, initMDB } from "mdb-ui-kit";

// initMDB({ Collapse });
import { MdLocationPin } from "react-icons/md";
import Itinerary from '../components/Itinerary'
import Footer from '../components/Footer'
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import { MdAssistantDirection } from "react-icons/md";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { HiPrinter } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { BiSolidDish } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import { FaClipboard } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { ImMail4 } from "react-icons/im";

import MapImage from '../assets/map.jpg'

import { PageTop, PageBottom, PageBreak } from "@fileforge/react-print";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



function Destination() {

  //top mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // share functionality
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    });
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareViaEmail = () => {
    const pageURL = window.location.href;
    const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check%20out%20this%20travel%20package&body=${pageURL}&tf=1  `;
    window.open(emailUrl, "_blank");
  };


  /* contact feature */
  //via email
  const companyEmail = "info@regencytravel.com";
  const handleEmailClick = () => {
    const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${companyEmail}`;
    window.open(emailUrl, "_blank");
  };

  //via whatsapp
  const companyWhatsApp = "94812552666";
  const handleWhatsAppClick = () => {
    const whatsappLink = `https://wa.me/${companyWhatsApp}`;
    window.open(whatsappLink, "_blank");
  };

  //via phone
  const phoneNumber = "+94778526548";
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };


  // page print function
  const printRef = useRef();


  const [activeBtn, setActiveBtn] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleScroll = (id) => {

    setActiveBtn(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  const TripAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  }


  //itenerary list
  const itineraryData = [
    {
      title: 'Day 1',
      location: 'Constanța, Romania',
      date: 'Oct 20, 2019',
      distance: '137 km',
      description: "I had a good trip! Sorry I gave so little news but I needed some quite time in nature :) Going to Vietnam now",
    },
    {
      title: 'Day 2',
      location: 'Silistra, Bulgaria',
      date: 'Oct 18, 2019',
      distance: '68 km',
      description: "I'm ok. Out of the woods now",
    },
    {
      title: 'Day 3',
      location: 'Tutrakan, Bulgaria',
      date: 'Oct 17, 2019',
      distance: '184 km',
      description: "Getting seriously lost in a swamp here. I need a break. I’ll keep going tomorrow",
    },

  ];


  // gallery images
  const images = [
    { src: 'card-images/card1.jpg', title: 'Living Room', className: 'col-span-2 row-span-1' },
    { src: 'card-images/card2.jpg', title: 'Kitchen Set', className: 'col-span-1 row-span-1' },
    { src: 'card-images/card3.jpg', title: 'Bed Room', className: 'col-span-1 row-span-2' },
    { src: 'card-images/card4.jpg', title: 'Office Room', className: 'col-span-1 row-span-1' },
    { src: 'card-images/card2.jpg', title: 'Family Room', className: 'col-span-1 row-span-1' },
    { src: 'card-images/card1.jpg', title: 'Family Room', className: 'col-span-2 row-span-1' },
  ];

  const handlePrint = () => {
    setActiveBtn("about");
    setTimeout(() => {
      window.print();
    }, 100);
  };


  const captureRef = useRef();


  const handleCapture = async () => {
    const element = captureRef.current;

    // Temporarily hide elements you don't want to capture
    document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');

    // Wait for a small delay to ensure hiding applies
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
      windowWidth: document.documentElement.scrollWidth,
      scrollY: -window.scrollY
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('package-details.pdf');

    // Re-show hidden elements
    document.querySelectorAll('.no-print').forEach(el => el.style.display = '');
  };

  return (
    <>
      <header className="print:hidden">

        <NavBar1 />
        
      </header>

      <div ref={captureRef}>
        <main className='print:bg-white print:text-black'> 
          {/* hero section */}
          <div className="w-full bg-[url('./assets/destination/destination-sample.jpg')] bg-cover bg-center h-[65vh] md:h-[40vh] lg:h-[70vh] rounded-2xl">
            <div className="">
              <BreadCrumbs/>
            </div>

            {/* contact btns */}
            <div className="print:hidden absolute fixed md:top-100 top-120 lg:top-80 right-5 lg:right-10 flex flex-col gap-3 justify-end text-sm print:hidden z-80 print:text-black">
              <button
                onClick={handleEmailClick}
               className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition">
                <IoMailOutline />
              </button>
              <button 
              onClick={handleWhatsAppClick}
              className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition">
                <FaWhatsapp />
              </button>
              <button 
              onClick={handleCallClick}
              className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition">
                <MdSupportAgent />
              </button>
            </div>

            <div className=" print:block bg-gradient-to-r from-[#000000]/80 to-transparent rounded-2xl md:pl-0 lg:pl-50 pt-8 h-[60vh] lg:h-[63.8vh] md:h-[36vh] print:text-black">
              {/* text secition */}
              <div className="h-auto w-full pt-20 text-center md:text-center lg:text-left">
                <h1 className="text-6xl text-body font-bold pb-2 md:p-0">Dhambadiva Full Tour</h1>

                <div className="flex gap-5 pb-5 justify-center lg:justify-start print:text-black">
                  <p className="print:text-center md:text-center text-xl font-normal gap-2 text-body lg:text-body/[0.8] flex flex-row flex flex-row justify-center items-center">
                    <span><MdLocationPin /></span>India
                  </p>
                  <p className="text-xl font-normal text-base gap-2 text-body lg:text-body/[0.8] text-body flex flex-row justify-center items-center flex">
                    <FaCalendarDay className="text-base" />
                    <span>December</span> to <span>April</span>
                  </p>
                </div>

                <p className="text-3xl font-semibold text-body pb-1">Starting From 100$</p>
                <p className="text-xs font-normal text-body/[0.7]">(Conditions Apply)</p>
              </div>


              {/* btn section */}
              <div className="mt-5 print:hidden flex flex-col gap-5">
                <button className="bg-[#ec2326] w-40 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition self-center lg:self-start">
                  Get a Quote
                </button>
                <div className='flex gap-5 mt-10 ml-2 lg:ml-0 lg:mt-6'>
                  <button className="text-body border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition">
                    <FaHeart />
                  </button>
                  <button onClick={() => setOpen(!open)} className="text-body border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition">
                    <FaShareNodes />
                  </button>
                  <button onClick={handlePrint} className="text-body border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition">
                    <HiPrinter />
                  </button>

                  {/* share popup box */}
                  {open && (
                     <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-xs"
                        onClick={() => setOpen(false)}
                      ></div>

                      <div className="relative z-50 bg-white shadow-xl flex flex-col rounded-lg w-1/3 p-4 space-y-3 animate-fade-in">
                        
                        <div className="text-center px-5">
                          <p className="text-primary font-bold text-title mt-8 mb-3">Share This Destination</p>
                          <p className="mb-3 text-gray-500">Let your friends discover this amazing journey too — copy the link or share it instantly!</p>
                        </div> 

                        <div className="flex gap-2">
                          {/* copy */}
                          <button
                            onClick={copyToClipboard}
                            className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                          >
                            {copied ? 
                              ( <p className="flex flex-col gap-2 text-xs justify-center items-center"><IoIosCheckmarkCircle className="w-15 h-15 p-3 text-green-400 rounded-full bg-white shadow"/>Copied!</p>) : 
                              ( <p className="flex flex-col gap-2 text-xs justify-center items-center"><FaClipboard className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow"/>Copy to Clipboard</p>
                            )}
                          </button>

                          {/* whatsapp */}
                          <button
                            onClick={shareViaWhatsApp}
                            className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                          >
                            <p className="flex flex-col gap-2 text-xs justify-center items-center"><IoLogoWhatsapp className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow"/>Via WhatsApp</p>
                          </button>

                          {/* email */}
                          <button
                            onClick={shareViaEmail}
                            className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                          >
                            <p className="flex flex-col gap-2 text-xs justify-center items-center"><ImMail4 className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow"/>Via Email</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>


          </div>

          {/* tabs section */}
          <div className="">
            {/* Tabs */}
            <header className="mt-10 top-0 z-50 w-full lg:w-1/2 mx-auto p-5">
              <div className="container mx-auto flex space-x-6 card-shadow justify-around gap-0 text-white flex rounded-full">
                <button onClick={() => handleScroll("about")} className={(activeBtn == "about" ?
                  "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary text-body hover:cursor-pointer" :
                  "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                )}>
                  About
                </button>
                <button onClick={() => handleScroll("map")} className={(activeBtn == "map" ?
                  "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer" : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer")}>
                  Map
                </button>
                <button onClick={() => handleScroll("itineraries")} className={(activeBtn == "itineraries" ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer" :
                  "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer")}>
                  Itineraries
                </button>
                <button onClick={() => handleScroll("gallery")} className={(activeBtn == "gallery" ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer" : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer")}>
                  Gallery
                </button>
              </div>
            </header>

            {/* Page Sections */}
            <main className="space-y-20 lg:px-4 py-10 w-5/6 mx-auto print:text-black print:mt-5">
              <section id="about" className="flex lg:flex-row flex-col">
                <div className='w-full lg:w-2/5'>
                  <h2 className="text-3xl mt-5 font-bold mb-2 text-center lg:text-left print:text-black">An pilgrim Tour to Dhambadiva within 2 weekes.</h2>

                  <p className="text-gray-400 text-sm mt-5 lg:pr-5 leading-6 text-justify lg:text-left print:text-black">A journey to Dambadiva is a sacred pilgrimage for Buddhists, visiting places like Bodh Gaya, Sarnath, and Kushinagar. It’s a time for meditation, chanting, and spiritual reflection. Walking where the Buddha once lived and taught inspires inner peace, devotion, and a deeper understanding of his teachings, making it a truly meaningful and transformative experience.</p>

                  <p className="flex test-xs text-gray-500 mt-5 gap-2 mr-20 print:text-black">
                    <span>Activities:</span>
                    <span>Religious Activities</span>
                  </p>
                  {/* includes & eexcludes */}
                  <div className="w-full mt-[-40px] text-gray-600 ">
                    <div className="flex flex-col gap-3 w-full mt-8">
                      <div className="w-full py-10 print:text-black">
                        <p className='print:text-black'>Includes:</p>
                        <div className="flex flex-wrap justify-start gap-4 mt-4">
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Return Air Tickets
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            All Meals
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Accommondation
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            All Transfer
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Entry Visa
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Entrance Fee
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Guide Service
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Tour Manager
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Complimentary Travel Bag
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Mineral Watter
                          </span>
                        </div>
                      </div>

                      <div className="w-full print:text-black">
                        <p className='print:text-black'>Excludes:</p>
                        <div className="flex flex-wrap justify-start gap-4 mt-4 print:text-black">
                          <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Camera Fee
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Video Fee
                          </span>
                          <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-gray-500 rounded-full text-sm sm:text-sm font-medium">
                            Any Aditional
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* gallery section - desktop*/}
                <div className="hidden lg:block w-3/5">
                  <section id="gallery" className="p-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">

                      <img
                        src="card-images/card1.jpg"
                        alt="Living Room"
                        className="w-full h-full object-cover rounded-3xl col-span-2 row-span-1"
                      />

                      <img
                        src="card-images/card2.jpg"
                        alt="Kitchen Set"
                        className="w-full h-full object-cover rounded-3xl col-span-1 row-span-1"
                      />

                      <img
                        src="card-images/card3.jpg"
                        alt="Bed Room"
                        className="w-full h-full object-cover rounded-3xl col-span-1 row-span-2"
                      />

                      <img
                        src="card-images/card4.jpg"
                        alt="Office Room"
                        className="w-full h-full object-cover rounded-3xl col-span-1 row-span-1"
                      />

                      <img
                        src="card-images/card2.jpg"
                        alt="Family Room"
                        className="w-full h-full object-cover rounded-3xl col-span-1 row-span-1"
                      />

                      <img
                        src="card-images/card1.jpg"
                        alt="Family Room"
                        className="w-full h-full object-cover rounded-3xl col-span-2 row-span-1"
                      />
                      </div>
                  </section>
                </div>

                  {/* gallery section - mobile*/}
                <div className='w-full lg:w-3/5 lg:hidden' >
                  <section id="gallery" className="pt-10 lg:p-6 w-full lg:max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-1 grid-cols-3 md:grid-cols-3 auto-rows-[200px] gap-4">
                        <img
                          src="card-images/card1.jpg"
                          alt="Living Room"
                          className="w-full h-full object-cover rounded-3xl col-span-2 row-span-1"
                        />

                        <img
                          src="card-images/card2.jpg"
                          alt="Kitchen Set"
                          className="w-full h-full object-cover rounded-3xl col-span-1 row-span-1"
                        />

                        <img
                          src="card-images/card3.jpg"
                          alt="Bed Room"
                          className="w-full h-full object-cover rounded-3xl col-span-1 row-span-2"
                        />

                        <img
                          src="card-images/card4.jpg"
                          alt="Office Room"
                          className="w-full h-full object-cover rounded-3xl col-span-1 row-span-1"
                        />

                        <img
                          src="card-images/card2.jpg"
                          alt="Family Room"
                          className="w-full h-full object-cover rounded-3xl col-span-1 row-span-1"
                        />

                        <img
                          src="card-images/card1.jpg"
                          alt="Family Room"
                          className="w-full h-full object-cover rounded-3xl col-span-2 row-span-1"
                        />
                    </div>
                  </section>
                </div>
              </section>
            </main>
          </div>
        </main>

        {/* common cards */}
        <section className="px-6 py-8 w-full mt-10 lg:mt-10 print:text-black">
          <div className="mx-auto w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">

            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <FaHotel className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">Accommodation</h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Stay in cozy, stylish places with comfort and luxury.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <FaCar className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">Transport</h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Smooth, reliable travel tailored to your comfort.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <BiSolidDish className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">Meals</h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Enjoy local meals crafted to delight your taste buds.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <SiAdguard className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">Safety</h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Travel safe with trusted partners and 24/7 support.
              </p>
            </div>

          </div>
        </section>



        {/* itineraries */}
        <div className="w-5/6 h-auto md:mt-15 lg:mt-0 mx-auto flex flex-col lg:flex-row lg:py-20 print:block print:text-black">
          <section id="itineraries" className="w-full lg:w-1/2 h-auto">
            <h2 className="text-3xl font-bold mb-4">Itineraries</h2>
            <p className="text-gray-600">This is the Itineraries section content...</p>

            {/* list of your code section */}
            <div className="w-full lg:max-w-2xl mx-auto p-6">
              {itineraryData.map((day, index) => (
                <Itinerary
                  key={index}
                  index={index}
                  day={day}
                  isActive={activeIndex === index}
                  onToggle={() => setActiveIndex(index === activeIndex ? null : index)}
                />
              ))}
            </div>
          </section>

          <section id="map" className="w-1/2 w-full lg:w-full min-h-screen lg:px-10 print:block print:text-black">
            <h2 className="text-3xl font-bold mb-4">Map</h2>
            <p className="text-gray-600">Visualize your journey with our interactive map—see each destination, route, and highlight at a glance for easy planning.</p>

            <img src={MapImage} alt="" className="w-full lg:w-4/5 mx-auto h-3/5 rounded-lg mt-10 object-cover print:block" />
          </section>
        </div>
      </div>


      {/* footer section*/}
      <div className="bg-primary bg-center lg:px-5 px-10 lg:pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-5/6 lg:w-4/5 mt-5 lg:mt-0" />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">© All rights reserved by All In One Holdings.</p>
        </div>
      </div>


    </>

  )
}



export default Destination