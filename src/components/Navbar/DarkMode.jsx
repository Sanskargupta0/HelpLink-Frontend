import React, { useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const element = document.documentElement; 
  

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      element.classList.add("dark");
      element.classList.remove("light");
    } else {
      element.classList.add("light");
      element.classList.remove("dark");
    }
  }, [theme]); 

  return (
    <div>
      {theme === "dark" ? (
        <BiSolidSun
          onClick={() => setTheme("light")}
          className="text-2xl cursor-pointer"
          title="Switch to Light Mode"
        />
      ) : (
        <BiSolidMoon
          onClick={() => setTheme("dark")}
          className="text-2xl cursor-pointer"
          title="Switch to Dark Mode"
        />
      )}
    </div>
  );
};

export default DarkMode;
