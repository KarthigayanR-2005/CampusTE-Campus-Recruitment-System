import {
    Navigate,
    useLocation,
  } from "react-router-dom";
  
  import {
    ROLE_DASHBOARD_ROUTES,
    useAuth,
  } from "../../context/AuthContext";
  
  function LoadingScreen() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-600" />
  
          <p className="mt-4 font-semibold text-neutral-700">
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }
  
  function ProtectedRoute({
    allowedRole,
    children,
  }) {
    const location = useLocation();
  
    const {
      user,
      isAuthenticated,
      isLoading,
    } = useAuth();
  
    if (isLoading) {
      return <LoadingScreen />;
    }
  
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
  
    const allowedRoles =
      Array.isArray(allowedRole)
        ? allowedRole
        : [allowedRole];
  
    if (
      !allowedRoles.includes(user.role)
    ) {
      const correctDashboard =
        ROLE_DASHBOARD_ROUTES[
          user.role
        ] || "/login";
  
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