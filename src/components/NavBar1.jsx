import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

function NavBar1(prop) {
    const [isMenuToggle, setisMenuToggle] = useState(false);

    const openMenu = () => {
        setisMenuToggle(!isMenuToggle);
    }

    const [showDestinations, setShowDestinations] = useState(false);

    return (
        <>
            <nav className="bg-white text-para flex justify-between px-5 py-3 lg:px-10 lg:py-2 relative">

                {/* logo */}
                <div className="w-2/3 flex lg:w-1/5 lg:flex">
                    <img src="RTH-logo.png" alt="Regency Travel House logo" className="w-40 h-12 lg:w-52 lg:h-16 object-cover" />
                </div>

                {/* nav links - desktop only */}
                <div className="hidden lg:flex lg:w-3/5 lg:px-20 lg:justify-between lg:items-center">
                    <ul className="w-full lg:w-4/5 lg:mx-auto font-semibold flex gap-4 flex-row pl-0 justify-between" id="nav-links">
                        <li className={prop.page === "home" ? "text-secondary" : "text-primary hover:text-secondary"}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={prop.page === "about" ? "text-secondary" : "text-primary hover:text-secondary"}>
                            <Link to="/aboutus">About</Link>
                        </li>


                        {/* destinations  */}
                        <li className="group hidden lg:block">
                            <span className={prop.page === "destination" ? "text-secondary flex items-center" : "text-primary hover:text-secondary flex items-center"}>
                                Destination <IoIosArrowDown className="ml-1 group-hover:rotate-180 transition" />
                            </span>

                            {/* Dropdown Menu */}
                            <ul className="absolute w-full flex px-50 justify-center top-13 left-0 hidden group-hover:flex flex-row z-50 bg-white text-sm shadow-xl rounded-lg py-6 px-8 gap-10 transition transition-all duration-800 ease-out">
                                
                                <Link to="/destination-packages">
                                    <button className="absolute right-30 px-10 py-2 bg-secondary rounded-full text-white text-sm py-2 hover:bg-secondary transition hover:bg-secondary/[0.8] hover:cursor-pointer">
                                            All Packages
                                        </button>                                
                                </Link>
  

                                {/* South Asia */}
                                <div className="w-1/5">
                                    <h4 className="text-gray-800 font-semibold mb-2">South Asia</h4>
                                    <div className="flex flex-col gap-3 text-base font-thin">
                                        <Link to="/destination-packages?country=india" className="hover:text-secondary">India</Link>
                                        <Link to="/destination-packages?country=sri-lanka" className="hover:text-secondary">Sri Lanka</Link>
                                        <Link to="/destination-packages?country=nepal" className="hover:text-secondary">Nepal</Link>
                                        <Link to="/destination-packages?country=bhutan" className="hover:text-secondary">Bhutan</Link>
                                    </div>
                                </div>

                                {/* Central Asia */}
                                <div className="w-1/5">
                                    <h4 className="text-gray-800 font-semibold mb-2">Central Asia</h4>
                                    <div className="flex flex-col gap-3 text-base font-thin">
                                        <Link to="/destination-packages?country=tibet" className="hover:text-secondary">Tibet</Link>
                                        <Link to="/destination-packages?country=uzbekistan" className="hover:text-secondary">Uzbekistan</Link>
                                    </div>
                                </div>

                                {/* Southeast Asia */}
                                <div className="w-1/5">
                                    <h4 className="text-gray-800 font-semibold mb-2">Southeast Asia</h4>
                                    <div className="flex flex-col gap-3 text-base font-thin">
                                        <Link to="/destination-packages?country=thailand" className="hover:text-secondary">Thailand</Link>
                                        <Link to="/destination-packages?country=vietnam" className="hover:text-secondary">Vietnam</Link>
                                        <Link to="/destination-packages?country=cambodia" className="hover:text-secondary">Cambodia</Link>
                                    </div>
                                </div>

                                {/* Europe */}
                                <div className="w-1/5">
                                    <h4 className="text-gray-800 font-semibold mb-2">Europe</h4>
                                    <div className="flex flex-col gap-3 text-base font-thin">
                                        <Link to="/destination-packages?country=france" className="hover:text-secondary">France</Link>
                                        <Link to="/destination-packages?country=italy" className="hover:text-secondary">Italy</Link>
                                        <Link to="/destination-packages?country=switzerland" className="hover:text-secondary">Switzerland</Link>
                                        <Link to="/destination-packages?country=spain" className="hover:text-secondary">Spain</Link>
                                    </div>
                                </div>

                                {/* North Africa */}
                                <div className="w-1/5">
                                    <h4 className="text-gray-800 font-semibold mb-2">North Africa</h4>
                                    <div className="flex flex-col gap-3 text-base font-thin">
                                        <Link to="/destination-packages?country=egypt" className="hover:text-secondary">Egypt</Link>
                                        <Link to="/destination-packages?country=morocco" className="hover:text-secondary">Morocco</Link>
                                        <Link to="/destination-packages?country=tunisia" className="hover:text-secondary">Tunisia</Link>
                                        <Link to="/destination-packages?country=algeria" className="hover:text-secondary">Algeria</Link>
                                        <Link to="/destination-packages?country=libya" className="hover:text-secondary">Libya</Link>
                                    </div>
                                </div>

                            </ul>
                        </li>

                        <li className={prop.page === "career" ? "text-secondary" : "text-primary hover:text-secondary"}>
                            <Link to="/career">Careers</Link>
                        </li>
                        <li className={prop.page === "contact" ? "text-secondary" : "text-primary hover:text-secondary"}>
                            <Link to="/contactus">Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* sign in button - desktop only */}
                <div className="hidden lg:flex lg:gap-5 lg:w-1/5 justify-end items-center">
                     {/* language switcher */}
                     <script src="https://static.elfsight.com/platform/platform.js" async></script>
                    <div className="pt-8 hidden lg:flex" class="elfsight-app-d393b67b-7b34-4578-b174-240f9c697e1f" ></div>

                    <Link to="/login">
                        <button className={(prop.page === "signin" || prop.page === "signup" ? "hidden" : "block w-20 bg-primary rounded-full text-white text-sm py-2 hover:bg-secondary transition")}>
                            Sign In
                        </button>
                    </Link>
                </div>

                {/* Hamburger menu icon - mobile only */}
                <div className="flex items-center gap-4 lg:hidden">
                    <div className="lg:flex lg:w-1/5 justify-end items-center">
                        <Link to="/login">
                            <button className={(prop.page === "signin" || prop.page === "signup" ? "hidden" : "block w-20 bg-primary rounded-full text-white text-sm py-2 hover:bg-secondary transition")}>
                                Sign In
                            </button>
                        </Link>
                    </div>
                    <button onClick={openMenu}>
                        {isMenuToggle ? <FiMenu className="w-7 h-7 text-primary hover:text-secondary hover:cursor-pointer" /> : (
                            <FiMenu className="w-7 h-7 text-primary hover:text-secondary hover:cursor-pointer" />
                        )}
                    </button>
                </div>

                {/* Mobile slide-in menu */}
                <div className={`lg:hidden bg-white/0.8 backdrop-blur-2xl fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuToggle ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end p-4">
                        <button onClick={openMenu}><RxCross2 className="w-6 h-6 text-primary hover:text-secondary hover:cursor-pointer" /></button>
                    </div>
                    <ul className="flex flex-col gap-2 px-2 py-2 text-lg">
                        <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer">    
                            {/* language switcher */}
                            <script src="https://static.elfsight.com/platform/platform.js" async></script>
                            <div className="pt-8" class="elfsight-app-d393b67b-7b34-4578-b174-240f9c697e1f" ></div>
                        </li>

                        <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"><Link to="/" onClick={openMenu}>Home</Link></li>
                        <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"><Link to="/aboutus" onClick={openMenu}>About</Link></li>
                        <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer">
                            {/* Destinations Dropdown */}
                            <li className="py-2 rounded-2xl hover:cursor-pointer hover:bg-neutral-100">
                                <div
                                    className="flex justify-between items-center"
                                    onClick={() => setShowDestinations(!showDestinations)}
                                >
                                    <span>Destinations</span>
                                    {showDestinations ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </div>
                                {showDestinations && (
                                    <ul className="mt-2 ml-2 flex flex-col gap-2 text-base text-gray-700">
                                        <li className="hover:bg-white px-4 py-2 rounded-xl">
                                            <Link to="/destination-packages?region=south-asia" onClick={openMenu}>South Asia</Link>
                                        </li>
                                        <li className="hover:bg-white px-4 py-2 rounded-xl">
                                            <Link to="/destination-packages?region=europe" onClick={openMenu}>Europe</Link>
                                        </li>
                                        <li className="hover:bg-white px-4 py-2 rounded-xl">
                                            <Link to="/destination-packages?region=northern" onClick={openMenu}>Northern</Link>
                                        </li>
                                        <li className="hover:bg-white px-4 py-2 rounded-xl">
                                            <Link to="/destination-packages?region=middle-east" onClick={openMenu}>Middle East</Link>
                                        </li>
                                    </ul>
                                )}
                            </li>

                        </li>


                        <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"><Link to="/career" onClick={openMenu}>Careers</Link></li>
                        <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"><Link to="/contactus" onClick={openMenu}>Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar1
