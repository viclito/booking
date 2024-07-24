import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    const storedProfileStatus = localStorage.getItem('isProfileCompleted');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setIsProfileCompleted(storedProfileStatus === 'true');
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://103.104.48.5:8282/api/v1/user/auth/authenticate', {
        email,
        password,
      }, { withCredentials: true });

      const { accessToken, refreshKey, userInfo } = response.data;
      const { isProfileCompleted } = userInfo;
      const { email:getemail } = userInfo;

      localStorage.setItem('token', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', refreshKey);
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('isProfileCompleted', isProfileCompleted.toString());
      localStorage.setItem('email', getemail);

      setIsAuthenticated(true);
      setIsProfileCompleted(isProfileCompleted);

      // Redirect based on profile completion
      if (isProfileCompleted) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }

    } catch (err) {
      console.error('Login error:', err);
      // Optionally handle the error or display a message to the user
    }
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    setIsProfileCompleted(false);
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isProfileCompleted');
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, isProfileCompleted }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
