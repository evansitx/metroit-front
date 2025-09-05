import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import metroidLogo from "../assets/img/metroid-logo.png";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const HeadingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Campañas",
      link: "/campaign",
    },
    {
      name: "TrendyOL",
      link: "/trendyol",
    },
  ];
  // const { user, logout } = useAuth();

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        {/* Logo mobile */}
        <NavbarContent className="sm:hidden pr-3" justify="center">
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
        </NavbarContent>

        {/* Logo desktop */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
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

          {/* Menú Desktop */}

          <NavbarContent className="sm:flex gap-4" justify="center">
            {menuItems.map((item, index) => (
              <NavbarItem key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  {item.name}
                </NavLink>
              </NavbarItem>
            ))}
          </NavbarContent>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="primary" href="#" variant="flat">
              Iniciar sesión
            </Button>
          </NavbarItem>
          <NavbarItem>
            {/* <button onClick={logout}>{user}</button> */}
          </NavbarItem>
        </NavbarContent>

        {/* Menú mobile */}

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                {item.name}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};
export default HeadingNavbar;
