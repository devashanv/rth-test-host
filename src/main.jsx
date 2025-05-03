import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AboutUs from './pages/AboutUs.jsx'
import Destination from './pages/Destination.jsx'
import Careers from './pages/Careers.jsx'
import ContactUs from './pages/ContactUs.jsx'
import DestinationPackages from './pages/DestinationPackages.jsx'
import Sustainability from './pages/Sustainability.jsx'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from "./pages/Auth/Login.jsx";
import UserDashboard from "./pages/Users/Userdashboard.jsx";
import Register from "./pages/Auth/Register.jsx";
import Tours from "./pages/Users/Tours.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import { Settings } from "lucide-react";
import Settings from "./pages/Users/Settings.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/destination",
    element: <Destination />,
  },
  {
    path: "/destination-packages",
    element: <DestinationPackages />,
  },
  {
    path: "/career",
    element: <Careers />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
  },
  {
    path: "/sustainability",
    element: <Sustainability />,
  },
  {
    path: "/mydashboard",
    element: <UserDashboard />,
  },
  {
    path: "/mytours",
    element: <Tours />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/addash",
    element: <AdminDashboard />,
  },
], {
  scrollRestoration: "manual", 
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
