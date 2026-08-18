import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/images/cendekia-medika-logo.png";
import { loginUser } from "../../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      return;
    }

    loginUser(username);

    navigate("/dashboard");
  };

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            <img
              src={logo}
              alt="Cendekia Medika"
            />
          </div>

          <h1>Cendekia Medika</h1>

          <p>
            Nursing Information System
          </p>

          <span>
            Integrated nursing documentation and patient care management.
          </span>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-card">
          <div className="login-header">
            <p className="login-eyebrow">WELCOME BACK</p>

            <h2>Sign in</h2>

            <p>
              Sign in to access the Nursing Information System.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <div className="input-wrapper">
                <UserRound size={19} />

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">
                <LockKeyhole size={19} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Sign in
            </button>
          </form>

          <p className="login-footer">
            Cendekia Medika Nursing Information System
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;