import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosClient";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Basic client-side validation
    if (!fullName || !email || !password || !passwordConfirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/customers/register", {
        full_name: fullName,
        email,
        password,
        password_confirmation: passwordConfirm,
      });

      const { token, customer } = response.data;

      if (token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("customer_id", customer.id);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate("/mydashboard");
      } else {
        setError("Registration failed: Token not received.");
      }
    } catch (err) {
      console.error("Registration error:", err);

      if (err.response) {
        const message = err.response.data?.message || "Registration failed.";
        setError(message);

        // Laravel validation errors
        if (err.response.data?.errors) {
          setFieldErrors(err.response.data.errors);
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-30 flex h-auto w-3/4 shadow-xl">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-10 bg-white">
        <img
          src="RTH-logo.png"
          alt="Logo"
          className="w-48 h-16 object-cover mb-6"
        />
        <p className="mb-6 text-gray-600">Create a new account</p>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleRegister} className="mx-30 w-full flex flex-col items-center">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mb-3 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={loading}
          />
          {fieldErrors.full_name && (
            <p className="text-sm text-red-500 mb-2">{fieldErrors.full_name[0]}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={loading}
          />
          {fieldErrors.email && (
            <p className="text-sm text-red-500 mb-2">{fieldErrors.email[0]}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 w-80 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={loading}
          />
          {fieldErrors.password && (
            <p className="text-sm text-red-500 mb-2">{fieldErrors.password[0]}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
            {loading ? "Registering..." : "REGISTER"}
          </button>
        </form>

        <div className="mt-6 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="ml-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-full hover:border-[#0D1537] hover:text-[#0D1537]"
          >
            LOG IN
          </button>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-cover bg-[url('../src/assets/footer-background.png')] items-center justify-center text-white text-center px-20">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Join us and explore new destinations
          </h2>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
