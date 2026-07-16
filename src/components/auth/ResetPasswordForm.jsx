import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">
          Reset Password
        </h1>

        <p className="mt-3 text-neutral-600">
          Create a new password for your CampusTE account.
        </p>
      </div>

      <form className="space-y-6">

        {/* New Password */}

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-neutral-700"
          >
            New Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-16 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-purple-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

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
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-16 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-purple-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          Reset Password
        </button>

      </form>

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="font-semibold text-blue-600 transition hover:text-purple-600"
        >
          ← Back to Login
        </Link>
      </div>

    </div>
  );
}

export default ResetPasswordForm;