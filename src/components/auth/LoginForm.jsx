import { Link } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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

      <form className="space-y-6">

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
            type="email"
            placeholder="Enter your email"
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-14 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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

        {/* Remember Me */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-neutral-600">

            <input
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-300"
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
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          Sign In
        </button>

      </form>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-neutral-200"></div>

        <span className="mx-4 text-sm text-neutral-500">
          OR
        </span>

        <div className="h-px flex-1 bg-neutral-200"></div>

      </div>

      {/* Google */}

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 py-3 font-medium transition duration-300 hover:bg-neutral-50"
      >
        <span>🌐</span>

        Continue with Google

      </button>

      {/* Register */}

      <p className="mt-8 text-center text-sm text-neutral-600">

        Don't have an account?

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