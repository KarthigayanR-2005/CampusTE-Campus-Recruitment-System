import { Outlet } from "react-router-dom";
import AuthBanner from "../components/auth/AuthBanner";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Branding Panel */}
        <AuthBanner />

        {/* Right Form Section */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;