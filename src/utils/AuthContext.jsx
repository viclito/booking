import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

// Create a context for authentication
const AuthContext = createContext();


const fetchData = async()=>{
  const response = await axios.get(`http://localhost:4000/users`)
  return response.data
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const {data : users }= useQuery('users' , fetchData)

  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const isProfileComplete = (user) => {
    // Check all fields except username and password
    return Object.keys(user).every((key) => {
      if (key === 'username' || key === 'password') return true;
      return user[key] && user[key].trim() !== '';
    });
  };

  const login = (username, password) => {
    const user = users?.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));

      if (isProfileComplete(user)) {
        navigate('/', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }

    } else {
      alert('Invalid username or password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('authenticated');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
