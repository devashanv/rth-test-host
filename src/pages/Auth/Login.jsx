
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosClient";
import NavBar1 from "../../components/NavBar1";
import Footer from "../../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/customers/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      const { token, customer } = response.data;

      if (token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("customer_id", customer.id);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate("/mydashboard");
      } else {
        setError("Login failed: Token not received.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {

        const message = err.response.data?.message || "Invalid email or password.";
        setError(message);
      } else if (err.request) {

        setError("No response from server. Please check your internet connection.");
      } else {

        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* header */}
      <header>
        <NavBar1 />
      </header>

      <div className="mx-auto my-10 flex h-[80vh] w-3/4 shadow-xl">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-10 bg-white">
          <img
            src="RTH-logo.png"
            alt="Logo"
            className="w-48 h-16 object-cover mb-6"
          />
          <p className="mb-6 text-gray-600">Please login to your account</p>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <form onSubmit={handleLogin} className="mx-30 w-full flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-80 py-3 rounded-full font-semibold shadow-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0D1537] text-white hover:bg-[#ec2326]"
              }`}
            >
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </form>

          <a href="#" className="mt-3 text-sm text-gray-500 hover:text-gray-700">
            Forgot password?
          </a>

          <div className="mt-6 text-sm">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="ml-2 px-4 py-2 border border-pink-500 text-pink-600 rounded-full hover:border-[#0D1537] hover:text-[#0D1537]"
            >
              CREATE NEW
            </button>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 bg-cover bg-[url('../src/assets/footer-background.png')] items-center justify-center text-white text-center px-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              We are more than just a company
            </h2>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit...
            </p>
          </div>
        </div>
      </div>

      {/* footer section*/}
      <div className="bg-primary bg-center px-20 pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-4/5 mt-20" />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">© All rights reserved by All In One Holdings.</p>
        </div>
      </div>
    </>


  );
};

export default Login;
