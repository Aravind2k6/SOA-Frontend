import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

import { loginUser } from "../Services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid login details");
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="login-brand">
          <Zap size={35} />
          <h1>GridPulse</h1>
        </div>

        <h2>Smart Energy Monitoring</h2>

        <p>
          Monitor electricity consumption, manage smart meters,
          analyze energy usage and receive threshold alerts.
        </p>

      </div>

      <div className="login-container">

        <form className="login-box" onSubmit={handleLogin}>

          <div className="login-title">
            <Zap size={30} />
            <h2>Welcome Back</h2>
            <p>Login to your GridPulse account</p>
          </div>

          <label>Email</label>

          <input
            type="email"
            placeholder="manager@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;