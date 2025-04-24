import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated 
    ? <Outlet />               // рендерит вложенные <Route>
    : <Navigate to="/login" />; // редирект на страницу входа
};

export default ProtectedRoute;
