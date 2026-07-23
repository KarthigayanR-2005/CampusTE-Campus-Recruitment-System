import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import JobsHero from "../../components/student/jobs/JobsHero";
import JobSearch from "../../components/student/jobs/JobSearch";
import JobFilters from "../../components/student/jobs/JobFilters";
import AIRecommendations from "../../components/student/jobs/AIRecommendations";
import SavedJobs from "../../components/student/jobs/SavedJobs";
import JobGrid from "../../components/student/jobs/JobGrid";
import JobPagination from "../../components/student/jobs/JobPagination";
import JobDetailsModal from "../../components/student/jobs/JobDetailsModal";
import EmptyJobs from "../../components/student/jobs/EmptyJobs";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getStudentJobRequest,
  getStudentJobsRequest,
} from "../../services/studentJobService";

const initialFilters = {
  type: "",
  mode: "",
  experience: "",
  eligibility: "",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function Jobs() {
  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const [
    jobs,
    setJobs,
  ] = useState([]);

  const [
    student,
    setStudent,
  ] = useState({
    department: "",
    cgpa: null,
    graduationYear: null,
    skillCount: 0,
  });

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    locationSearch,
    setLocationSearch,
  ] = useState("");

  const [
    companySearch,
    setCompanySearch,
  ] = useState("");

  const [
    filters,
    setFilters,
  ] = useState(initialFilters);

  const [
    selectedJob,
    setSelectedJob,
  ] = useState(null);

  const [
    isDetailsLoading,
    setIsDetailsLoading,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const jobsPerPage = 6;

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

  const loadJobs =
    useCallback(async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getStudentJobsRequest({
            token,
          });

        setJobs(
          Array.isArray(response.jobs)
            ? response.jobs
            : []
        );

        setStudent({
          department:
            response.student
              ?.department || "",

          cgpa:
            response.student
              ?.cgpa ?? null,

          graduationYear:
            response.student
              ?.graduationYear ?? null,

          skillCount:
            Number(
              response.student
                ?.skillCount || 0
            ),
        });
      } catch (error) {
        if (
          handleAuthenticationError(
            error
          )
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to retrieve published jobs."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      token,
      handleAuthenticationError,
    ]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const filteredJobs =
    useMemo(() => {
      const cleanedSearch =
        normalizeText(search);

      const cleanedLocation =
        normalizeText(
          locationSearch
        );

      const cleanedCompany =
        normalizeText(
          companySearch
        );

      return jobs.filter((job) => {
        const searchableValues = [
          job.jobTitle,
          job.department,
          job.jobDescription,
          job.company?.companyName,
          ...(job.requiredSkills || []),
          ...(job.preferredSkills || []),
        ]
          .map(normalizeText)
          .join(" ");

        const locationValue =
          normalizeText(
            [
              job.city,
              job.country,
              job.workMode,
            ].join(" ")
          );

        const companyValue =
          normalizeText(
            job.company
              ?.companyName
          );

        const matchesSearch =
          !cleanedSearch ||
          searchableValues.includes(
            cleanedSearch
          );

        const matchesLocation =
          !cleanedLocation ||
          locationValue.includes(
            cleanedLocation
          );

        const matchesCompany =
          !cleanedCompany ||
          companyValue.includes(
            cleanedCompany
          );

        const matchesType =
          !filters.type ||
          job.employmentType ===
            filters.type;

        const matchesMode =
          !filters.mode ||
          job.workMode ===
            filters.mode;

        const matchesExperience =
          !filters.experience ||
          job.experience ===
            filters.experience;

        const matchesEligibility =
          !filters.eligibility ||
          job.eligibility?.status ===
            filters.eligibility;

        return (
          matchesSearch &&
          matchesLocation &&
          matchesCompany &&
          matchesType &&
          matchesMode &&
          matchesExperience &&
          matchesEligibility
        );
      });
    }, [
      jobs,
      search,
      locationSearch,
      companySearch,
      filters,
    ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredJobs.length /
          jobsPerPage
      )
    );

  useEffect(() => {
    setCurrentPage(
      (previousPage) =>
        Math.min(
          previousPage,
          totalPages
        )
    );
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    locationSearch,
    companySearch,
    filters,
  ]);

  const startIndex =
    (currentPage - 1) *
    jobsPerPage;

  const paginatedJobs =
    filteredJobs.slice(
      startIndex,
      startIndex + jobsPerPage
    );

  const eligibleJobs =
    jobs.filter(
      (job) =>
        job.eligibility?.eligible
    ).length;

  const handleReset = () => {
    setSearch("");
    setLocationSearch("");
    setCompanySearch("");
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const handleViewDetails =
    async (job) => {
      setSelectedJob(job);
      setIsDetailsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getStudentJobRequest({
            token,
            jobId: job.jobId,
          });

        setSelectedJob({
          ...response.job,
          eligibility:
            response.eligibility,
        });
      } catch (error) {
        if (
          handleAuthenticationError(
            error
          )
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to retrieve job details."
        );
      } finally {
        setIsDetailsLoading(false);
      }
    };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={40}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading opportunities
        </h2>

        <p className="mt-2 text-neutral-600">
          Checking published jobs and
          your eligibility.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 font-semibold text-rose-700"
          >
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">
              <p>{errorMessage}</p>

              <button
                type="button"
                onClick={loadJobs}
                className="mt-2 text-sm underline"
              >
                Retry loading jobs
              </button>
            </div>
          </div>
        )}

        <JobsHero
          totalJobs={jobs.length}
          eligibleJobs={eligibleJobs}
        />

        <JobSearch
          search={search}
          setSearch={setSearch}
          location={locationSearch}
          setLocation={
            setLocationSearch
          }
          company={companySearch}
          setCompany={
            setCompanySearch
          }
        />

        <JobFilters
          filters={filters}
          setFilters={setFilters}
          onReset={handleReset}
        />

        <AIRecommendations
          jobs={jobs}
          student={student}
        />

        <SavedJobs />

        <section
          id="student-job-results"
          className="space-y-5"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Published Opportunities
              </h2>

              <p className="mt-1 text-neutral-600">
                Showing{" "}
                {filteredJobs.length}{" "}
                matching{" "}
                {filteredJobs.length ===
                1
                  ? "job"
                  : "jobs"}
                .
              </p>
            </div>

            <p className="text-sm font-semibold text-neutral-500">
              Page {currentPage} of{" "}
              {totalPages}
            </p>
          </div>

          {paginatedJobs.length >
          0 ? (
            <JobGrid
              jobs={paginatedJobs}
              onViewDetails={
                handleViewDetails
              }
            />
          ) : (
            <EmptyJobs
              onReset={handleReset}
            />
          )}
        </section>

        {filteredJobs.length >
          jobsPerPage && (
          <JobPagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            onPageChange={
              setCurrentPage
            }
          />
        )}
      </div>

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          isLoading={
            isDetailsLoading
          }
          onClose={() =>
            setSelectedJob(null)
          }
        />
      )}
    </>
  );
}

export default Jobs;