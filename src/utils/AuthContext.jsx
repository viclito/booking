import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context for authentication
const AuthContext = createContext();

// Mock user data
const users = [
  { username: 'berglin', password: 'berglin' },
  { username: 'sudheer', password: 'sudheer' },
  { username: 'admin', password: 'admin' },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/', { replace: true });
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
