import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import StudentLayout from "../layouts/StudentLayout";
import RecruiterLayout from "../layouts/RecruiterLayout";

// Public Pages
import Home from "../pages/Public/Home";
import Features from "../pages/Public/Features";
import About from "../pages/Public/About";
import Contact from "../pages/Public/Contact";
import FAQ from "../pages/Public/FAQ";

// Authentication Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OTPVerification from "../pages/Auth/OTPVerification";
import ResetPassword from "../pages/Auth/ResetPassword";

// Student Pages
import Dashboard from "../pages/Student/Dashboard";
import Profile from "../pages/Student/Profile";
import Jobs from "../pages/Student/Jobs";
import Applications from "../pages/Student/Applications";
import Interviews from "../pages/Student/Interviews";
import Notifications from "../pages/Student/Notifications";
import Resume from "../pages/Student/Resume";
import Settings from "../pages/Student/Settings";

// Recruiter Pages
import DashboardRecruiter from "../pages/Recruiter/Dashboard";
import CompanyProfile from "../pages/Recruiter/CompanyProfile";
import PostJob from "../pages/Recruiter/PostJob";
import ManageJobs from "../pages/Recruiter/ManageJobs";
import Applicants from "../pages/Recruiter/Applicants";
import CandidateSearch from "../pages/Recruiter/CandidateSearch";
import RecruiterInterviews from "../pages/Recruiter/Interviews";
import RecruiterNotifications from "../pages/Recruiter/Notifications";
import RecruiterSettings from "../pages/Recruiter/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>

        {/* Authentication */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Student Portal */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="resume" element={<Resume />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Recruiter Portal */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<DashboardRecruiter />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="candidates" element={<CandidateSearch />} />
          <Route path="interviews" element={<RecruiterInterviews />} />
          <Route path="notifications" element={<RecruiterNotifications />} />
          <Route path="settings" element={<RecruiterSettings />} />
        </Route>

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;