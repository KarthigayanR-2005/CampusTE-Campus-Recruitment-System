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
import PlacementOfficerLayout from "../layouts/PlacementOfficerLayout";
import AdminLayout from "../layouts/AdminLayout";

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

// Placement Officer Pages
import PlacementOfficerDashboard from "../pages/PlacementOfficer/Dashboard";
import PlacementOfficerStudents from "../pages/PlacementOfficer/Students";
import PlacementOfficerRecruiters from "../pages/PlacementOfficer/Recruiters";
import PlacementDrives from "../pages/PlacementOfficer/PlacementDrives";
import PlacementOfficerApplications from "../pages/PlacementOfficer/Applications";
import PlacementOfficerInterviews from "../pages/PlacementOfficer/Interviews";
import PlacementOfficerAnalytics from "../pages/PlacementOfficer/Analytics";
import PlacementOfficerNotifications from "../pages/PlacementOfficer/Notifications";
import PlacementOfficerSettings from "../pages/PlacementOfficer/Settings";

// Admin Pages
import AdminDashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Institutions from "../pages/Admin/Institutions";
import Recruiters from "../pages/Admin/Recruiters";
import PlacementOfficers from "../pages/Admin/PlacementOfficers";
import SystemAnalytics from "../pages/Admin/SystemAnalytics";
import AuditLogs from "../pages/Admin/AuditLogs";
import AdminNotifications from "../pages/Admin/Notifications";
import AdminSettings from "../pages/Admin/Settings";

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

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/verify-otp"
            element={<OTPVerification />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />
        </Route>

        {/* Student Portal */}
        <Route path="/student" element={<StudentLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="jobs" element={<Jobs />} />

          <Route
            path="applications"
            element={<Applications />}
          />

          <Route path="interviews" element={<Interviews />} />

          <Route
            path="notifications"
            element={<Notifications />}
          />

          <Route path="resume" element={<Resume />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Recruiter Portal */}
        <Route
          path="/recruiter"
          element={<RecruiterLayout />}
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<DashboardRecruiter />}
          />

          <Route
            path="company-profile"
            element={<CompanyProfile />}
          />

          <Route path="post-job" element={<PostJob />} />

          <Route
            path="manage-jobs"
            element={<ManageJobs />}
          />

          <Route path="applicants" element={<Applicants />} />

          <Route
            path="candidates"
            element={<CandidateSearch />}
          />

          <Route
            path="interviews"
            element={<RecruiterInterviews />}
          />

          <Route
            path="notifications"
            element={<RecruiterNotifications />}
          />

          <Route
            path="settings"
            element={<RecruiterSettings />}
          />
        </Route>

        {/* Placement Officer Portal */}
        <Route
          path="/placement-officer"
          element={<PlacementOfficerLayout />}
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<PlacementOfficerDashboard />}
          />

          <Route
            path="students"
            element={<PlacementOfficerStudents />}
          />

          <Route
            path="recruiters"
            element={<PlacementOfficerRecruiters />}
          />

          <Route
            path="placement-drives"
            element={<PlacementDrives />}
          />

          <Route
            path="applications"
            element={<PlacementOfficerApplications />}
          />

          <Route
            path="interviews"
            element={<PlacementOfficerInterviews />}
          />

          <Route
            path="analytics"
            element={<PlacementOfficerAnalytics />}
          />

          <Route
            path="notifications"
            element={<PlacementOfficerNotifications />}
          />

          <Route
            path="settings"
            element={<PlacementOfficerSettings />}
          />
        </Route>

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route path="users" element={<Users />} />

          <Route
            path="institutions"
            element={<Institutions />}
          />

          <Route
            path="recruiters"
            element={<Recruiters />}
          />

          <Route
            path="placement-officers"
            element={<PlacementOfficers />}
          />

          <Route
            path="analytics"
            element={<SystemAnalytics />}
          />

          <Route
            path="audit-logs"
            element={<AuditLogs />}
          />

          <Route
            path="notifications"
            element={<AdminNotifications />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />
        </Route>

        {/* Unknown Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;