import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { loginUser, requestAccount } from "../Services/authService";

function Login({ initialMode = "login" }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      if (mode === "request") {
        requestAccount({ name, email, password });
        setMessage("Request sent. A manager must approve your account before you can sign in.");
        setMode("login");
        setPassword("");
        return;
      }
      loginUser(email, password)
        .then((result) => navigate(result.user?.role === "manager" ? "/manager/accounts" : "/"))
        .catch((loginError) => setError(loginError.message || "Invalid login details"));
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand"><Zap size={35} /><h1>GridPulse</h1></div>
        <h2>Smart Energy Monitoring</h2>
        <p>Check daily electricity usage, monitor meters, and stay on top of energy activity.</p>
      </div>
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <div className="login-title">
            <Zap size={30} />
            <h2>{mode === "request" ? "Request an account" : "Welcome back"}</h2>
            <p>{mode === "request" ? "A manager will review your request." : "Sign in to view your energy portal."}</p>
          </div>
          {mode === "request" && <><label htmlFor="name">Full name</label><input id="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></>}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete={mode === "request" ? "new-password" : "current-password"} placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required />
          {message && <p className="form-message" role="status">{message}</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="login-button">{mode === "request" ? "Send account request" : "Login"}</button>
          {mode === "login" ? <p className="login-switch">Need access? <Link to="/request-access" onClick={() => { setMode("request"); setMessage(""); setError(""); }}>Request an account</Link></p> : <p className="login-switch"><button type="button" className="text-button" onClick={() => setMode("login")}>Back to login</button></p>}
          <p className="demo-note">Demo manager: manager@gridpulse.local / Manager123!</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
