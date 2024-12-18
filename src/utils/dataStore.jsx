import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Session from "supertokens-auth-react/recipe/session";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);

  // Fetch user data only if the session exists
  const fetchUserData = async () => {
    try {
      const sessionExists = await Session.doesSessionExist();
      if (sessionExists) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get-user-info`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data);
      } else {
        setUser(null); // Clear user data if no session exists
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetching]);

  return (
    <UserContext.Provider value={{ user, setUser, setFetching, fetching }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
