import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          Create Your Account
        </h1>

        <p className="mt-2 text-neutral-600">
          Join CampusTE and begin your placement journey.
        </p>
      </div>

      <form className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Register As
          </label>

          <select
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option>Student</option>
            <option>Recruiter</option>
            <option>Placement Officer</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-14 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-14 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm text-neutral-600">
          <input type="checkbox" className="mt-1" />

          I agree to the Terms & Conditions and Privacy Policy.
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          Create Account
        </button>

      </form>

      <p className="mt-8 text-center text-sm text-neutral-600">
        Already have an account?

        <Link
          to="/login"
          className="ml-2 font-semibold text-blue-600 hover:text-purple-600"
        >
          Sign In
        </Link>
      </p>

    </div>
  );
}

export default RegisterForm;