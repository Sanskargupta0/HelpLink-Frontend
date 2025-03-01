import { useContext, useEffect } from "react";
import UserContext from "../../utils/dataStore";
const Dashboard = () => {
  const { user, fetching, setFetching } = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      setFetching(!fetching);
    }
  }, [user]);
return <></>
};

export default Dashboard;
