import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  import {
    getCurrentUserRequest,
    loginRequest,
  } from "../services/authService";
  
  const AuthContext = createContext(null);
  
  const AUTH_STORAGE_KEY = "campusteAuth";
  
  export const ROLE_DASHBOARD_ROUTES = {
    student: "/student/dashboard",
    recruiter: "/recruiter/dashboard",
    placementOfficer:
      "/placement-officer/dashboard",
    admin: "/admin/dashboard",
  };
  
  function clearStoredAuthentication() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(
      AUTH_STORAGE_KEY
    );
  
    // Remove the older temporary login data.
    localStorage.removeItem("campusteUser");
    sessionStorage.removeItem("campusteUser");
  }
  
  function readStoredAuthentication() {
    const storedValue =
      sessionStorage.getItem(
        AUTH_STORAGE_KEY
      ) ||
      localStorage.getItem(
        AUTH_STORAGE_KEY
      );
  
    if (!storedValue) {
      return null;
    }
  
    try {
      const parsedValue =
        JSON.parse(storedValue);
  
      if (
        !parsedValue.token ||
        !parsedValue.user
      ) {
        throw new Error(
          "Invalid authentication data"
        );
      }
  
      return parsedValue;
    } catch {
      clearStoredAuthentication();
      return null;
    }
  }
  
  function storeAuthentication({
    token,
    user,
    rememberMe,
  }) {
    clearStoredAuthentication();
  
    const selectedStorage = rememberMe
      ? localStorage
      : sessionStorage;
  
    selectedStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        token,
        user,
        rememberMe,
      })
    );
  }
  
  function AuthProvider({ children }) {
    const storedAuthentication =
      useMemo(
        () => readStoredAuthentication(),
        []
      );
  
    const [user, setUser] = useState(
      storedAuthentication?.user || null
    );
  
    const [token, setToken] = useState(
      storedAuthentication?.token || null
    );
  
    const [rememberMe, setRememberMe] =
      useState(
        Boolean(
          storedAuthentication?.rememberMe
        )
      );
  
    const [isLoading, setIsLoading] =
      useState(
        Boolean(
          storedAuthentication?.token
        )
      );
  
    const logout = useCallback(() => {
      clearStoredAuthentication();
  
      setUser(null);
      setToken(null);
      setRememberMe(false);
      setIsLoading(false);
    }, []);
  
    useEffect(() => {
      let requestIsActive = true;
  
      async function restoreSession() {
        if (!token) {
          setIsLoading(false);
          return;
        }
  
        setIsLoading(true);
  
        try {
          const response =
            await getCurrentUserRequest(
              token
            );
  
          if (!requestIsActive) {
            return;
          }
  
          setUser(response.user);
  
          storeAuthentication({
            token,
            user: response.user,
            rememberMe,
          });
        } catch {
          if (requestIsActive) {
            logout();
          }
        } finally {
          if (requestIsActive) {
            setIsLoading(false);
          }
        }
      }
  
      restoreSession();
  
      return () => {
        requestIsActive = false;
      };
    }, [token, rememberMe, logout]);
  
    const login = useCallback(
      async ({
        email,
        password,
        rememberMe:
          shouldRememberUser = false,
      }) => {
        const response =
          await loginRequest({
            email,
            password,
          });
  
        const authenticationData = {
          token: response.token,
          user: response.user,
          rememberMe:
            shouldRememberUser,
        };
  
        storeAuthentication(
          authenticationData
        );
  
        setToken(response.token);
        setUser(response.user);
        setRememberMe(
          shouldRememberUser
        );
  
        return response.user;
      },
      []
    );
  
    const getDashboardPath =
      useCallback(
        (role = user?.role) => {
          return (
            ROLE_DASHBOARD_ROUTES[
              role
            ] || "/login"
          );
        },
        [user]
      );
  
    const contextValue = useMemo(
      () => ({
        user,
        token,
        rememberMe,
        isLoading,
        isAuthenticated: Boolean(
          user && token
        ),
        login,
        logout,
        getDashboardPath,
      }),
      [
        user,
        token,
        rememberMe,
        isLoading,
        login,
        logout,
        getDashboardPath,
      ]
    );
  
    return (
      <AuthContext.Provider
        value={contextValue}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  function useAuth() {
    const context =
      useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider."
      );
    }
  
    return context;
  }
  
  export {
    AuthProvider,
    useAuth,
  };