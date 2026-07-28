import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  LoaderCircle,
  Mail,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getCandidateJobOptionsRequest,
  getRecruiterCandidateRequest,
  getRecruiterCandidateResumeRequest,
  getRecruiterCandidatesRequest,
  inviteRecruiterCandidateRequest,
  removeSavedRecruiterCandidateRequest,
  saveRecruiterCandidateRequest,
} from "../../services/candidateService";

function getInitials(name) {
  return String(
    name || "Student"
  )
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase()
    )
    .join("");
}

function CandidateSearch() {
  const navigate =
    useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const [
    candidates,
    setCandidates,
  ] = useState([]);

  const [
    jobOptions,
    setJobOptions,
  ] = useState([]);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    departmentFilter,
    setDepartmentFilter,
  ] = useState("All");

  const [
    readinessFilter,
    setReadinessFilter,
  ] = useState("All");

  const [
    minimumCgpa,
    setMinimumCgpa,
  ] = useState("0");

  const [
    minimumScore,
    setMinimumScore,
  ] = useState("0");

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState(null);

  const [
    inviteCandidate,
    setInviteCandidate,
  ] = useState(null);

  const [
    invitationForm,
    setInvitationForm,
  ] = useState({
    jobId: "",
    message: "",
  });

  const [
    showFilters,
    setShowFilters,
  ] = useState(true);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isDetailsLoading,
    setIsDetailsLoading,
  ] = useState(false);

  const [
    activeActionId,
    setActiveActionId,
  ] = useState(null);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const candidatesPerPage = 6;

  const handleAuthenticationError =
    useCallback(
      (error) => {
        if (
          error.status !== 401
        ) {
          return false;
        }

        logout();

        navigate(
          "/login",
          {
            replace: true,
          }
        );

        return true;
      },
      [
        logout,
        navigate,
      ]
    );

  const loadData =
    useCallback(async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const [
          candidateResponse,
          jobResponse,
        ] = await Promise.all([
          getRecruiterCandidatesRequest({
            token,
          }),

          getCandidateJobOptionsRequest({
            token,
          }),
        ]);

        setCandidates(
          Array.isArray(
            candidateResponse.candidates
          )
            ? candidateResponse.candidates
            : []
        );

        setJobOptions(
          Array.isArray(
            jobResponse.jobs
          )
            ? jobResponse.jobs
            : []
        );
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
            "Unable to retrieve candidates."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      token,
      handleAuthenticationError,
    ]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const departmentOptions =
    useMemo(
      () => [
        ...new Set(
          candidates
            .map(
              (candidate) =>
                candidate.department
            )
            .filter(Boolean)
        ),
      ].sort(),
      [candidates]
    );

  const filteredCandidates =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return candidates
        .filter((candidate) => {
          const searchableText = [
            candidate.fullName,
            candidate.email,
            candidate.institution,
            candidate.degree,
            candidate.department,
            candidate.headline,
            candidate.location,
            ...(candidate.skills ||
              []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !search ||
            searchableText.includes(
              search
            );

          const matchesDepartment =
            departmentFilter ===
              "All" ||
            candidate.department ===
              departmentFilter;

          const matchesReadiness =
            readinessFilter ===
              "All" ||
            candidate.profileStatus ===
              readinessFilter;

          const matchesCgpa =
            Number(
              candidate.cgpa || 0
            ) >=
            Number(
              minimumCgpa || 0
            );

          const matchesScore =
            Number(
              candidate.profileScore ||
              0
            ) >=
            Number(
              minimumScore || 0
            );

          return (
            matchesSearch &&
            matchesDepartment &&
            matchesReadiness &&
            matchesCgpa &&
            matchesScore
          );
        })
        .sort(
          (first, second) =>
            second.profileScore -
            first.profileScore
        );
    }, [
      candidates,
      searchTerm,
      departmentFilter,
      readinessFilter,
      minimumCgpa,
      minimumScore,
    ]);

  const statistics = {
    total:
      candidates.length,

    strong:
      candidates.filter(
        (candidate) =>
          candidate.profileScore >=
          75
      ).length,

    saved:
      candidates.filter(
        (candidate) =>
          candidate.saved
      ).length,

    ready:
      candidates.filter(
        (candidate) =>
          candidate.resume
            ?.available
      ).length,
  };

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredCandidates.length /
          candidatesPerPage
      )
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    departmentFilter,
    readinessFilter,
    minimumCgpa,
    minimumScore,
  ]);

  useEffect(() => {
    setCurrentPage(
      (previousPage) =>
        Math.min(
          previousPage,
          totalPages
        )
    );
  }, [totalPages]);

  const startIndex =
    (currentPage - 1) *
    candidatesPerPage;

  const paginatedCandidates =
    filteredCandidates.slice(
      startIndex,
      startIndex +
        candidatesPerPage
    );

  const showSuccess = (
    message
  ) => {
    setSuccessMessage(
      message
    );

    window.setTimeout(
      () =>
        setSuccessMessage(
          ""
        ),
      3000
    );
  };

  const replaceCandidate = (
    studentUserId,
    changes
  ) => {
    setCandidates(
      (previousCandidates) =>
        previousCandidates.map(
          (candidate) =>
            candidate.studentUserId ===
            studentUserId
              ? {
                  ...candidate,
                  ...changes,
                }
              : candidate
        )
    );

    setSelectedCandidate(
      (previousCandidate) =>
        previousCandidate
          ?.studentUserId ===
        studentUserId
          ? {
              ...previousCandidate,
              ...changes,
            }
          : previousCandidate
    );
  };

  const handleToggleSaved =
    async (candidate) => {
      setActiveActionId(
        candidate.studentUserId
      );

      setErrorMessage("");

      try {
        const response =
          candidate.saved
            ? await removeSavedRecruiterCandidateRequest({
                token,

                studentUserId:
                  candidate.studentUserId,
              })
            : await saveRecruiterCandidateRequest({
                token,

                studentUserId:
                  candidate.studentUserId,
              });

        replaceCandidate(
          candidate.studentUserId,
          {
            saved:
              Boolean(
                response.saved
              ),
          }
        );

        showSuccess(
          response.message
        );
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
            "Unable to update the saved candidate."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const handleViewCandidate =
    async (candidate) => {
      setSelectedCandidate(
        candidate
      );

      setIsDetailsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterCandidateRequest({
            token,

            studentUserId:
              candidate.studentUserId,
          });

        setSelectedCandidate(
          response.candidate
        );
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
            "Unable to retrieve candidate details."
        );
      } finally {
        setIsDetailsLoading(false);
      }
    };

  const handleOpenResume =
    async (
      candidate,
      download
    ) => {
      setActiveActionId(
        candidate.studentUserId
      );

      setErrorMessage("");

      try {
        const blob =
          await getRecruiterCandidateResumeRequest({
            token,

            studentUserId:
              candidate.studentUserId,

            download,
          });

        const objectUrl =
          URL.createObjectURL(
            blob
          );

        if (download) {
          const anchor =
            document.createElement(
              "a"
            );

          anchor.href =
            objectUrl;

          anchor.download =
            candidate.resume
              ?.fileName ||
            "Candidate_Resume.pdf";

          document.body.appendChild(
            anchor
          );

          anchor.click();
          anchor.remove();
        } else {
          window.open(
            objectUrl,
            "_blank",
            "noopener,noreferrer"
          );
        }

        window.setTimeout(
          () =>
            URL.revokeObjectURL(
              objectUrl
            ),
          60000
        );
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
            "Unable to retrieve the candidate resume."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const openInvitation = (
    candidate
  ) => {
    setInviteCandidate(
      candidate
    );

    setInvitationForm({
      jobId:
        jobOptions[0]?.jobId ||
        "",

      message: "",
    });
  };

  const handleInvite =
    async (event) => {
      event.preventDefault();

      if (!inviteCandidate) {
        return;
      }

      setActiveActionId(
        inviteCandidate
          .studentUserId
      );

      setErrorMessage("");

      try {
        const response =
          await inviteRecruiterCandidateRequest({
            token,

            studentUserId:
              inviteCandidate
                .studentUserId,

            jobId:
              invitationForm.jobId,

            message:
              invitationForm.message,
          });

        setInviteCandidate(null);

        setInvitationForm({
          jobId: "",
          message: "",
        });

        showSuccess(
          response.message
        );
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
            "Unable to invite the candidate."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter(
      "All"
    );
    setReadinessFilter(
      "All"
    );
    setMinimumCgpa("0");
    setMinimumScore("0");
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={42}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading candidates
        </h2>

        <p className="mt-2 text-neutral-600">
          Searching Student profiles
          in MySQL.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {successMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700">
            <CheckCircle2
              size={20}
            />

            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 font-semibold text-rose-700">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">
              <p>{errorMessage}</p>

              <button
                type="button"
                onClick={() =>
                  setErrorMessage("")
                }
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Search
                      size={25}
                    />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                    Talent Discovery
                  </p>
                </div>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  Search Candidates
                </h1>

                <p className="mt-3 max-w-2xl text-blue-100">
                  Discover real
                  Student profiles
                  using academic,
                  skill and profile
                  readiness filters.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <HeroStatistic
                  label="Strong Profiles"
                  value={
                    statistics.strong
                  }
                />

                <HeroStatistic
                  label="Saved Candidates"
                  value={
                    statistics.saved
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatisticCard
            label="Total Students"
            value={
              statistics.total
            }
            icon={Users}
            style="bg-blue-100 text-blue-700"
          />

          <StatisticCard
            label="Strong Profiles"
            value={
              statistics.strong
            }
            icon={Sparkles}
            style="bg-purple-100 text-purple-700"
          />

          <StatisticCard
            label="Resume Ready"
            value={
              statistics.ready
            }
            icon={FileText}
            style="bg-emerald-100 text-emerald-700"
          />

          <StatisticCard
            label="Saved"
            value={
              statistics.saved
            }
            icon={Bookmark}
            style="bg-amber-100 text-amber-700"
          />
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Candidate Search
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search by name,
                college, department
                or technical skill.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  (value) =>
                    !value
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-blue-50"
            >
              <SlidersHorizontal
                size={18}
              />

              {showFilters
                ? "Hide Filters"
                : "Show Filters"}
            </button>
          </div>

          <div className="relative mt-6">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="text"
              value={
                searchTerm
              }
              onChange={(event) =>
                setSearchTerm(
                  event.target
                    .value
                )
              }
              placeholder="Search candidates, institutions or skills"
              className="w-full rounded-2xl border border-neutral-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {showFilters && (
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-3">
                <Filter
                  size={19}
                  className="text-blue-700"
                />

                <h3 className="font-bold text-neutral-900">
                  Advanced Filters
                </h3>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <FilterField
                  label="Department"
                >
                  <select
                    value={
                      departmentFilter
                    }
                    onChange={(event) =>
                      setDepartmentFilter(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3"
                  >
                    <option>
                      All
                    </option>

                    {departmentOptions.map(
                      (department) => (
                        <option
                          key={
                            department
                          }
                        >
                          {
                            department
                          }
                        </option>
                      )
                    )}
                  </select>
                </FilterField>

                <FilterField
                  label="Profile Readiness"
                >
                  <select
                    value={
                      readinessFilter
                    }
                    onChange={(event) =>
                      setReadinessFilter(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3"
                  >
                    <option>
                      All
                    </option>

                    <option>
                      Ready
                    </option>

                    <option>
                      Resume Missing
                    </option>
                  </select>
                </FilterField>

                <FilterField
                  label="Minimum CGPA"
                >
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={
                      minimumCgpa
                    }
                    onChange={(event) =>
                      setMinimumCgpa(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3"
                  />
                </FilterField>

                <FilterField
                  label="Minimum Profile Score"
                >
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      minimumScore
                    }
                    onChange={(event) =>
                      setMinimumScore(
                        event.target
                          .value
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3"
                  />
                </FilterField>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 font-semibold text-neutral-700"
                >
                  <X size={17} />
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 p-6 sm:px-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Candidate Results
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Candidates are
                ordered by profile
                completion score.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-4 py-2 font-semibold text-blue-700">
              {
                filteredCandidates.length
              }{" "}
              found
            </div>
          </div>

          {paginatedCandidates.length >
          0 ? (
            <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3 sm:p-8">
              {paginatedCandidates.map(
                (candidate) => (
                  <CandidateCard
                    key={
                      candidate.studentUserId
                    }
                    candidate={
                      candidate
                    }
                    isWorking={
                      activeActionId ===
                      candidate.studentUserId
                    }
                    onSave={
                      handleToggleSaved
                    }
                    onView={
                      handleViewCandidate
                    }
                    onInvite={
                      openInvitation
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <Search
                size={42}
                className="mx-auto text-neutral-400"
              />

              <h3 className="mt-5 text-xl font-bold text-neutral-900">
                No candidates found
              </h3>

              <button
                type="button"
                onClick={
                  resetFilters
                }
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Reset Filters
              </button>
            </div>
          )}

          {filteredCandidates.length >
            0 && (
            <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-5 sm:px-8">
              <p className="text-sm text-neutral-600">
                Showing{" "}
                {startIndex + 1}{" "}
                to{" "}
                {Math.min(
                  startIndex +
                    candidatesPerPage,
                  filteredCandidates.length
                )}{" "}
                of{" "}
                {
                  filteredCandidates.length
                }
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={
                    currentPage ===
                    1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          page - 1,
                          1
                        )
                    )
                  }
                  className="rounded-xl border p-2 disabled:opacity-40"
                >
                  <ChevronLeft
                    size={19}
                  />
                </button>

                <span className="rounded-xl bg-neutral-100 px-4 py-2 font-semibold">
                  Page{" "}
                  {currentPage}{" "}
                  of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          page + 1,
                          totalPages
                        )
                    )
                  }
                  className="rounded-xl border p-2 disabled:opacity-40"
                >
                  <ChevronRight
                    size={19}
                  />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {selectedCandidate && (
        <CandidateDetailsModal
          candidate={
            selectedCandidate
          }
          isLoading={
            isDetailsLoading
          }
          isWorking={
            activeActionId ===
            selectedCandidate
              .studentUserId
          }
          onClose={() =>
            setSelectedCandidate(
              null
            )
          }
          onSave={
            handleToggleSaved
          }
          onInvite={
            openInvitation
          }
          onResume={
            handleOpenResume
          }
        />
      )}

      {inviteCandidate && (
        <InvitationModal
          candidate={
            inviteCandidate
          }
          jobs={jobOptions}
          form={
            invitationForm
          }
          setForm={
            setInvitationForm
          }
          isWorking={
            activeActionId ===
            inviteCandidate
              .studentUserId
          }
          onSubmit={
            handleInvite
          }
          onClose={() =>
            setInviteCandidate(
              null
            )
          }
        />
      )}
    </>
  );
}

function CandidateCard({
  candidate,
  isWorking,
  onSave,
  onView,
  onInvite,
}) {
  return (
    <article className="rounded-3xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white">
            {getInitials(
              candidate.fullName
            )}
          </div>

          <div>
            <h3 className="font-bold text-neutral-900">
              {
                candidate.fullName
              }
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              {
                candidate.department ||
                candidate.degree
              }
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={
            isWorking
          }
          onClick={() =>
            onSave(
              candidate
            )
          }
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            candidate.saved
              ? "bg-amber-100 text-amber-700"
              : "bg-neutral-100 text-neutral-500"
          }`}
        >
          {isWorking ? (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ) : (
            <Bookmark
              size={18}
              className={
                candidate.saved
                  ? "fill-current"
                  : ""
              }
            />
          )}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Metric
          label="CGPA"
          value={
            candidate.cgpa ??
            "N/A"
          }
        />

        <Metric
          label="Profile Score"
          value={`${candidate.profileScore}/100`}
          highlighted
        />
      </div>

      <div className="mt-5 space-y-3 text-sm text-neutral-600">
        <p className="flex gap-2">
          <GraduationCap
            size={17}
          />

          {
            candidate.institution ||
            "Institution not provided"
          }
        </p>

        <p className="flex gap-2">
          <MapPin
            size={17}
          />

          {
            candidate.location ||
            "Location not provided"
          }
        </p>

        <p className="flex gap-2">
          <BriefcaseBusiness
            size={17}
          />

          {
            candidate.experienceCount
          }{" "}
          experience record(s)
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(candidate.skills ||
          [])
          .slice(0, 4)
          .map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
            >
              {skill}
            </span>
          ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-5">
        <button
          type="button"
          onClick={() =>
            onView(
              candidate
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 font-semibold"
        >
          <Eye size={17} />
          View
        </button>

        <button
          type="button"
          onClick={() =>
            onInvite(
              candidate
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2.5 font-semibold text-white"
        >
          <UserCheck
            size={17}
          />
          Invite
        </button>
      </div>
    </article>
  );
}

function CandidateDetailsModal({
  candidate,
  isLoading,
  isWorking,
  onClose,
  onSave,
  onInvite,
  onResume,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
              {getInitials(
                candidate.fullName
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {
                  candidate.fullName
                }
              </h2>

              <p className="mt-1 text-neutral-600">
                {
                  candidate.headline
                }
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-3 bg-blue-50 p-4 font-semibold text-blue-700">
            <LoaderCircle
              size={19}
              className="animate-spin"
            />

            Loading full profile
          </div>
        )}

        <div className="space-y-8 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InformationCard
              icon={Mail}
              label="Email"
              value={
                candidate.email
              }
            />

            <InformationCard
              icon={GraduationCap}
              label="Academic"
              value={`${
                candidate.cgpa ??
                "N/A"
              } CGPA · ${
                candidate.graduationYear ||
                "Year unavailable"
              }`}
            />

            <InformationCard
              icon={MapPin}
              label="Location"
              value={
                candidate.location
              }
            />

            <InformationCard
              icon={Sparkles}
              label="Profile Score"
              value={`${candidate.profileScore}/100`}
            />
          </div>

          <ProfileSection
            title="Skills"
          >
            <div className="flex flex-wrap gap-2">
              {(candidate.skills ||
                []).map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-4 py-2 font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </ProfileSection>

          <ProfileSection
            title="Experience"
          >
            <RecordList
              records={
                candidate.experiences
              }
              emptyText="No experience records."
              renderRecord={(
                experience
              ) => (
                <>
                  <p className="font-bold">
                    {
                      experience.role
                    }
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {
                      experience.company
                    }
                  </p>
                </>
              )}
            />
          </ProfileSection>

          <ProfileSection
            title="Projects"
          >
            <RecordList
              records={
                candidate.projects
              }
              emptyText="No projects added."
              renderRecord={(
                project
              ) => (
                <>
                  <p className="font-bold">
                    {
                      project.title
                    }
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {
                      project.description
                    }
                  </p>
                </>
              )}
            />
          </ProfileSection>

          <ProfileSection
            title="Certifications"
          >
            <RecordList
              records={
                candidate.certifications
              }
              emptyText="No certifications added."
              renderRecord={(
                certification
              ) => (
                <>
                  <p className="font-bold">
                    {
                      certification.name
                    }
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {
                      certification.issuer
                    }
                  </p>
                </>
              )}
            />
          </ProfileSection>
        </div>

        <div className="flex flex-wrap justify-end gap-3 border-t p-6 sm:px-8">
          {candidate.resume
            ?.available && (
            <>
              <button
                type="button"
                disabled={
                  isWorking
                }
                onClick={() =>
                  onResume(
                    candidate,
                    false
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold"
              >
                <Eye size={18} />
                View Resume
              </button>

              <button
                type="button"
                disabled={
                  isWorking
                }
                onClick={() =>
                  onResume(
                    candidate,
                    true
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold"
              >
                <Download
                  size={18}
                />
                Download
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() =>
              onSave(candidate)
            }
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-semibold"
          >
            <Bookmark
              size={18}
              className={
                candidate.saved
                  ? "fill-current"
                  : ""
              }
            />

            {candidate.saved
              ? "Remove Saved"
              : "Save Candidate"}
          </button>

          <button
            type="button"
            onClick={() =>
              onInvite(
                candidate
              )
            }
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            <UserCheck
              size={18}
            />

            Invite Candidate
          </button>
        </div>
      </div>
    </div>
  );
}

function InvitationModal({
  candidate,
  jobs,
  form,
  setForm,
  isWorking,
  onSubmit,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/60 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-xl rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              Invite Candidate
            </h2>

            <p className="mt-2 text-neutral-600">
              {
                candidate.fullName
              }
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
          >
            <X size={21} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <FilterField
            label="Published Job"
          >
            <select
              required
              value={form.jobId}
              onChange={(event) =>
                setForm(
                  (previous) => ({
                    ...previous,

                    jobId:
                      event.target
                        .value,
                  })
                )
              }
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="">
                Select a job
              </option>

              {jobs.map(
                (job) => (
                  <option
                    key={
                      job.jobId
                    }
                    value={
                      job.jobId
                    }
                  >
                    {
                      job.jobTitle
                    }
                  </option>
                )
              )}
            </select>
          </FilterField>

          <FilterField
            label="Invitation Message"
          >
            <textarea
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(event) =>
                setForm(
                  (previous) => ({
                    ...previous,

                    message:
                      event.target
                        .value,
                  })
                )
              }
              placeholder="Explain why this opportunity may suit the candidate."
              className="w-full resize-none rounded-xl border px-4 py-3"
            />
          </FilterField>
        </div>

        <div className="flex justify-end gap-3 border-t p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-5 py-3 font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isWorking ||
              jobs.length === 0
            }
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {isWorking ? (
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
            ) : (
              <UserCheck
                size={18}
              />
            )}

            Send Invitation
          </button>
        </div>
      </form>
    </div>
  );
}

function HeroStatistic({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
      <p className="text-sm text-blue-100">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function StatisticCard({
  icon: Icon,
  label,
  value,
  style,
}) {
  return (
    <article className="rounded-2xl border bg-white p-6 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${style}`}
      >
        <Icon size={22} />
      </div>

      <p className="mt-6 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-sm text-neutral-600">
        {label}
      </p>
    </article>
  );
}

function Metric({
  label,
  value,
  highlighted = false,
}) {
  return (
    <div
      className={`rounded-2xl p-3 ${
        highlighted
          ? "bg-purple-50"
          : "bg-neutral-50"
      }`}
    >
      <p className="text-xs font-semibold uppercase text-neutral-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold">
        {value}
      </p>
    </div>
  );
}

function FilterField({
  label,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      {children}
    </div>
  );
}

function InformationCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-neutral-50 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
        <Icon size={16} />
        {label}
      </p>

      <p className="mt-2 font-medium">
        {value ||
          "Not provided"}
      </p>
    </div>
  );
}

function ProfileSection({
  title,
  children,
}) {
  return (
    <section>
      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <div className="mt-3">
        {children}
      </div>
    </section>
  );
}

function RecordList({
  records = [],
  emptyText,
  renderRecord,
}) {
  if (
    !Array.isArray(records) ||
    records.length === 0
  ) {
    return (
      <p className="rounded-2xl bg-neutral-50 p-5 text-neutral-600">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {records.map(
        (record, index) => (
          <article
            key={
              record.experienceId ||
              record.projectId ||
              record.certificationId ||
              index
            }
            className="rounded-2xl border p-5"
          >
            {renderRecord(
              record
            )}
          </article>
        )
      )}
    </div>
  );
}

export default CandidateSearch;