import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900">
          Forgot Password?
        </h1>

        <p className="mt-3 text-neutral-600">
          Enter your registered email address and we'll send you an OTP to reset
          your password.
        </p>
      </div>

      <form className="space-y-6">

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
            placeholder="Enter your registered email"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          Send OTP
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

export default ForgotPasswordForm;