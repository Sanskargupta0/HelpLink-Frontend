import { useContext, useEffect } from 'react';
import UserContext from '../../utils/dataStore';
const Dashboard = () => {

  const { fetchUserData } = useContext(UserContext);
  
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard