import {
    Navigate,
    useLocation,
  } from "react-router-dom";
  
  import {
    ROLE_DASHBOARD_ROUTES,
    useAuth,
  } from "../../context/AuthContext";
  
  function ProtectedRoute({ allowedRole, children }) {
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return (
        <Navigate
          to="/login"
          replace
          state={{
            from: location.pathname,
          }}
        />
      );
    }
  
    const allowedRoles = Array.isArray(allowedRole)
      ? allowedRole
      : [allowedRole];
  
    const hasPermission = allowedRoles.includes(user.role);
  
    if (!hasPermission) {
      const correctDashboard =
        ROLE_DASHBOARD_ROUTES[user.role] || "/login";
  
      return (
        <Navigate
          to={correctDashboard}
          replace
        />
      );
    }
  
    return children;
  }
  
  export default ProtectedRoute;