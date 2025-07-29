import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import metroidLogo from "../assets/img/metroid-logo.png";
import liveMetroidBackground from "../assets/img/metroid-video.gif";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(credenciales);

    if (res.ok) {
      navigate("/home");
    } else {
      setError(res.mensaje || "Credenciales incorrectas");
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-position-[65px]"
      style={{
        backgroundImage: `url(${liveMetroidBackground})`
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-40 px-16 py-10 shadow-lg backdrop-blur max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src={metroidLogo} width="80" alt="Logo MetroIT" />
            <h1 className="mb-2 text-2xl">MetroIT</h1>
            <span className="text-gray-300">Ingresa tus credenciales</span>
          </div>

          {error && (
            <div className="mb-4 text-center text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-lg">
              <input
                className="w-full rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="email"
                name="email"
                value={credenciales.email}
                onChange={handleChange}
                placeholder="samus_aran@lefties.com"
                required
              />
            </div>

            <div className="mb-4 text-lg">
              <input
                className="w-full rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                name="password"
                value={credenciales.password}
                onChange={handleChange}
                placeholder="*********"
                required
              />
            </div>

            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
