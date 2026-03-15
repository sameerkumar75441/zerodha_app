
import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom"; // top pe import

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Navbar />

    
      <style>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #cfd9ff, #e7c6ff);
        }

        .signup-card {
          background: #0f172a;
          width: 380px;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          color: white;
        }

        .signup-card h2 {
          text-align: center;
          margin-bottom: 6px;
        }

        .signup-subtitle {
          text-align: center;
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 25px;
        }

        .signup-input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 15px;
          border-radius: 25px;
          border: none;
          outline: none;
          background: #1e293b;
          color: white;
          font-size: 14px;
        }

        .signup-input::placeholder {
          color: #94a3b8;
        }

        .signup-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(90deg, #6a5af9, #7c83ff);
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        .signup-btn:hover {
          opacity: 0.9;
        }

        .login-text {
          text-align: center;
          font-size: 13px;
          margin-top: 15px;
        }

        .login-text span {
          color: #7c83ff;
          cursor: pointer;
        }
      `}</style>

 
      <div className="signup-container">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p className="signup-subtitle">Create your account</p>

          <input
            type="text"
            className="signup-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="signup-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="signup-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signup-btn">Sign Up</button>

          <div className="login-text">
  Already have an account? <Link to="/login">Login</Link>
</div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SignUp;
