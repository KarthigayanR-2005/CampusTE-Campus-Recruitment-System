import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  
  const AuthContext = createContext(null);
  
  export const ROLE_DASHBOARD_ROUTES = {
    student: "/student/dashboard",
    recruiter: "/recruiter/dashboard",
    placementOfficer: "/placement-officer/dashboard",
    admin: "/admin/dashboard",
  };
  
  function readStoredUser() {
    const storedUser =
      sessionStorage.getItem("campusteUser") ||
      localStorage.getItem("campusteUser");
  
    if (!storedUser) {
      return null;
    }
  
    try {
      const parsedUser = JSON.parse(storedUser);
  
      if (!parsedUser.email || !parsedUser.role) {
        throw new Error("Invalid stored user data");
      }
  
      return parsedUser;
    } catch (error) {
      localStorage.removeItem("campusteUser");
      sessionStorage.removeItem("campusteUser");
  
      return null;
    }
  }
  
  function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser);
  
    const login = useCallback(
      ({ email, role, rememberMe = false }) => {
        const authenticatedUser = {
          email: email.trim(),
          role,
          rememberMe,
        };
  
        localStorage.removeItem("campusteUser");
        sessionStorage.removeItem("campusteUser");
  
        const selectedStorage = rememberMe
          ? localStorage
          : sessionStorage;
  
        selectedStorage.setItem(
          "campusteUser",
          JSON.stringify(authenticatedUser)
        );
  
        setUser(authenticatedUser);
  
        return authenticatedUser;
      },
      []
    );
  
    const logout = useCallback(() => {
      localStorage.removeItem("campusteUser");
      sessionStorage.removeItem("campusteUser");
  
      setUser(null);
    }, []);
  
    const getDashboardPath = useCallback(
      (role = user?.role) => {
        return ROLE_DASHBOARD_ROUTES[role] || "/login";
      },
      [user]
    );
  
    const contextValue = useMemo(
      () => ({
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
        getDashboardPath,
      }),
      [user, login, logout, getDashboardPath]
    );
  
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside an AuthProvider"
      );
    }
  
    return context;
  }
  
  export { AuthProvider, useAuth };