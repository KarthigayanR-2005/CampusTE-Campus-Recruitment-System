import { useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { registerRequest } from "../../services/authService";

const initialFormData = {
  fullName: "",
  email: "",
  role: "student",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

function RegisterForm() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [formData, setFormData] =
    useState(initialFormData);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleInputChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const fullName =
      formData.fullName.trim();

    const email = formData.email
      .trim()
      .toLowerCase();

    if (!fullName) {
      return "Please enter your full name.";
    }

    if (fullName.length < 2) {
      return "Full name must contain at least 2 characters.";
    }

    if (fullName.length > 100) {
      return "Full name cannot exceed 100 characters.";
    }

    if (!email) {
      return "Please enter your email address.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return "Please enter a valid email address.";
    }

    if (
      !["student", "recruiter"].includes(
        formData.role
      )
    ) {
      return "Please select a valid registration role.";
    }

    if (!formData.password) {
      return "Please enter a password.";
    }

    if (formData.password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    const passwordByteLength =
      new TextEncoder().encode(
        formData.password
      ).length;

    if (passwordByteLength > 72) {
      return "Password cannot exceed 72 bytes.";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return "Passwords do not match.";
    }

    if (!formData.acceptTerms) {
      return "You must accept the Terms and Privacy Policy.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response =
        await registerRequest({
          fullName:
            formData.fullName.trim(),
          email: formData.email
            .trim()
            .toLowerCase(),
          password: formData.password,
          role: formData.role,
        });

      setSuccessMessage(
        response.message ||
          "Account created successfully."
      );

      setFormData(initialFormData);

      window.setTimeout(() => {
        logout();

        navigate("/login", {
          replace: true,
        });
      }, 1800);
    } catch (error) {
      setErrorMessage(
        error.message ||
          "Unable to create the account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          Create Your Account
        </h1>

        <p className="mt-2 text-neutral-600">
          Join CampusTE and begin your
          placement journey.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
        >
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p>{successMessage}</p>

            <p className="mt-1 font-normal">
              Redirecting you to the login
              page...
            </p>
          </div>
        </div>
      )}

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Full Name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            autoComplete="name"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
          />
        </div>

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
            disabled={isSubmitting}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Register As
          </label>

          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
          >
            <option value="student">
              Student
            </option>

            <option value="recruiter">
              Recruiter
            </option>
          </select>

          <p className="mt-2 text-xs text-neutral-500">
            Recruiter accounts require
            approval before login.
          </p>
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
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previousValue) =>
                    !previousValue
                )
              }
              disabled={isSubmitting}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 transition hover:text-purple-600 disabled:opacity-50"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            Password must contain at least
            8 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            Confirm Password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={
                formData.confirmPassword
              }
              onChange={handleInputChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-14 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (previousValue) =>
                    !previousValue
                )
              }
              disabled={isSubmitting}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 transition hover:text-purple-600 disabled:opacity-50"
              aria-label={
                showConfirmPassword
                  ? "Hide confirmed password"
                  : "Show confirmed password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-neutral-600">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={
              formData.acceptTerms
            }
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="mt-1 h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
          />

          <span>
            I agree to the Terms &amp;
            Conditions and Privacy Policy.
          </span>
        </label>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            Boolean(successMessage)
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting && (
            <LoaderCircle
              size={19}
              className="animate-spin"
            />
          )}

          {isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-600">
        Already have an account?

        <button
          type="button"
          onClick={handleSignIn}
          className="ml-2 font-semibold text-blue-600 hover:text-purple-600"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;