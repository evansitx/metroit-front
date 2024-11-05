import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BackToTop from "../components/utils/BackToTop.jsx";

const PrivateLayout = () => {
  return (
    <>
      <div>
        <Header />
      </div>

      <main className="mt-5 flex flex-col items-center px-5 lg:p-0">
        <Outlet />
      </main>

      <div className="mt-5 flex flex-col items-center px-5 lg:p-0">
        <Footer />
      </div>
      <BackToTop />
    </>
  );
};

export default PrivateLayout;
