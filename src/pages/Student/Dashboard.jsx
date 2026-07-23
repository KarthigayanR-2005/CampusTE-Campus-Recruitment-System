import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import DashboardHeader from "../../components/student/DashboardHeader";
import DashboardStats from "../../components/student/DashboardStats";
import ProfileCompletion from "../../components/student/ProfileCompletion";
import RecommendedJobs from "../../components/student/RecommendedJobs";
import UpcomingDrives from "../../components/student/UpcomingDrives";
import RecentApplications from "../../components/student/RecentApplications";
import NotificationFeed from "../../components/student/NotificationFeed";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getStudentDashboardRequest,
} from "../../services/studentService";

const emptyDashboard = {
  student: {
    fullName: "",
    email: "",
    degree: "",
    department: "",
  },

  completion: {
    percentage: 0,
    completedSections: 0,
    totalSections: 8,
    sections: [],
  },

  stats: {
    skillCount: 0,
    projectCount: 0,
    experienceCount: 0,
    certificationCount: 0,
    resumeUploaded: false,
  },

  recentActivity: [],
};

function Dashboard() {
  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const [
    dashboard,
    setDashboard,
  ] = useState(emptyDashboard);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const handleAuthenticationError =
    useCallback(
      (error) => {
        if (error.status === 401) {
          logout();

          navigate("/login", {
            replace: true,
          });

          return true;
        }

        return false;
      },
      [logout, navigate]
    );

  const loadDashboard = useCallback(
    async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getStudentDashboardRequest({
            token,
          });

        setDashboard({
          ...emptyDashboard,
          ...response.dashboard,

          student: {
            ...emptyDashboard.student,
            ...response.dashboard
              ?.student,
          },

          completion: {
            ...emptyDashboard.completion,
            ...response.dashboard
              ?.completion,
          },

          stats: {
            ...emptyDashboard.stats,
            ...response.dashboard?.stats,
          },

          recentActivity:
            Array.isArray(
              response.dashboard
                ?.recentActivity
            )
              ? response.dashboard
                  .recentActivity
              : [],
        });
      } catch (error) {
        if (
          handleAuthenticationError(error)
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to load your dashboard."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [
      token,
      handleAuthenticationError,
    ]
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={38}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading your dashboard
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving your latest profile
          information.
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center">
        <AlertCircle
          size={38}
          className="mx-auto text-rose-600"
        />

        <h2 className="mt-4 text-xl font-bold text-rose-800">
          Dashboard unavailable
        </h2>

        <p className="mt-2 text-rose-700">
          {errorMessage}
        </p>

        <button
          type="button"
          onClick={loadDashboard}
          className="mt-5 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        student={dashboard.student}
      />

      <DashboardStats
        stats={dashboard.stats}
        completion={
          dashboard.completion
        }
      />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <RecommendedJobs />

          <UpcomingDrives />

          <RecentApplications />
        </div>

        <div className="space-y-8">
          <ProfileCompletion
            completion={
              dashboard.completion
            }
          />

          <NotificationFeed
            activities={
              dashboard.recentActivity
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;