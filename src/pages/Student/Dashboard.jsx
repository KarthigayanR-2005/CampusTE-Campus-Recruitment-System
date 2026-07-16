import DashboardHeader from "../../components/student/DashboardHeader";
import DashboardStats from "../../components/student/DashboardStats";
import ProfileCompletion from "../../components/student/ProfileCompletion";
import RecommendedJobs from "../../components/student/RecommendedJobs";
import UpcomingDrives from "../../components/student/UpcomingDrives";
import RecentApplications from "../../components/student/RecentApplications";
import NotificationsFeed from "../../components/student/NotificationsFeed";

function Dashboard() {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <DashboardStats />

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="space-y-8 xl:col-span-2">

          <RecommendedJobs />

          <UpcomingDrives />

          <RecentApplications />

        </div>

        <div className="space-y-8">

          <ProfileCompletion />

          <NotificationsFeed />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;