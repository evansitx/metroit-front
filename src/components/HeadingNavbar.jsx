import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import metroidLogo from "../assets/img/metroid-logo.png";
import { useAuth } from "../context/AuthContext";

const HeadingNavbar = () => {
  // const { user, logout } = useAuth();
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <div>
              <img src={metroidLogo} alt="" className="w-[30px]" />
            </div>
            <div>
              <h1 className="font-bold text-xl">
                <b className="text-slate-600">MetroIT</b>
              </h1>
            </div>
          </Link>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/campaign" color="foreground" href="#">
              Campaign
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
            {/* <button onClick={logout}>{user}</button> */}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};
export default HeadingNavbar;
