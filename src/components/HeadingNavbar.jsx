import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

const HeadingNavbar = () => {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link to="/" className="block text-xl">
            <h1 className="font-bold text-xl">
              <b className="text-slate-600">MetroIT</b>
            </h1>
            <img
              src="/img/ebenezer-logo-horizontal.svg"
              alt=""
              className="w-[200px]"
            />
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
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};
export default HeadingNavbar;
