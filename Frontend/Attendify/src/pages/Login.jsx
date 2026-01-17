import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { setAuth } from "../utils/auth";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);
      setAuth(res.token, res.role);

      if (res.role === "ADMIN") navigate("/admin");
      else navigate("/student");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="card login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Attendify</h2>
        <p className="login-sub">Sign in to continue</p>

        {error && <div className="error">{error}</div>}

        <div className="login-field">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
