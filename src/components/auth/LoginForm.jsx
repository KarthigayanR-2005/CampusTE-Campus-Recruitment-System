import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ROLE_DASHBOARD_ROUTES,
  useAuth,
} from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    login,
    isAuthenticated,
    isLoading,
    getDashboardPath,
  } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      rememberMe: false,
    });

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated &&
      user
    ) {
      navigate(
        getDashboardPath(user.role),
        {
          replace: true,
        }
      );
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    navigate,
    getDashboardPath,
  ]);

  const handleInputChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );

    setErrorMessage("");
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const password =
      formData.password;

    if (!email) {
      setErrorMessage(
        "Please enter your email address."
      );
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage(
        "Please enter a valid email address."
      );
      return;
    }

    if (!password) {
      setErrorMessage(
        "Please enter your password."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const authenticatedUser =
        await login({
          email,
          password,
          rememberMe:
            formData.rememberMe,
        });

      const dashboardPath =
        ROLE_DASHBOARD_ROUTES[
          authenticatedUser.role
        ];

      if (!dashboardPath) {
        throw new Error(
          "Your account has an unsupported role."
        );
      }

      const requestedPath =
        location.state?.from;

      const portalPrefix =
        dashboardPath.replace(
          "/dashboard",
          ""
        );

      const requestedPathMatchesRole =
        requestedPath &&
        (requestedPath ===
          portalPrefix ||
          requestedPath.startsWith(
            `${portalPrefix}/`
          ));

      navigate(
        requestedPathMatchesRole
          ? requestedPath
          : dashboardPath,
        {
          replace: true,
        }
      );
    } catch (error) {
      setErrorMessage(
        error.message ||
          "Unable to log in."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    setErrorMessage(
      "Google authentication has not been connected yet."
    );
  };

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-neutral-600">
          Sign in using your registered
          CampusTE account.
        </p>
      </div>

      {errorMessage && (
        <div
          className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={
              handleInputChange
            }
            placeholder="Enter your registered email"
            autoComplete="email"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={
                formData.password
              }
              onChange={
                handleInputChange
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-16 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
            />

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                setShowPassword(
                  (previousValue) =>
                    !previousValue
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={
                formData.rememberMe
              }
              onChange={
                handleInputChange
              }
              disabled={isSubmitting}
              className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
            />

            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-blue-600 hover:text-purple-600"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-neutral-200" />

        <span className="mx-4 text-sm text-neutral-500">
          OR
        </span>

        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 py-3 font-medium transition duration-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span aria-hidden="true">
          🌐
        </span>

        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-neutral-600">
        Don&apos;t have an account?

        <Link
          to="/register"
          className="ml-2 font-semibold text-blue-600 hover:text-purple-600"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;