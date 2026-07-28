import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MapPin,
  MessageSquare,
  UserCheck,
  XCircle,
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
import JobApplicationModal from "../../components/student/jobs/JobApplicationModal";
import EmptyJobs from "../../components/student/jobs/EmptyJobs";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getStudentJobRequest,
  getStudentJobsRequest,
} from "../../services/studentJobService";

import {
  applyForStudentJobRequest,
  getStudentApplicationsRequest,
} from "../../services/studentApplicationService";

import {
  getStudentJobInvitationsRequest,
  respondToStudentJobInvitationRequest,
} from "../../services/studentInvitationService";

const initialFilters = {
  type: "",
  mode: "",
  experience: "",
  eligibility: "",
};

const invitationStatusStyles = {
  sent:
    "border-amber-200 bg-amber-50 text-amber-700",

  accepted:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  declined:
    "border-rose-200 bg-rose-50 text-rose-700",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function formatDateTime(value) {
  if (!value) {
    return "Recently";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return String(value);
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
}

function getInvitationStatusLabel(
  status
) {
  if (status === "accepted") {
    return "Accepted";
  }

  if (status === "declined") {
    return "Declined";
  }

  return "Pending Response";
}

function Jobs() {
  const navigate =
    useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const [
    jobs,
    setJobs,
  ] = useState([]);

  const [
    invitations,
    setInvitations,
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
    appliedJobIds,
    setAppliedJobIds,
  ] = useState([]);

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
  ] = useState(
    initialFilters
  );

  const [
    selectedJob,
    setSelectedJob,
  ] = useState(null);

  const [
    applicationJob,
    setApplicationJob,
  ] = useState(null);

  const [
    activeInvitationId,
    setActiveInvitationId,
  ] = useState(null);

  const [
    isDetailsLoading,
    setIsDetailsLoading,
  ] = useState(false);

  const [
    isApplying,
    setIsApplying,
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
    applicationError,
    setApplicationError,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const jobsPerPage = 6;

  const handleAuthenticationError =
    useCallback(
      (error) => {
        if (
          error.status === 401
        ) {
          logout();

          navigate(
            "/login",
            {
              replace: true,
            }
          );

          return true;
        }

        return false;
      },
      [
        logout,
        navigate,
      ]
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
        const [
          jobsResponse,
          applicationsResponse,
          invitationsResponse,
        ] =
          await Promise.all([
            getStudentJobsRequest({
              token,
            }),

            getStudentApplicationsRequest({
              token,
            }),

            getStudentJobInvitationsRequest({
              token,
            }),
          ]);

        const loadedJobs =
          Array.isArray(
            jobsResponse.jobs
          )
            ? jobsResponse.jobs
            : [];

        const applications =
          Array.isArray(
            applicationsResponse
              .applications
          )
            ? applicationsResponse
                .applications
            : [];

        const loadedInvitations =
          Array.isArray(
            invitationsResponse
              .invitations
          )
            ? invitationsResponse
                .invitations
            : [];

        setJobs(
          loadedJobs
        );

        setInvitations(
          loadedInvitations
        );

        setAppliedJobIds(
          applications.map(
            (application) =>
              String(
                application.jobId
              )
          )
        );

        setStudent({
          department:
            jobsResponse.student
              ?.department || "",

          cgpa:
            jobsResponse.student
              ?.cgpa ?? null,

          graduationYear:
            jobsResponse.student
              ?.graduationYear ??
            null,

          skillCount:
            Number(
              jobsResponse.student
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
            "Unable to retrieve jobs and invitations."
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

      return jobs.filter(
        (job) => {
          const searchableValues = [
            job.jobTitle,
            job.department,
            job.jobDescription,
            job.company
              ?.companyName,
            ...(job.requiredSkills ||
              []),
            ...(job.preferredSkills ||
              []),
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
            job.eligibility
              ?.status ===
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
        }
      );
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
      startIndex +
        jobsPerPage
    );

  const eligibleJobs =
    jobs.filter(
      (job) =>
        job.eligibility
          ?.eligible
    ).length;

  const pendingInvitations =
    invitations.filter(
      (invitation) =>
        invitation.status ===
        "sent"
    ).length;

  const handleReset = () => {
    setSearch("");
    setLocationSearch("");
    setCompanySearch("");
    setFilters(
      initialFilters
    );
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
            jobId:
              job.jobId,
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

        setSelectedJob(null);

        setErrorMessage(
          error.message ||
            "Unable to retrieve job details."
        );
      } finally {
        setIsDetailsLoading(
          false
        );
      }
    };

  const handleViewInvitationJob =
    async (invitation) => {
      if (
        !invitation.jobAvailable
      ) {
        setErrorMessage(
          "This invited job is no longer accepting applications."
        );

        return;
      }

      await handleViewDetails({
        jobId:
          invitation.job.jobId,
      });
    };

  const handleInvitationResponse =
    async (
      invitation,
      status
    ) => {
      setActiveInvitationId(
        invitation.invitationId
      );

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await respondToStudentJobInvitationRequest({
            token,

            invitationId:
              invitation.invitationId,

            status,
          });

        setInvitations(
          (
            previousInvitations
          ) =>
            previousInvitations.map(
              (
                currentInvitation
              ) =>
                currentInvitation.invitationId ===
                invitation.invitationId
                  ? response.invitation
                  : currentInvitation
            )
        );

        setSuccessMessage(
          response.message
        );

        if (
          status ===
            "accepted" &&
          response.invitation
            ?.jobAvailable
        ) {
          await handleViewInvitationJob(
            response.invitation
          );
        }
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
            "Unable to respond to the invitation."
        );
      } finally {
        setActiveInvitationId(
          null
        );
      }
    };

  const handleOpenApplication = (
    job
  ) => {
    if (
      !job.eligibility
        ?.eligible
    ) {
      setErrorMessage(
        "You are not eligible to apply for this job."
      );

      return;
    }

    if (
      appliedJobIds.includes(
        String(
          job.jobId
        )
      )
    ) {
      setErrorMessage(
        "You have already applied for this job."
      );

      return;
    }

    setApplicationError("");
    setApplicationJob(job);
  };

  const handleSubmitApplication =
    async ({
      coverNote,
    }) => {
      if (!applicationJob) {
        return;
      }

      setIsApplying(true);
      setApplicationError("");
      setSuccessMessage("");

      try {
        const response =
          await applyForStudentJobRequest({
            token,

            jobId:
              applicationJob.jobId,

            coverNote,
          });

        setAppliedJobIds(
          (
            previousIds
          ) => [
            ...new Set([
              ...previousIds,

              String(
                applicationJob.jobId
              ),
            ]),
          ]
        );

        setSuccessMessage(
          response.message ||
            "Application submitted successfully."
        );

        setApplicationJob(
          null
        );

        setSelectedJob(null);

        window.scrollTo({
          top: 0,
          behavior:
            "smooth",
        });
      } catch (error) {
        if (
          handleAuthenticationError(
            error
          )
        ) {
          return;
        }

        setApplicationError(
          error.message ||
            "Unable to submit the application."
        );
      } finally {
        setIsApplying(false);
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
          Checking published jobs,
          invitations and your
          applications.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {successMessage && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700"
          >
            <CheckCircle2
              size={20}
            />

            <span>
              {successMessage}
            </span>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/student/applications"
                )
              }
              className="ml-auto rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white"
            >
              View Applications
            </button>
          </div>
        )}

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
              <p>
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() =>
                  setErrorMessage(
                    ""
                  )
                }
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <JobsHero
          totalJobs={
            jobs.length
          }
          eligibleJobs={
            eligibleJobs
          }
        />

        <RecruiterInvitations
          invitations={
            invitations
          }
          pendingCount={
            pendingInvitations
          }
          activeInvitationId={
            activeInvitationId
          }
          onRespond={
            handleInvitationResponse
          }
          onViewJob={
            handleViewInvitationJob
          }
        />

        <JobSearch
          search={search}
          setSearch={
            setSearch
          }
          location={
            locationSearch
          }
          setLocation={
            setLocationSearch
          }
          company={
            companySearch
          }
          setCompany={
            setCompanySearch
          }
        />

        <JobFilters
          filters={
            filters
          }
          setFilters={
            setFilters
          }
          onReset={
            handleReset
          }
        />

        <AIRecommendations
          jobs={jobs}
          student={
            student
          }
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
                {
                  filteredJobs.length
                }{" "}
                matching{" "}
                {filteredJobs.length ===
                1
                  ? "job"
                  : "jobs"}
                .
              </p>
            </div>

            <p className="text-sm font-semibold text-neutral-500">
              Page{" "}
              {currentPage} of{" "}
              {totalPages}
            </p>
          </div>

          {paginatedJobs.length >
          0 ? (
            <JobGrid
              jobs={
                paginatedJobs
              }
              appliedJobIds={
                appliedJobIds
              }
              onViewDetails={
                handleViewDetails
              }
              onApply={
                handleOpenApplication
              }
            />
          ) : (
            <EmptyJobs
              onReset={
                handleReset
              }
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
          job={
            selectedJob
          }
          isLoading={
            isDetailsLoading
          }
          isApplied={
            appliedJobIds.includes(
              String(
                selectedJob.jobId
              )
            )
          }
          onApply={
            handleOpenApplication
          }
          onClose={() =>
            setSelectedJob(
              null
            )
          }
        />
      )}

      {applicationJob && (
        <JobApplicationModal
          job={
            applicationJob
          }
          isSubmitting={
            isApplying
          }
          errorMessage={
            applicationError
          }
          onSubmit={
            handleSubmitApplication
          }
          onClose={() => {
            if (!isApplying) {
              setApplicationJob(
                null
              );

              setApplicationError(
                ""
              );
            }
          }}
        />
      )}
    </>
  );
}

function RecruiterInvitations({
  invitations,
  pendingCount,
  activeInvitationId,
  onRespond,
  onViewJob,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-neutral-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <UserCheck
                size={22}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Recruiter Invitations
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Opportunities
                directly shared by
                Recruiters.
              </p>
            </div>
          </div>
        </div>

        <span className="inline-flex w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
          {pendingCount} pending
        </span>
      </div>

      {invitations.length >
      0 ? (
        <div className="grid gap-5 p-5 lg:grid-cols-2 sm:p-8">
          {invitations.map(
            (invitation) => {
              const isWorking =
                activeInvitationId ===
                invitation.invitationId;

              return (
                <article
                  key={
                    invitation.invitationId
                  }
                  className="rounded-2xl border border-neutral-200 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <Building2
                          size={21}
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900">
                          {
                            invitation
                              .company
                              .companyName
                          }
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-blue-700">
                          {
                            invitation
                              .job
                              .jobTitle
                          }
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        invitationStatusStyles[
                          invitation.status
                        ]
                      }`}
                    >
                      {getInvitationStatusLabel(
                        invitation.status
                      )}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                    <p className="flex items-center gap-2">
                      <BriefcaseBusiness
                        size={16}
                      />

                      {
                        invitation
                          .job
                          .employmentType
                      }
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin
                        size={16}
                      />

                      {[
                        invitation
                          .job.city,
                        invitation
                          .job.country,
                      ]
                        .filter(Boolean)
                        .join(", ") ||
                        invitation
                          .job
                          .workMode}
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                      />

                      Deadline:{" "}
                      {
                        invitation
                          .job
                          .applicationDeadline
                      }
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock3
                        size={16}
                      />

                      {formatDateTime(
                        invitation.invitedAt
                      )}
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-neutral-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                      <MessageSquare
                        size={16}
                      />

                      Recruiter Message
                    </p>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {invitation.message ||
                        "The Recruiter believes this opportunity may match your profile."}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onViewJob(
                          invitation
                        )
                      }
                      disabled={
                        !invitation.jobAvailable ||
                        isWorking
                      }
                      className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 disabled:opacity-40"
                    >
                      View Job
                    </button>

                    {invitation.canRespond && (
                      <>
                        <button
                          type="button"
                          disabled={
                            isWorking
                          }
                          onClick={() =>
                            onRespond(
                              invitation,
                              "declined"
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 disabled:opacity-50"
                        >
                          <XCircle
                            size={17}
                          />

                          Decline
                        </button>

                        <button
                          type="button"
                          disabled={
                            isWorking
                          }
                          onClick={() =>
                            onRespond(
                              invitation,
                              "accepted"
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          {isWorking ? (
                            <LoaderCircle
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <CheckCircle2
                              size={17}
                            />
                          )}

                          Accept
                        </button>
                      </>
                    )}
                  </div>
                </article>
              );
            }
          )}
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <UserCheck
            size={40}
            className="mx-auto text-neutral-400"
          />

          <h3 className="mt-4 text-lg font-bold text-neutral-900">
            No Recruiter
            invitations
          </h3>

          <p className="mt-2 text-neutral-600">
            Invitations sent through
            Candidate Search will
            appear here.
          </p>
        </div>
      )}
    </section>
  );
}

export default Jobs;