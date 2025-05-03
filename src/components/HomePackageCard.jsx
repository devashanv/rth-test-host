import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles/HomePackageCard.css'
import { IoIosHeart } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiViewTimeline } from "react-icons/ci";


function HomePackageCard(props) {
  return (
    <>
          <div className="hc-card-list rounded-4xl mt-2">
              <article className="hc-card bg-black">
                 {/* image */}
                  <figure className="hc-card-image">
                      <img src="card-images/card1.jpg" />
                  </figure>

                  {/* Title */}
                  <div className="hc-card-header px-5">
                      <p className="font-semibold text-lg">{props.title}</p>
                      <button className="w-9 h-9 border-2 border-gray-200 text-gray-300 rounded-full flex justify-center items-center hover:text-[#ff1212] hover:bg-white hover:border-secondary hover:cursor-pointer">
                          <IoIosHeart className="mx-1 my-1 text-xl font-medium"/>
                      </button>
                  </div>

                 {/*description */}
                  <div className="px-5 my-3 text-gray-600 mb-12">
                    <p className="text-xs lg:text-sm text-gray-400">{props.description}</p>

                    
                    <button className="border border-secondary text-secondary float-end hover:bg-red-700 mt-2 px-4 py-2 text-xs rounded-full font-semibold transition hover:text-white hover:cursor-pointer">
                      More Details
                    </button>
                  </div>

                 {/* footer */}
                  <div className="hc-card-footer flex gap-5 px-5 text-sm">
                        {/* views */}
                      <div className="hc-card-meta">
                            <IoEyeOutline className="text-lg"/> 
                            <span>{props.views}</span>
                      </div>

                      {/* season */}
                      <div className="hc-card-meta ">
                            <CiViewTimeline className="text-lg"/>
                            <p className="flex gap-2">
                            <span>{props.months}</span> 
                                {/* <span>December</span>
                                -
                                <span>April</span> */}
                            </p>
                      </div>

                      {/* days */}
                      <div className="hc-card-meta">
                            <CiCalendar className="text-lg"/>
                            <p>
                                {props.duration}
                            </p>
                      </div>
                  </div>
              </article>
          </div>
    </>
  )
}

export default HomePackageCard