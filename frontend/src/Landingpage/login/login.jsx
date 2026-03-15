import React, { useContext, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContent);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          { name, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          setIsLoggedin(true);
          if (data.token) localStorage.setItem("token", data.token);
          window.location.href = "http://localhost:5174";
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password },
          { withCredentials: true }
        );

        if (data.success) {
          setIsLoggedin(true);
          if (data.token) localStorage.setItem("token", data.token);
          window.location.href = "http://localhost:5174";
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm z-10">
          <h2 className="createAccountText">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <p className="text-center text-sm mb-6">
            {state === "Sign Up" ? "Create your Account" : "Login to your account!"}
          </p>
          <form onSubmit={onSubmitHandler} autoComplete="off">
            {state === "Sign Up" && (
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
            )}

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

            <p
              onClick={() => navigate("/reset-password")}
              className="mb-4 text-indigo-500 cursor-pointer"
            >
              Forget Password
            </p>
            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
              {state}
            </button>
          </form>

          {state === "Sign Up" ? (
            <p className="loginHereText">
              Already have an account?{" "}
              <span onClick={() => setState("Login")} className="loginHereText">
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;