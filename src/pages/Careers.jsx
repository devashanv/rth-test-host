import React,{useEffect, useRef, useState} from 'react'
import NavBar1 from '../components/NavBar1'
import Footer from '../components/Footer'
import CareerCard from '../components/CareerCard';
import emailjs from 'emailjs-com';
import { IoArrowDown } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { PiUserSwitch } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";

import EmployeeImg1 from '../assets/employee/employee1.jpg'
import EmployeeImg2 from '../assets/employee/employee2.jpg'
import EmployeeImg3 from '../assets/employee/employee3.jpg'
import EmployeeImg4 from '../assets/employee/employee4.jpg'
import EmployeeImg5 from '../assets/employee/employee5.jpg'


function Careers() {

  //top mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [careers, setCareers] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useRef();
 

  const perks = [
    { icon: <CiDiscount1 className="text-sky-700 w-6 h-6" />, title: "Exclusive Travel Discounts", desc: "Enjoy discounted rates on flights, hotels, and tours as part of our team." },
    { icon: <IoBriefcaseOutline className="text-emerald-700 w-6 h-6" />, title: "Professional Development", desc: "Access ongoing training, certifications, and industry events to grow your career." },
    { icon: <IoCalendarOutline className="text-amber-700 w-6 h-6" />, title: "Flexible Time Off", desc: "We value work-life balance—take the time you need to recharge and explore." },
    { icon: <FaRegHeart className="text-rose-700 w-6 h-6" />, title: "Health & Wellness", desc: "Comprehensive health insurance and wellness programs to support your well-being." },
    { icon: <PiUserSwitch className="text-indigo-700 w-6 h-6" />, title: "Collaborative Culture", desc: "Join a supportive, respectful environment that thrives on shared success." },
    { icon: <AiOutlineGlobal className="text-teal-700 w-6 h-6" />, title: "Global Exposure", desc: "Be part of international projects and connect with global travel professionals." },
  ];

  // cv file submit
  const [resumeFile, setResumeFile] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleFileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     cv: e.target.files[0],
  //   });
  // };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure form is passed as the 3rd argument
    emailjs
      .sendForm('service_ppqwnuf', 'template_xvi7ki3', form.current, 'gDix4flYlLDzdMB-a')
      .then(
        (result) => {
          console.log(result.text);
          // Success: Display success message
          alert('Your application has been submitted successfully!');
        },
        (error) => {
          console.log(error.text);
          // Error handling
          alert('Oops! Something went wrong. Please try again.');
        }
      );
  };


    const [activeBtn, setActiveBtn] = useState("");
    const [activeIndex, setActiveIndex] = useState(null);
  
    const handleScroll = (id) => {
  
      setActiveBtn(id);
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };

  return (
    <>
      {/* header */}
      <header>
        <NavBar1 page="career"/>
      </header>

      <main>
        {/* landing section */}
        <div className="bg-gray-100 pt-20 pb-10 flex">
          <div className="w-5/6 mx-auto flex lg:flex-row flex-col">
            <section className="py-2 text-left w-ful lg:w-4/6 mb-4 leading-line-height mb-10 lg:pr-30">
              <h1 className="text-lg font-bold lg:text-5xl text-primary text-center lg:text-left">Be Part of Our Family</h1>
              <p className="text-gray-400 font-normal text-base mt-6 w-full leading-7">Discover top travel packages tailored for unforgettable escapes. Handpicked destinations, seamless planning, exclusive deals, breathtaking views, cultural experiences, thrilling adventures, and personalized services — your perfect journey starts here with the best in travel.</p>
              
              <button
                onClick={() => handleScroll("vacancy")}
               className={"border-2 border-secondary rounded-full text-body text-xs md:w-1/3 lg:w-45 lg:text-base hover:bg-secondary/[0.8] hover:cursor-pointer transition duration-300 ease-in-out hover:border-transparent bg-secondary font-semibold px-3 py-3 flex gap-2 justify-center items-center mt-10"}>
                <span>Open Positions </span>
                <IoArrowDown  />
              </button>
            </section>

            <section className="flex w-full md:w-4/6 md:mx-auto lg:w-2/6 justify-between ">
              <img src={EmployeeImg1} alt="" className="w-25 h-70 md:w-35 h-80 lg:w-30 lg:h-80 object-cover rounded-4xl"/>
              <img src={EmployeeImg3} alt="" className="w-25 h-70 md:w-35 h-80 lg:w-30 lg:h-80 object-cover rounded-4xl mt-15"/>
              <img src={EmployeeImg4} alt="" className="w-25 h-70 md:w-35 h-80 lg:w-30 lg:h-80 object-cover rounded-4xl"/>
            </section>        
          </div>
        </div>

        {/* benifits */}
        <div>
          <section className="py-16 px-4 mt-10 mb-10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/5 px-5 lg:px-0 lg:pr-10 md:mb-8">
                <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">Perks & Benefits</h2>
                <p className="text-primary font-bold text-title mt-8 mb-3 text-center lg:text-left">Why join us?</p>
                <p className="mb-3 text-gray-500 text-justify lg:text-left">Join our travel family for professional growth, flexible policies, wellness programs, and a vibrant culture that supports learning, collaboration, and meaningful recognition.</p>
                <p className="mb-3 text-gray-500 text-justify lg:text-left">Experience global exposure, cultural exchange, trusted mentorship, and unforgettable journeys — creating lasting memories and advancing your career in a purpose-driven environment.</p>
              </div>
              <div className="w-full lg:w-3/5 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
                {perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-md rounded-2xl p-4 sm:p-6 hover:shadow-lg transition"
                  >
                    <div className="mb-4">{perk.icon}</div>
                    <h3 className="text-base sm:text-xl font-semibold text-gray-700 mb-2">{perk.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{perk.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>
        </div>

        {/* open position */}
        <div id="vacancy" className="w-full bg-neutral-50 py-10 mb-20 mx-auto">
          <div className="w-5/6 mx-auto">
            <h2 className="text-xl font-semibold text-gray-600 py-8 text-center lg:text-left">Current Openings</h2>

            {/* careers */}
            {careers === null ? (
              <div className="w-full flex justify-center items-center gap-4 mb-1">
                <h2 className="text-xl font-normal text-gray-400 py-8">Not any positions available yet!</h2>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4 mb-1">
                <CareerCard />
                <CareerCard />
                <CareerCard />
                <CareerCard />
                <CareerCard /> 
              </div>
            )}
 
         
          </div>
        </div>

        {/* form section */}
        <div className="mb-30 mt-25 ">
          {/* form submission message */}
          {isSubmitted && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-bold text-green-500">Success!</h2>
                <p>Your application has been submitted successfully!</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
              </div>
            </div>
          )}

          <div className="w-5/6 mx-auto flex flex-col-reverse lg:flex-row lg:gap-2">
            <div className="lg:w-2/3 w-full mt-10 lg:mt-0">
              <form action="" ref={form} onSubmit={handleSubmit} className="w-full lg:pr-20 flex flex-col gap-3">
                <input
                  type="text"
                  name="fullname"
                  
                 
                  
                  placeholder="enter fullddd name"
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 border-secondary focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"/>


                <input
                  type="text"
                  name="email"
                  required
                  
                  placeholder="enter email address"
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 border-secondary focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"/>


                <input
                  type="text"
                  name="position"
                  
                  
                  required
                  placeholder="enter apply position"
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 border-secondary focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base" />

                <textarea
                  name="message"
                                    
                  placeholder="message to HR manager"
                  rows={6}
                  required
                  className="w-full text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 resize-none border-secondary  text-mainfont focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"></textarea>

                <input
                  type="file"
                  name='cv'
                  accept="application/pdf"
              
                  className="w-full text-gray-600 text-base lg:w-full lg:text-base rounded-xl border-2 border-secondary focus:ring-1  focus:ring-secondary focus:outline-none focus:border-secondary file:p-2 file:rounded-md file:bg-gray-100 lg:placeholder:text-secondary hover:cursor-pointer hover:bg-gray-100"/>

                <button
                  type="submit"
                  className="border-2 border-secondary rounded-full text-body text-xs md:w-full lg:w-45 lg:text-base hover:bg-secondary/[0.8] hover:cursor-pointer transition duration-300 ease-in-out hover:border-transparent bg-secondary font-semibold px-3 py-3 flex gap-2 justify-center items-center mt-10">
                  Submit
                </button>
              </form>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="">
                  <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">No Matching Position Available?</h2>
                  <p className="text-primary font-bold text-title mt-8 mb-3 text-center lg:text-left">Apply Here</p>
                  <p className="mb-3 text-gray-500 text-justify lg:text-left">We’re always open to discovering new talent. If there’s no position
                  that matches your profile right now, feel free to send us your resume
                  and a brief message. We’ll keep it on file and reach out if something
                  comes up!
                  </p>
                </div>
            </div>
          </div>
        </div>

        <div>
          {/* <Test /> */}
        </div>
      </main>

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

export default Careers