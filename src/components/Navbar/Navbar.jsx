import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../utils/dataStore";
import { Link, useNavigate } from "react-router-dom";
import Session, { signOut } from "supertokens-auth-react/recipe/session";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import Logo from "../../assets/website/Vector.svg";
import DarkMode from "./DarkMode";

export const MenuLinks = [
  {
    id: 1,
    name: "About",
    link: "/about",
  },
  {
    id: 2,
    name: "Services",
    link: "/services",
  },
  {
    id: 3,
    name: "Contact Us",
    link: "/Contact",
  },
];

const loginMenuLinks = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    name: "Services",
    link: "/services",
  },
];
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser, refetchUser } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cookie = document.cookie;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
    setIsAuthenticated(false);
    setUser(null);
  };

  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  useEffect(() => {
    // Check if the session exists
    const checkSession = async () => {
      const sessionExists = await Session.doesSessionExist();
      refetchUser();
      setIsAuthenticated(sessionExists);
    };
    checkSession();
  }, [cookie]);

  return (
    <div
      className="relative z-10 w-full dark:bg-black dark:text-white duration-300
    "
    >
      <div className="container py-3 md:py-2">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="" className="w-5" />
            <span className="text-2xl sm:text-3xl font-semibold">
              Delhivery
            </span>
          </Link>
          {/* Desktop view Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center lg:gap-8 md:gap-[1rem]">
              {isAuthenticated ? (
                <>
                  {loginMenuLinks.map(({ id, name, link }) => (
                    <li key={id} className="py-4">
                      <Link
                        to={link}
                        className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                  <li
                    className="relative" // Make the container relative for dropdown positioning
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    <div className="flex items-center justify-start gap-3 cursor-pointer">
                      {/* Check if profile picture exists */}
                      {user?.userMetadata?.metadata?.picture ? (
                        <Link to="/notification">
                          <img
                            src={user?.userMetadata?.metadata?.picture}
                            alt="User Profile"
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        </Link>
                      ) : (
                        // Placeholder for name initials
                        <Link to="/notification">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {generateInitials(
                              user?.userMetadata?.metadata?.first_name,
                              user?.userMetadata?.metadata?.last_name
                            )}
                          </div>
                        </Link>
                      )}
                      <div>
                        <Link to="/profile">
                          <h1>
                            {user?.userMetadata?.metadata?.first_name}&nbsp;
                            {user?.userMetadata?.metadata?.last_name}
                          </h1>
                          <h1 className="text-sm text-slate-500">
                            Wallet &nbsp;{user?.wallet?.Balance}$
                          </h1>
                        </Link>
                      </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <ul
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        className="absolute top-14 left-0 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-10"
                      >
                        <li
                          className="hover:bg-gray-100 px-4 py-2 rounded-lg"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link to="/profile" className="block text-gray-700">
                            Profile
                          </Link>
                        </li>
                        <li
                          className="hover:bg-gray-100 px-4 py-2 rounded-lg"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to="/notification"
                            className="block text-gray-700"
                          >
                            Notification
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </>
              ) : (
                MenuLinks.map(({ id, name, link }) => (
                  <li key={id} className="py-4">
                    <Link
                      to={link}
                      className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                    >
                      {name}
                    </Link>
                  </li>
                ))
              )}
              <div>
                {isAuthenticated ? (
                  <button className="primary-btn" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/auth">
                    <button className="primary-btn">Login</button>
                  </Link>
                )}
              </div>
              <DarkMode />
            </ul>
          </nav>
          {/* Mobile view Drawer  */}
          <div className="flex items-center gap-4 md:hidden ">
            <DarkMode />
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu
        showMenu={showMenu}
        toggleMenu={toggleMenu}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;
