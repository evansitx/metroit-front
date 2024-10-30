import { Outlet } from "react-router-dom";
import Header from "../components/header.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
  return (
    <>
      <div>
        <Header />
      </div>

      <main>
        <Outlet />
      </main>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
