import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      window.alert("Completa el usuario y la contraseña.");
      return;
    }

    sessionStorage.setItem(
      "authUser",
      JSON.stringify({ username: trimmedUsername, isAuthenticated: true }),
    );

    navigate("/");
  };

  return (
    <div className="login-page">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="control">
          <h1>Regístrate</h1>
        </div>

        <div className="control block-cube block-input">
          <input
            name="username"
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>

        <div className="control block-cube block-input">
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
        </div>

        <button className="btn block-cube block-cube-hover" type="submit">
          <div className="bg-top">
            <div className="bg-inner"></div>
          </div>
          <div className="bg-right">
            <div className="bg-inner"></div>
          </div>
          <div className="bg">
            <div className="bg-inner"></div>
          </div>
          <div className="text">Crear usuario</div>
        </button>

        <div className="credits">
          <Link to="/">Volver al inicio</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
