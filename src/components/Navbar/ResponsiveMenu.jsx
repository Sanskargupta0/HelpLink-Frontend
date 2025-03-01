import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/dataStore";
import { MenuLinks } from "./Navbar";

const ResponsiveMenu = ({
  showMenu,
  toggleMenu,
  isAuthenticated,
  handleLogout,
  admin,
}) => {
  const { user } = useContext(UserContext);

  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        {isAuthenticated ? (
          <div className="flex items-center justify-start gap-3">
            {/* Check if profile picture exists */}
            {user?.picture ? (
              <Link to="/notification" onClick={toggleMenu}>
                <img
                  src={user?.picture}
                  alt="User Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Link>
            ) : (
              // Placeholder for name initials
              <Link to="/notification" onClick={toggleMenu}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {generateInitials(user?.first_name, user?.last_name)}
                </div>
              </Link>
            )}
            <div>
              <Link to="/profile" onClick={toggleMenu}>
                <h1>
                  {user?.first_name}&nbsp;
                  {user?.last_name}
                </h1>
                <h1 className="text-sm text-slate-500">
                  Wallet &nbsp;{user?.wallet?.Balance}$
                </h1>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
        <nav className={isAuthenticated ? "mt-12" : ""}>
          <ul className="space-y-4 text-xl">
            {isAuthenticated ? (
              <>
                {admin && (
                  <li>
                    <Link
                      to="/admin"
                      className="mb-5 inline-block"
                      onClick={toggleMenu}
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/dashboard"
                    className="mb-5 inline-block"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="mb-5 inline-block"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notification"
                    className="mb-5 inline-block"
                    onClick={toggleMenu}
                  >
                    Notification
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Wallet"
                    className="mb-5 inline-block"
                    onClick={toggleMenu}
                  >
                    Wallet
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
            {MenuLinks.map((data) => (
              <li key={data.name}>
                <Link
                  to={data.link}
                  className="mb-5 inline-block"
                  onClick={toggleMenu}
                >
                  {data.name}
                </Link>
              </li>
            ))}
            <li className="flex justify-center">
              {isAuthenticated ? (
                <button
                  className="primary-btn"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link to="/auth">
                  <button className="primary-btn" onClick={toggleMenu}>
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
