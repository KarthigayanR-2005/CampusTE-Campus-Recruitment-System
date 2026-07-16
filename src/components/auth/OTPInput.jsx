import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function OTPInput() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-neutral-900">
          OTP Verification
        </h1>

        <p className="mt-3 text-neutral-600">
          Enter the 6-digit verification code sent to your email.
        </p>

      </div>

      <div className="flex justify-center gap-3">

        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => (inputs.current[index] = element)}
            value={digit}
            maxLength={1}
            onChange={(e) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            className="h-14 w-14 rounded-xl border border-neutral-300 text-center text-xl font-bold outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        ))}

      </div>

      <button
        className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
      >
        Verify OTP
      </button>

      <div className="mt-8 text-center">

        <p className="text-sm text-neutral-500">
          Didn't receive the code?
        </p>

        <button
          className="mt-2 font-semibold text-blue-600 hover:text-purple-600"
        >
          Resend OTP
        </button>

      </div>

      <div className="mt-6 text-center">

        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-purple-600"
        >
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default OTPInput;