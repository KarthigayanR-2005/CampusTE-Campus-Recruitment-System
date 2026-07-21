import { Navigate, useLocation } from "react-router-dom";

const roleDashboardRoutes = {
  student: "/student/dashboard",
  recruiter: "/recruiter/dashboard",
  placementOfficer: "/placement-officer/dashboard",
  admin: "/admin/dashboard",
};

function getLoggedInUser() {
  const savedUser =
    sessionStorage.getItem("campusteUser") ||
    localStorage.getItem("campusteUser");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    sessionStorage.removeItem("campusteUser");
    localStorage.removeItem("campusteUser");

    return null;
  }
}

function ProtectedRoute({ allowedRole, children }) {
  const location = useLocation();
  const loggedInUser = getLoggedInUser();

  if (!loggedInUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (loggedInUser.role !== allowedRole) {
    const correctDashboard =
      roleDashboardRoutes[loggedInUser.role];

    return (
      <Navigate
        to={correctDashboard || "/login"}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;