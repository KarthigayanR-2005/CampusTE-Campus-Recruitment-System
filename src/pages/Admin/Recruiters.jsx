import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  UserSquare2,
  UserX,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import {
  getPendingApprovalsRequest,
  reviewApprovalRequest,
} from "../../services/adminService";

const recruitersPerPage = 5;

function getInitials(fullName) {
  if (!fullName) {
    return "RC";
  }

  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) =>
      word.charAt(0).toUpperCase()
    )
    .join("");
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Not available";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function Recruiters() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const successTimerReference =
    useRef(null);

  const [recruiters, setRecruiters] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedRecruiter,
    setSelectedRecruiter,
  ] = useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [
    reviewingUserId,
    setReviewingUserId,
  ] = useState(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    successMessage,
    setSuccessMessage,
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

  const loadPendingRecruiters =
    useCallback(
      async ({
        showMainLoader = true,
      } = {}) => {
        if (!token) {
          return;
        }

        if (showMainLoader) {
          setIsLoading(true);
        } else {
          setIsRefreshing(true);
        }

        setErrorMessage("");

        try {
          const response =
            await getPendingApprovalsRequest({
              token,
              role: "recruiter",
            });

          setRecruiters(
            Array.isArray(response.users)
              ? response.users
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

          if (error.status === 403) {
            setErrorMessage(
              "Only administrators can view recruiter approval requests."
            );
          } else {
            setErrorMessage(
              error.message ||
                "Unable to retrieve pending recruiters."
            );
          }
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      },
      [
        token,
        handleAuthenticationError,
      ]
    );

  useEffect(() => {
    loadPendingRecruiters();
  }, [loadPendingRecruiters]);

  useEffect(() => {
    return () => {
      if (
        successTimerReference.current
      ) {
        window.clearTimeout(
          successTimerReference.current
        );
      }
    };
  }, []);

  const showSuccessMessage =
    useCallback((message) => {
      if (
        successTimerReference.current
      ) {
        window.clearTimeout(
          successTimerReference.current
        );
      }

      setSuccessMessage(message);

      successTimerReference.current =
        window.setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
    }, []);

  const filteredRecruiters =
    useMemo(() => {
      const query = searchTerm
        .trim()
        .toLowerCase();

      if (!query) {
        return recruiters;
      }

      return recruiters.filter(
        (recruiter) => {
          const userId =
            String(
              recruiter.userId || ""
            );

          return (
            recruiter.fullName
              ?.toLowerCase()
              .includes(query) ||
            recruiter.email
              ?.toLowerCase()
              .includes(query) ||
            userId.includes(query)
          );
        }
      );
    }, [recruiters, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredRecruiters.length /
        recruitersPerPage
    )
  );

  useEffect(() => {
    setCurrentPage((previousPage) =>
      Math.min(
        previousPage,
        totalPages
      )
    );
  }, [totalPages]);

  const startIndex =
    (currentPage - 1) *
    recruitersPerPage;

  const paginatedRecruiters =
    filteredRecruiters.slice(
      startIndex,
      startIndex +
        recruitersPerPage
    );

  const verifiedEmailCount =
    recruiters.filter(
      (recruiter) =>
        recruiter.emailVerified
    ).length;

  const waitingOverOneDay =
    recruiters.filter((recruiter) => {
      const createdAt = new Date(
        recruiter.createdAt
      );

      if (
        Number.isNaN(
          createdAt.getTime()
        )
      ) {
        return false;
      }

      const waitingTime =
        Date.now() -
        createdAt.getTime();

      return (
        waitingTime >=
        24 * 60 * 60 * 1000
      );
    }).length;

  const handleSearchChange = (
    event
  ) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleReview = async (
    recruiter,
    decision
  ) => {
    const actionText =
      decision === "approve"
        ? "approve"
        : "reject";

    const confirmed =
      window.confirm(
        `Are you sure you want to ${actionText} ${recruiter.fullName}?`
      );

    if (!confirmed) {
      return;
    }

    setReviewingUserId(
      recruiter.userId
    );

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response =
        await reviewApprovalRequest({
          token,
          userId:
            recruiter.userId,
          decision,
        });

      setSelectedRecruiter(null);

      showSuccessMessage(
        response.message ||
          `Recruiter ${actionText}d successfully.`
      );

      await loadPendingRecruiters({
        showMainLoader: false,
      });
    } catch (error) {
      if (
        handleAuthenticationError(error)
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          `Unable to ${actionText} the recruiter.`
      );

      if (
        error.status === 409 ||
        error.status === 404
      ) {
        await loadPendingRecruiters({
          showMainLoader: false,
        });
      }
    } finally {
      setReviewingUserId(null);
    }
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <ShieldCheck size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Recruiter Approval
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Pending Recruiters
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Review recruiter
                registration requests and
                approve or reject access to
                the CampusTE recruitment
                portal.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                loadPendingRecruiters({
                  showMainLoader: false,
                })
              }
              disabled={
                isLoading ||
                isRefreshing
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={19}
                className={
                  isRefreshing
                    ? "animate-spin"
                    : ""
                }
              />

              {isRefreshing
                ? "Refreshing..."
                : "Refresh Requests"}
            </button>
          </div>
        </div>

        {successMessage && (
          <div
            role="status"
            className="flex items-center gap-3 border-t border-neutral-200 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-800 sm:px-8"
          >
            <CheckCircle2 size={19} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 border-t border-rose-200 bg-rose-50 px-6 py-4 text-sm font-semibold text-rose-700 sm:px-8"
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">
              <p>{errorMessage}</p>

              <button
                type="button"
                onClick={() =>
                  loadPendingRecruiters()
                }
                className="mt-2 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Users size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {recruiters.length}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Pending Requests
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <Search size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {filteredRecruiters.length}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Search Results
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Mail size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {verifiedEmailCount}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Email Verified
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Clock3 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {waitingOverOneDay}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Waiting Over 24 Hours
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Approval Requests
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Data shown here is loaded
                directly from MySQL through
                the Admin approval API.
              </p>
            </div>

            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={
                  handleSearchChange
                }
                placeholder="Search by name, email or user ID..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-16 text-center">
            <RefreshCw
              size={34}
              className="animate-spin text-blue-700"
            />

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              Loading recruiter requests
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Retrieving pending accounts
              from the CampusTE server.
            </p>
          </div>
        ) : filteredRecruiters.length ===
          0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              {searchTerm
                ? "No matching recruiters"
                : "No pending approvals"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">
              {searchTerm
                ? "Try another name, email address or user ID."
                : "All recruiter registration requests have been reviewed."}
            </p>

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Recruiter
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Account
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Registered
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Verification
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedRecruiters.map(
                    (recruiter) => {
                      const isReviewing =
                        reviewingUserId ===
                        recruiter.userId;

                      return (
                        <tr
                          key={
                            recruiter.userId
                          }
                          className="border-b border-neutral-100 transition hover:bg-neutral-50"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                                {getInitials(
                                  recruiter.fullName
                                )}
                              </div>

                              <div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedRecruiter(
                                      recruiter
                                    )
                                  }
                                  className="text-left font-bold text-neutral-900 hover:text-blue-700"
                                >
                                  {
                                    recruiter.fullName
                                  }
                                </button>

                                <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
                                  <Mail
                                    size={
                                      14
                                    }
                                  />

                                  {
                                    recruiter.email
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="font-semibold text-neutral-900">
                              User #
                              {
                                recruiter.userId
                              }
                            </p>

                            <span className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                              Pending
                            </span>
                          </td>

                          <td className="px-6 py-5 text-sm font-medium text-neutral-700">
                            {formatDate(
                              recruiter.createdAt
                            )}
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                recruiter.emailVerified
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-neutral-100 text-neutral-600"
                              }`}
                            >
                              {recruiter.emailVerified
                                ? "Email verified"
                                : "Email not verified"}
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedRecruiter(
                                    recruiter
                                  )
                                }
                                disabled={
                                  isReviewing
                                }
                                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
                              >
                                Review
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleReview(
                                    recruiter,
                                    "approve"
                                  )
                                }
                                disabled={
                                  isReviewing
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isReviewing ? (
                                  <RefreshCw
                                    size={
                                      16
                                    }
                                    className="animate-spin"
                                  />
                                ) : (
                                  <UserCheck
                                    size={
                                      16
                                    }
                                  />
                                )}

                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleReview(
                                    recruiter,
                                    "reject"
                                  )
                                }
                                disabled={
                                  isReviewing
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <UserX
                                  size={16}
                                />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 p-5 lg:hidden">
              {paginatedRecruiters.map(
                (recruiter) => {
                  const isReviewing =
                    reviewingUserId ===
                    recruiter.userId;

                  return (
                    <article
                      key={
                        recruiter.userId
                      }
                      className="rounded-2xl border border-neutral-200 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                          {getInitials(
                            recruiter.fullName
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-neutral-900">
                            {
                              recruiter.fullName
                            }
                          </h3>

                          <p className="mt-1 break-all text-sm text-neutral-500">
                            {
                              recruiter.email
                            }
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
                        <p>
                          <span className="font-semibold text-neutral-900">
                            User ID:
                          </span>{" "}
                          {
                            recruiter.userId
                          }
                        </p>

                        <p>
                          <span className="font-semibold text-neutral-900">
                            Registered:
                          </span>{" "}
                          {formatDate(
                            recruiter.createdAt
                          )}
                        </p>

                        <p>
                          <span className="font-semibold text-neutral-900">
                            Status:
                          </span>{" "}
                          Pending
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRecruiter(
                              recruiter
                            )
                          }
                          className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                        >
                          Review
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleReview(
                              recruiter,
                              "approve"
                            )
                          }
                          disabled={
                            isReviewing
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          {isReviewing ? (
                            <RefreshCw
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <UserCheck
                              size={16}
                            />
                          )}

                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleReview(
                              recruiter,
                              "reject"
                            )
                          }
                          disabled={
                            isReviewing
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 disabled:opacity-50"
                        >
                          <UserX
                            size={16}
                          />
                          Reject
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm text-neutral-600">
                Showing{" "}
                <span className="font-semibold text-neutral-900">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-neutral-900">
                  {Math.min(
                    startIndex +
                      recruitersPerPage,
                    filteredRecruiters.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-neutral-900">
                  {
                    filteredRecruiters.length
                  }
                </span>{" "}
                recruiters
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      (previousPage) =>
                        Math.max(
                          previousPage -
                            1,
                          1
                        )
                    )
                  }
                  disabled={
                    currentPage === 1
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft
                    size={19}
                  />
                </button>

                <span className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      (previousPage) =>
                        Math.min(
                          previousPage +
                            1,
                          totalPages
                        )
                    )
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight
                    size={19}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {selectedRecruiter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 text-lg font-bold text-white">
                  {getInitials(
                    selectedRecruiter.fullName
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {
                      selectedRecruiter.fullName
                    }
                  </h2>

                  <p className="mt-1 break-all text-sm text-neutral-600">
                    {
                      selectedRecruiter.email
                    }
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRecruiter(
                    null
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close recruiter review"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    User ID
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    #
                    {
                      selectedRecruiter.userId
                    }
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Role
                  </p>

                  <p className="mt-2 font-bold capitalize text-neutral-900">
                    {
                      selectedRecruiter.role
                    }
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Account Status
                  </p>

                  <p className="mt-2 font-bold capitalize text-amber-700">
                    {
                      selectedRecruiter.accountStatus
                    }
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Email Verification
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedRecruiter.emailVerified
                      ? "Verified"
                      : "Not verified"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-5">
                <p className="text-sm font-semibold text-neutral-500">
                  Registered On
                </p>

                <p className="mt-2 font-medium text-neutral-900">
                  {formatDate(
                    selectedRecruiter.createdAt
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />

                  <p className="text-sm leading-6 text-blue-800">
                    Approving this request
                    activates the recruiter
                    account. Rejecting it
                    prevents the recruiter
                    from logging in.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() =>
                  setSelectedRecruiter(
                    null
                  )
                }
                disabled={
                  reviewingUserId ===
                  selectedRecruiter.userId
                }
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  handleReview(
                    selectedRecruiter,
                    "reject"
                  )
                }
                disabled={
                  reviewingUserId ===
                  selectedRecruiter.userId
                }
                className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-5 py-3 font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
              >
                <UserX size={18} />
                Reject
              </button>

              <button
                type="button"
                onClick={() =>
                  handleReview(
                    selectedRecruiter,
                    "approve"
                  )
                }
                disabled={
                  reviewingUserId ===
                  selectedRecruiter.userId
                }
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {reviewingUserId ===
                selectedRecruiter.userId ? (
                  <RefreshCw
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <UserCheck
                    size={18}
                  />
                )}

                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recruiters;