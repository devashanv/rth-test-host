import React, { useState, useEffect } from "react";
import img from "../assets/destination/destination-sample.jpg";
import BreadCrumbs from "../components/BreadCrumbs.jsx";
import { FaHotel } from "react-icons/fa6";
import { MdAssistantDirection } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { BsArrowDownCircle } from "react-icons/bs";
import { Collapse, initMDB } from "mdb-ui-kit";
initMDB({ Collapse });
import { useRef } from "react";
import Itinerary from "../components/Itinerary.jsx";
import Footer from "../components/Footer.jsx";
import html2pdf from "html2pdf.js";
import { useReactToPrint } from "react-to-print";
import API from "../api/axiosClient.js"; // make sure path is correct
import { IoMailOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { HiPrinter } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa6";
import { BiSolidDish } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import MapImage from "../assets/map.jpg";
import { useParams } from "react-router-dom";
import TripQuote from "../components/TripQuote.jsx";
import DefaultImage from "../assets/destination/destination-sample.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaClipboard } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { ImMail4 } from "react-icons/im";

import NavBar1 from "../components/NavBar1.jsx";

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

  const handlePrint = () => {
    setActiveBtn("about");
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const [showModal, setShowModal] = useState(false);

  const [activeBtn, setActiveBtn] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  };

  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await API.get(`/packages/${id}`);
        console.log("Package data:", response.data);
        setPkg(response.data);
      } catch (error) {
        console.error("Failed to fetch package:", error);
      }
    };

    fetchPackage();
  }, [id]);

  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      if (!pkg?.destination?.id) return;

      try {
        const res = await API.get(`/destinations/${pkg.destination.id}/images`);
        if (res.data.length > 0) {
          setHeroImage(
            `http://127.0.0.1:8000/storage/images/${res.data[0].filename}`
          );
        }
      } catch (err) {
        console.error("Failed to load hero image", err);
      }
    };

    fetchHeroImage();
  }, [pkg]);

  // const [galleryImage, setGalleryImage] = useState(null);

  // useEffect(() => {
  //   const fetchGalleryImage = async () => {
  //     if (!pkg?.package?.id) return;

  //     try {
  //       const res = await API.get(`/destinations/${pkg.package.id}/images`);
  //       if (res.data.length > 0) {
  //         setGalleryImage(
  //           `http://127.0.0.1:8000/storage/images/${res.data[0].filename}`
  //         );
  //       }
  //     } catch (err) {
  //       console.error("Failed to load gallery images", err);
  //     }
  //   };

  //   fetchGalleryImage();
  // }, [pkg]);

  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      if (!pkg?.id) return;

      try {
        const res = await API.get(`/packages/${pkg.id}/images`);
        const imageList = res.data.map((img) => ({
          ...img,
          url: `http://127.0.0.1:8000/storage/images/${img.filename}`,
        }));
        console.log(imageList);
        setGalleryImages(imageList);
      } catch (err) {
        console.error("Failed to load gallery images", err);
      }
    };

    fetchGalleryImages();
  }, [pkg]);

  if (!pkg) return;

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.info("Please log in to add to your wishlist.");
      navigate("/login");
      return;
    }

    if (addedToWishlist || loading) return;

    setLoading(true);
    try {
      const response = await API.post(
        "/wishlist",
        { package_id: pkg.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setAddedToWishlist(true);
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setAddedToWishlist(true);
        toast.info("This package is already in your wishlist!");
      } else {
        console.error("Wishlist error:", error);
        toast.error("Failed to add to wishlist");
      }
    } finally {
      setLoading(false);
    }
  };

  // gallery images
  // const images = [
  //   {
  //     src: "card-images/card1.jpg",
  //     title: "Living Room",
  //     className: "col-span-2 row-span-1",
  //   },
  //   {
  //     src: "card-images/card2.jpg",
  //     title: "Kitchen Set",
  //     className: "col-span-1 row-span-1",
  //   },
  //   {
  //     src: "card-images/card3.jpg",
  //     title: "Bed Room",
  //     className: "col-span-1 row-span-2",
  //   },
  //   {
  //     src: "card-images/card4.jpg",
  //     title: "Office Room",
  //     className: "col-span-1 row-span-1",
  //   },
  //   {
  //     src: "card-images/card2.jpg",
  //     title: "Family Room",
  //     className: "col-span-1 row-span-1",
  //   },
  //   {
  //     src: "card-images/card1.jpg",
  //     title: "Family Room",
  //     className: "col-span-2 row-span-1",
  //   },
  // ];

  return (
    <>
      <header>
        <NavBar1 page="destinations" />
      </header>
      <div ref={printRef}>
        <main>
          {/* hero section */}

          <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-cover bg-center">
            {heroImage ? (
              <img
                src={heroImage}
                alt="Hero"
                className="object-cover w-full h-full rounded-2xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
            {/* <img src="../../public/card-images/card1.jpg" /> */}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent rounded-2xl z-10"></div>

            {/* Breadcrumbs */}
            <div className="absolute top-5 left-5 z-20">
              <BreadCrumbs />
            </div>

            {/* Contact Buttons */}

            <div className="absolute fixed top-80  right-10 flex flex-col gap-3 justify-end text-sm print:hidden">
              <div
                onClick={handleEmailClick}
                className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition"
              >
                <IoMailOutline />
              </div>
              <div
                onClick={handleWhatsAppClick}
                className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition"
              >
                <FaWhatsapp />
              </div>
              <div
                onClick={handleCallClick}
                className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition"
              >
                <MdSupportAgent />
              </div>
            </div>

            {/* Package Details */}
            <div className="absolute inset-0 flex items-center px-5 md:px-10 lg:px-52 z-20">
              <div className="text-white w-full text-center md:text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-bold  mb-4">
                  {pkg.title}
                </h1>

                <div className="flex flex-col md:flex-row md:justify-center lg:justify-start gap-3 md:gap-10 mb-5 text-white/80">
                  <p className="text-xl flex items-center gap-2">
                    <MdLocationPin />
                    {pkg.destination.country}
                  </p>
                  <p className="text-xl flex items-center gap-2">
                    <FaCalendarDay className="text-base" />
                    <span>
                      {pkg.start_date} to {pkg.end_date}
                    </span>
                  </p>
                </div>

                <p className="text-3xl font-semibold text-white pb-1">
                  Starting From LKR {pkg.price_per_person}
                </p>
                <p className="text-xs font-normal text-white/70">
                  (Conditions Apply)
                </p>

                <div className="mt-5 flex flex-col gap-5 print:hidden">
                  <div className="mt-5 flex flex-col gap-5 print:hidden">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-[#ec2326] cursor-pointer w-40 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition"
                    >
                      Get a Quote
                    </button>

                    {showModal && (
                      <TripQuote
                        packageId={pkg.id}
                        onClose={() => setShowModal(false)}
                      />
                    )}
                  </div>

                  <div className="flex gap-5 mt-6">
                    <button
                      className={`text-body border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition ${
                        addedToWishlist
                          ? "text-red-600 border-red-400"
                          : "text-gray-300 border-gray-200 hover:text-[#ff1212] hover:border-secondary"
                      }`}
                      onClick={handleAddToWishlist}
                      disabled={loading}
                      title={
                        addedToWishlist
                          ? "Already in Wishlist"
                          : "Add to Wishlist"
                      }
                    >
                      {loading ? (
                        <span className="text-xs">...</span>
                      ) : (
                        <FaHeart className="mx-1 my-1 text-xl font-medium" />
                      )}
                    </button>

                    <button
                      onClick={() => setOpen(!open)}
                      className="text-body border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition"
                    >
                      <FaShareNodes />
                    </button>
                    <button
                      onClick={handlePrint}
                      className="text-body border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition"
                    >
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
                            <p className="text-primary font-bold text-title mt-8 mb-3">
                              Share This Destination
                            </p>
                            <p className="mb-3 text-gray-500">
                              Let your friends discover this amazing journey too
                              — copy the link or share it instantly!
                            </p>
                          </div>

                          <div className="flex gap-2">
                            {/* copy */}
                            <button
                              onClick={copyToClipboard}
                              className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                            >
                              {copied ? (
                                <p className="flex flex-col gap-2 text-xs justify-center items-center">
                                  <IoIosCheckmarkCircle className="w-15 h-15 p-3 text-green-400 rounded-full bg-white shadow" />
                                  Copied!
                                </p>
                              ) : (
                                <p className="flex flex-col gap-2 text-xs justify-center items-center">
                                  <FaClipboard className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow" />
                                  Copy to Clipboard
                                </p>
                              )}
                            </button>

                            {/* whatsapp */}
                            <button
                              onClick={shareViaWhatsApp}
                              className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                            >
                              <p className="flex flex-col gap-2 text-xs justify-center items-center">
                                <IoLogoWhatsapp className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow" />
                                Via WhatsApp
                              </p>
                            </button>

                            {/* email */}
                            <button
                              onClick={shareViaEmail}
                              className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                            >
                              <p className="flex flex-col gap-2 text-xs justify-center items-center">
                                <ImMail4 className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow" />
                                Via Email
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tabs section */}
          <div className=" print:hidden">
            {/* Tabs */}
            <header className="mt-10 top-0 z-50 w-1/2 mx-auto p-5">
              <div className="container mx-auto flex space-x-6 card-shadow justify-around gap-0 text-white flex rounded-full">
                <button
                  onClick={() => handleScroll("about")}
                  className={
                    activeBtn == "about"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  About
                </button>
                <button
                  onClick={() => handleScroll("map")}
                  className={
                    activeBtn == "map"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  Map
                </button>
                <button
                  onClick={() => handleScroll("itineraries")}
                  className={
                    activeBtn == "itineraries"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  Itineraries
                </button>
                <button
                  onClick={() => handleScroll("gallery")}
                  className={
                    activeBtn == "gallery"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  Gallery
                </button>
              </div>
            </header>

            {/* Page Sections */}
            <main className="space-y-20 px-4 py-10 container mx-auto">
              <section
                id="about"
                className="min-h-screen flex print:p-10 print:bg-white print:text-black print:leading-relaxed print:space-y-6 print:w-full print:max-w-[800px] print:mx-auto"
              >
                <div className="w-2/5">
                  <h2 className="text-3xl mt-5 font-bold mb-2">
                    Get An Idea About {pkg.title}.
                  </h2>

                  <p className="text-gray-400 text-sm mt-5 pr-5 leading-6">
                    {pkg.description}
                  </p>

                  <p className="flex test-xs text-gray-500 mt-5 gap-2 mr-20">
                    <span>Activities:</span>
                    <span>{pkg.activities}</span>
                  </p>
                  {/* includes & eexcludes */}
                  <div className="w-full mt-[-40px] text-gray-600">
                    <div className="flex flex-col gap-3 w-full mt-8">
                      <div className="w-full py-10">
                        <p>Includes:</p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                          {pkg.include?.split(",").map((item, idx) => (
                            <span
                              key={idx}
                              className="bg-white card-shadow px-4 py-2 rounded-full text-sm"
                            >
                              {item.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 text-gray-600">
                      <div className="w-full">
                        <p>Excludes:</p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
                          {pkg.exclude?.split(",").map((item, idx) => (
                            <span
                              key={idx}
                              className="bg-red-100 px-4 py-2 rounded-full text-sm"
                            >
                              {item.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* gallery section */}
                {/* <div className="w-3/5">
                  <section id="gallery" className="p-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className={`relative overflow-hidden rounded-xl shadow-md group ${img.className}`}
                        >
                          <img
                            src={img.galleryImage}
                            alt={img.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </div> */}
                <div className="w-3/5">
                  <section id="gallery" className="p-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          className="relative overflow-hidden rounded-xl shadow-md group"
                        >
                          <img
                            src={img.url}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                      {galleryImages.length === 0 && (
                        <p className="text-gray-500 text-sm">
                          No images available for this package.
                        </p>
                      )}
                    </div>
                  </section>
                </div>

              </section>
            </main>
          </div>
        </main>

        {/* common cards */}
        <section className="px-10  py-8 w-full mt-[-30px]">
          <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-5xl p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <FaHotel className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-lg text-black">Accomodation</h3>
              <p className="text-sm text-gray-500 px-10">
                Stay in top-rated, cozy, and stylish accommodations—carefully
                selected to give you comfort, luxury, and peace wherever you
                travel.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-5xl p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <FaCar className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-lg text-black">Transport</h3>
              <p className="text-sm text-gray-500 px-10">
                Whether by air, sea, or road—our expert team arranges smooth,
                reliable transportation tailored to your destination and
                comfort.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-5xl p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <BiSolidDish className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-lg text-black">
                Delicious Meals
              </h3>
              <p className="text-sm text-gray-500 px-10">
                Enjoy mouthwatering, locally inspired meals every day—crafted to
                delight your taste buds and keep you energized for adventures.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-5xl p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <SiAdguard className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-lg text-black">Safety</h3>
              <p className="text-sm text-gray-500 px-10">
                Travel with peace of mind—our trips are designed with strict
                safety standards, trusted partners, and 24/7 on-trip support.
              </p>
            </div>
          </div>
        </section>

        {/* itineraries */}
        <div className="w-5/6 mx-auto flex flex-row py-20">
          <section id="itineraries" className="w-1/2 min-h-screen">
            <h2 className="text-3xl font-bold mb-4">Itineraries</h2>
            <p className="text-gray-600">
              This is the Itineraries section content...
            </p>

            <div className="max-w-2xl mx-auto p-6">
              {pkg.itineraries
                ?.slice()
                .sort((a, b) => a.dayNumber - b.dayNumber)
                .map((day, index) => (
                  <Itinerary
                    key={index}
                    index={index}
                    day={day}
                    isActive={activeIndex === index}
                    onToggle={() =>
                      setActiveIndex(index === activeIndex ? null : index)
                    }
                  />
                ))}

              <p className="text-xl flex items-center gap-2">
                {pkg.itineraries?.title}
              </p>
            </div>
          </section>

          <section id="map" className="w-1/2 min-h-screen px-10">
            <h2 className="text-3xl font-bold mb-4">Map</h2>
            <p className="text-gray-600">
              Visualize your journey with our interactive map—see each
              destination, route, and highlight at a glance for easy planning.
            </p>

            <img
              src={MapImage}
              alt=""
              className="w-4/5 mx-auto h-3/5 rounded-lg mt-10 object-cover"
            />
          </section>
        </div>
      </div>

      {/* footer section*/}
      <div className="bg-primary bg-center px-20 pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-4/5 mt-20" />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">
            © All rights reserved by All In One Holdings.
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Destination;
