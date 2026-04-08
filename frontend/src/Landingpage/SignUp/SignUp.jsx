import React, { useContext, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../login/Login.css"; // Reuse login styles

function SignUp() {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        backendUrl + "/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success("Account created! Redirecting to dashboard...");
      // Redirect to dashboard (separate app)
      window.location.href = "http://localhost:5174/";
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm z-10">
          <h2 className="createAccountText">Create Account</h2>
          <p className="text-center text-sm mb-6">Create your Zerodha account</p>
          <form onSubmit={onSubmitHandler} autoComplete="off">
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="input-field"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="input-field"
                type="email"
                autoComplete="new-email"
                placeholder="Email Id"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input-field"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                required
              />
            </div>
            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
              Sign Up
            </button>
          </form>
          <p className="loginHereText">
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/login")} 
              className="loginHereText cursor-pointer text-blue-400 hover:underline"
            >
              Login Here
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;

