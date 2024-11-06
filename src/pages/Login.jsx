import metroidLogo from "../assets/img/metroid-logo.png";
import metroidBackground from "../assets/img/metroid-background.jpg";
import liveMetroidBackground from "../assets/img/metroid-video.gif";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${liveMetroidBackground})`,
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-40 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src={metroidLogo} width="80" alt="" srcSet="" />
              <h1 className="mb-2 text-2xl">MetroIT</h1>
              <span className="text-gray-300">Ingresa tus credenciales</span>
            </div>
            <form action="#">
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  placeholder="samusaran@lefties.com"
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  placeholder="*********"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <Link
                  to="/home"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
