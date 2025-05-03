import React from 'react'
import FooterLogo from '../assets/footer-logo.png'
import { Link } from 'react-router-dom'
import { MdArrowOutward } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { MdAccessTimeFilled } from "react-icons/md";

function Footer() {
  return (
    <>
          <footer className="flex flex-col md:px-15 lg:px-0 gap-10 text-white py-8 lg:py-0 lg:flex-row lg:justify-between mb-15">
              {/* Logo section */}
              <div className="flex flex-col gap-5 lg:w-2/5 items-center md:items-start">
                  <img src={FooterLogo} alt="Regency Travel House Logo" className="h-16 w-3/5 object-contain lg:h-24 lg:w-4/5 md:w-auto" />
                  <p className="text-base text-justify lg:text-left leading-7 lg:text-lg text-body/[0.8] lg:leading-8">
                      At Regency Travel House (Pvt) Ltd Established in 2025, we believe that travel is more than just a journey—it’s an experience that enriches the soul.
                  </p>
              </div>

              {/* Quick links */}
              <div className="flex flex-col items-start lg:w-1/5 lg:ml-10">
                  <h2 className="text-xl font-semibold mb-3 lg:text-2xl lg:mb-3 lg:text-body/[0.8]">Quick Links</h2>
                  <ul className="flex flex-wrap lg:flex-col md:flex w-full justify-left gap-5">
                      {["Home", "About", "Destination", "Careers", "Contact Us"].map((label, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm hover:text-secondary lg:text-lg text-body/[0.8]">
                              <MdArrowOutward />
                              <Link to="/">{label}</Link>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Blogs */}
              <div className="flex hidden lg:block flex-col gap-4 lg:w-1/5">
                  <h2 className="text-xl font-semibold lg:text-2xl lg:mb-4 lg:text-body/[0.8]">Our Blogs</h2>
                  <ul className="flex lg:flex-col gap-4 w-full justify-between">
                      {[1, 2, 3].map((_, index) => (
                          <li key={index} className="flex lg:flex-row items-center flex-col gap-3">
                              <div className="w-16 h-16 bg-white rounded-sm" />
                              <div className="flex flex-col justify-center lg:text-left text-center">
                                  <p>Title here</p>
                                  <p className="flex items-center gap-2 text-sm">
                                      <MdAccessTimeFilled />
                                      April 05 2025
                                  </p>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-6 lg:w-2/5 ">
                  <h2 className="text-xl font-semibold lg:text-2xl lg:mb-8 lg:text-body/[0.8]">Contact us</h2>
                  <ul className=" w-full lg:w-full lg:mx-auto font-normal flex flex-wrap gap-5 lg:gap-2 lg:gap-3 lg:flex lg:flex-row lg:pl-0 justify-between">

                      <li className="flex flex-row lg:flex-col items-center gap-2 text-body/[0.8]">
                          <CiPhone className="text-body text-sm w-10 h-10 p-2 bg-body/[0.1] rounded-full bg-body hover:bg-secondary" />
                          <div>
                              <p>+94 11 123 4567</p>
                              <p>+94 11 123 4567</p>
                          </div>
                      </li>

                      <li className="flex flex-row lg:flex-col items-center gap-2 text-body/[0.8]">
                          <IoMailOutline className="text-body text-sm w-10 h-10 p-2 bg-body/[0.1] rounded-full bg-body hover:bg-secondary" />
                          <div>
                              <p>rthsupport@rth.lk</p>
                              <p>rthsupport@rth.lk</p>
                          </div>
                      </li>

                      <li className="flex flex-row lg:flex-col items-center gap-2 text-body/[0.8]">
                          <GoLocation className="text-body text-sm w-10 h-10 p-2 bg-body/[0.1] rounded-full bg-body hover:bg-secondary" />
                          <div className="flex flex-col justify-center text-center">
                              <p>789, Main street,</p>
                              <p>Kandy,Sri Lanka.</p>
                          </div>
                      </li>


                  </ul>

                  {/* Subscribe form */}
                  <form className="flex flex-col gap-3 mt-5 sm:flex-row">
                      <input
                          type="text"
                          placeholder="enter email address"
                          className="w-full px-4 py-2 rounded-full text-sm border-2 border-white placeholder:text-gray-300 text-black md:w-2/3"
                      />
                      <button className="px-4 py-2 rounded-full bg-secondary text-white hover:bg-body hover:text-secondary transition md:w-1/3">
                          Subscribe
                      </button>
                  </form>
              </div>
          </footer>



    </>
  )
}

export default Footer