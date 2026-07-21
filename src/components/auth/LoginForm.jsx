import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const dashboardRoutes = {
  student: "/student/dashboard",
  recruiter: "/recruiter/dashboard",
  placementOfficer: "/placement-officer/dashboard",
  admin: "/admin/dashboard",
};

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    const selectedDashboard = dashboardRoutes[formData.role];

    if (!selectedDashboard) {
      setErrorMessage("Please select a valid account role.");
      return;
    }

    setIsSubmitting(true);

    const loginData = {
      email,
      role: formData.role,
      rememberMe: formData.rememberMe,
    };

    if (formData.rememberMe) {
      localStorage.setItem(
        "campusteUser",
        JSON.stringify(loginData)
      );
    } else {
      sessionStorage.setItem(
        "campusteUser",
        JSON.stringify(loginData)
      );
    }

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate(selectedDashboard);
    }, 500);
  };

  const handleGoogleLogin = () => {
    setErrorMessage(
      "Google authentication will be connected when the backend is added."
    );
  };

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-neutral-600">
          Sign in to continue to CampusTE.
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

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Role */}

        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Sign In As
          </label>

          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>

            <option value="placementOfficer">
              Placement Officer
            </option>

            <option value="admin">Administrator</option>
          </select>
        </div>

        {/* Email */}

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
            onChange={handleInputChange}
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Password */}

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
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-16 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previousValue) => !previousValue
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-purple-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Remember Me */}

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-neutral-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
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

        {/* Login Button */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-neutral-200" />

        <span className="mx-4 text-sm text-neutral-500">
          OR
        </span>

        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {/* Google */}

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 py-3 font-medium transition duration-300 hover:bg-neutral-50"
      >
        <span aria-hidden="true">🌐</span>
        Continue with Google
      </button>

      {/* Register */}

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