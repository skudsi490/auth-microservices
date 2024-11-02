import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoleRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:4000/get-user-role', { withCredentials: true });
        const { role } = response.data;

        if (role === 'supervisor') {
          navigate('/approval-dashboard');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    getUserRole();
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default RoleRedirectPage;
