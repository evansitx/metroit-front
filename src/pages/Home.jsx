import reactLogo from "../assets/img/react.svg";
import viteLogo from "../assets/img/vite.svg";
import usePageTitle from "../hooks/usePageTitle";
const Home = () => {
  usePageTitle("Inicio");
  return (
    <>
      <div className="flex flex-col justify-center text-center mt-10">
        <div className="flex justify-center">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="animate-spin" alt="React logo" />
          </a>
        </div>
        <h1 className="font-bold text-5xl">
          Bienvenido a <b className="text-slate-600">MetroIT</b>
        </h1>
      </div>
    </>
  );
};
export default Home;
