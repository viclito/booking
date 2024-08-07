import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default LoginRoute;
