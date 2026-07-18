import WelcomeBanner from "../../components/recruiter/dashboard/WelcomeBanner";
import DashboardStats from "../../components/recruiter/dashboard/DashboardStats";
import HiringAnalytics from "../../components/recruiter/dashboard/HiringAnalytics";
import ActiveJobs from "../../components/recruiter/dashboard/ActiveJobs";
import RecentApplicants from "../../components/recruiter/dashboard/RecentApplicants";
import UpcomingInterviews from "../../components/recruiter/dashboard/UpcomingInterviews";
import QuickActions from "../../components/recruiter/dashboard/QuickActions";
import RecentNotifications from "../../components/recruiter/dashboard/RecentNotifications";

function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />

      <DashboardStats />

      <div className="grid gap-8 xl:grid-cols-[1.35fr_1fr]">
        <HiringAnalytics />
        <ActiveJobs />
      </div>

      <RecentApplicants />

      <div className="grid gap-8 xl:grid-cols-2">
        <UpcomingInterviews />
        <RecentNotifications />
      </div>

      <QuickActions />
    </div>
  );
}

export default Dashboard;