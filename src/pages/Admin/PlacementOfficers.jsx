import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  LoaderCircle,
  Mail,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCheck,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import {
  createPlacementOfficerRequest,
  getPlacementOfficersRequest,
} from "../../services/adminService";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  employeeId: "",
  designation: "",
  department: "",
  institution: "",
  institutionCode: "",
  location: "",
};

const accountStatusStyles = {
  active:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending:
    "border-amber-200 bg-amber-50 text-amber-700",
  suspended:
    "border-rose-200 bg-rose-50 text-rose-700",
  rejected:
    "border-rose-200 bg-rose-50 text-rose-700",
};

function getInitials(fullName) {
  if (!fullName) {
    return "PO";
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

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function formatStatus(status) {
  if (!status) {
    return "Unknown";
  }

  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  );
}

function PlacementOfficers() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const messageTimerReference =
    useRef(null);

  const [officers, setOfficers] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [
    selectedOfficer,
    setSelectedOfficer,
  ] = useState(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [formData, setFormData] =
    useState(initialFormData);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [isCreating, setIsCreating] =
    useState(false);

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

  const showSuccessMessage =
    useCallback((message) => {
      if (
        messageTimerReference.current
      ) {
        window.clearTimeout(
          messageTimerReference.current
        );
      }

      setSuccessMessage(message);

      messageTimerReference.current =
        window.setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
    }, []);

  const loadPlacementOfficers =
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
            await getPlacementOfficersRequest({
              token,
            });

          setOfficers(
            Array.isArray(response.officers)
              ? response.officers
              : []
          );
        } catch (error) {
          if (
            handleAuthenticationError(error)
          ) {
            return;
          }

          if (error.status === 403) {
            setErrorMessage(
              "Only administrators can manage Placement Officer accounts."
            );
          } else {
            setErrorMessage(
              error.message ||
                "Unable to retrieve Placement Officers."
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
    loadPlacementOfficers();
  }, [loadPlacementOfficers]);

  useEffect(() => {
    return () => {
      if (
        messageTimerReference.current
      ) {
        window.clearTimeout(
          messageTimerReference.current
        );
      }
    };
  }, []);

  const filteredOfficers =
    useMemo(() => {
      const query = searchTerm
        .trim()
        .toLowerCase();

      return officers.filter((officer) => {
        const searchableValues = [
          officer.fullName,
          officer.email,
          officer.employeeId,
          officer.designation,
          officer.department,
          officer.institution,
          officer.institutionCode,
          officer.location,
          officer.userId,
        ];

        const matchesSearch =
          !query ||
          searchableValues.some((value) =>
            String(value || "")
              .toLowerCase()
              .includes(query)
          );

        const matchesStatus =
          statusFilter === "all" ||
          officer.accountStatus ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      });
    }, [
      officers,
      searchTerm,
      statusFilter,
    ]);

  const statistics = useMemo(
    () => ({
      total: officers.length,

      active: officers.filter(
        (officer) =>
          officer.accountStatus ===
          "active"
      ).length,

      suspended: officers.filter(
        (officer) =>
          officer.accountStatus ===
          "suspended"
      ).length,

      profiled: officers.filter(
        (officer) =>
          Boolean(officer.profileId)
      ).length,
    }),
    [officers]
  );

  const handleInputChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const validateForm = () => {
    const requiredFields = [
      [
        formData.fullName.trim(),
        "Full name",
      ],
      [
        formData.email.trim(),
        "Official email",
      ],
      [formData.password, "Password"],
      [
        formData.confirmPassword,
        "Confirm password",
      ],
      [
        formData.phone.trim(),
        "Phone number",
      ],
      [
        formData.employeeId.trim(),
        "Employee ID",
      ],
      [
        formData.designation.trim(),
        "Designation",
      ],
      [
        formData.department.trim(),
        "Department",
      ],
      [
        formData.institution.trim(),
        "Institution",
      ],
      [
        formData.institutionCode.trim(),
        "Institution code",
      ],
      [
        formData.location.trim(),
        "Location",
      ],
    ];

    const missingField =
      requiredFields.find(
        ([value]) => !value
      );

    if (missingField) {
      return `${missingField[1]} is required.`;
    }

    const normalizedEmail =
      formData.email
        .trim()
        .toLowerCase();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail
      )
    ) {
      return "Enter a valid official email address.";
    }

    if (formData.password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (
      new TextEncoder().encode(
        formData.password
      ).length > 72
    ) {
      return "Password cannot exceed 72 bytes.";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleCreateOfficer = async (
    event
  ) => {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsCreating(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response =
        await createPlacementOfficerRequest({
          token,
          officer: {
            fullName:
              formData.fullName.trim(),

            email: formData.email
              .trim()
              .toLowerCase(),

            password:
              formData.password,

            phone:
              formData.phone.trim(),

            employeeId:
              formData.employeeId
                .trim()
                .toUpperCase(),

            designation:
              formData.designation.trim(),

            department:
              formData.department.trim(),

            institution:
              formData.institution.trim(),

            institutionCode:
              formData.institutionCode
                .trim()
                .toUpperCase(),

            location:
              formData.location.trim(),
          },
        });

      setShowAddModal(false);
      setFormData(initialFormData);
      setShowPassword(false);
      setShowConfirmPassword(false);

      showSuccessMessage(
        response.message ||
          "Placement Officer account created successfully."
      );

      await loadPlacementOfficers({
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
          "Unable to create the Placement Officer account."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseModal = () => {
    if (isCreating) {
      return;
    }

    setShowAddModal(false);
    setFormData(initialFormData);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrorMessage("");
  };

  const handleExport = () => {
    if (officers.length === 0) {
      setErrorMessage(
        "There are no Placement Officers to export."
      );

      return;
    }

    const headers = [
      "User ID",
      "Full Name",
      "Email",
      "Phone",
      "Employee ID",
      "Designation",
      "Department",
      "Institution",
      "Institution Code",
      "Location",
      "Account Status",
      "Email Verified",
      "Last Login",
      "Created At",
    ];

    const rows = officers.map(
      (officer) => [
        officer.userId,
        officer.fullName,
        officer.email,
        officer.phone,
        officer.employeeId,
        officer.designation,
        officer.department,
        officer.institution,
        officer.institutionCode,
        officer.location,
        officer.accountStatus,
        officer.emailVerified
          ? "Yes"
          : "No",
        officer.lastLoginAt ||
          "Not available",
        officer.createdAt,
      ]
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(
                value ?? ""
              ).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const file = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const downloadUrl =
      URL.createObjectURL(file);

    const anchor =
      document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download =
      "campuste-placement-officers.csv";

    anchor.click();

    URL.revokeObjectURL(downloadUrl);

    showSuccessMessage(
      "Placement Officer data exported successfully."
    );
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <UserCog size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Institution Administration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Placement Officers
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Create Placement Officer
                accounts and manage
                institutional access using
                real data from MySQL.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={18} />
                Export
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <Plus size={18} />
                Add Officer
              </button>

              <button
                type="button"
                onClick={() =>
                  loadPlacementOfficers({
                    showMainLoader: false,
                  })
                }
                disabled={
                  isLoading ||
                  isRefreshing
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={18}
                  className={
                    isRefreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                {isRefreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {successMessage && (
          <div
            role="status"
            className="flex items-center gap-3 border-t border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-800 sm:px-8"
          >
            <CheckCircle2 size={19} />
            {successMessage}
          </div>
        )}

        {errorMessage &&
          !showAddModal && (
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
                    loadPlacementOfficers()
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
            {statistics.total}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Registered Officers
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <UserCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {statistics.active}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Active Officers
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <ShieldCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {statistics.profiled}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Complete Profiles
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <UserCog size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {statistics.suspended}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Suspended Officers
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search officer, institution, email or employee ID..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">
                All Statuses
              </option>

              <option value="active">
                Active
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="suspended">
                Suspended
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-16 text-center">
            <RefreshCw
              size={34}
              className="animate-spin text-blue-700"
            />

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              Loading Placement Officers
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Retrieving account and
              institution details from
              MySQL.
            </p>
          </div>
        ) : filteredOfficers.length ===
          0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 py-16 text-center">
            <UserCog
              size={36}
              className="text-neutral-400"
            />

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No Placement Officers found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Add a Placement Officer or
              change the selected filters.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1150px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Officer
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Institution
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Account
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Last Login
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOfficers.map(
                    (officer) => (
                      <tr
                        key={
                          officer.userId
                        }
                        className="border-b border-neutral-100 transition hover:bg-neutral-50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                              {getInitials(
                                officer.fullName
                              )}
                            </div>

                            <div>
                              <p className="font-bold text-neutral-900">
                                {
                                  officer.fullName
                                }
                              </p>

                              <p className="mt-1 text-sm text-neutral-500">
                                {officer.designation ||
                                  "Placement Officer"}
                              </p>

                              <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                                <Mail
                                  size={
                                    13
                                  }
                                />

                                {
                                  officer.email
                                }
                              </p>

                              <p className="mt-1 text-xs text-neutral-400">
                                {officer.employeeId ||
                                  `User #${officer.userId}`}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-bold text-neutral-900">
                            {officer.institution ||
                              "Profile not completed"}
                          </p>

                          <p className="mt-1 text-sm text-neutral-500">
                            {officer.department ||
                              "Department not available"}
                          </p>

                          <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                            <MapPin
                              size={13}
                            />

                            {officer.location ||
                              "Location not available"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                              accountStatusStyles[
                                officer
                                  .accountStatus
                              ] ||
                              "border-neutral-200 bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {formatStatus(
                              officer.accountStatus
                            )}
                          </span>

                          <p className="mt-2 text-xs text-neutral-500">
                            {officer.emailVerified
                              ? "Email verified"
                              : "Email not verified"}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm font-medium text-neutral-700">
                          {formatDate(
                            officer.lastLoginAt
                          )}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedOfficer(
                                officer
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                          >
                            <Eye
                              size={16}
                            />
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 p-5 lg:hidden">
              {filteredOfficers.map(
                (officer) => (
                  <article
                    key={officer.userId}
                    className="rounded-2xl border border-neutral-200 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                        {getInitials(
                          officer.fullName
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-neutral-900">
                          {
                            officer.fullName
                          }
                        </h3>

                        <p className="mt-1 break-all text-sm text-neutral-500">
                          {officer.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
                      <p className="flex items-center gap-2">
                        <Building2
                          size={16}
                        />

                        {officer.institution ||
                          "Profile not completed"}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin
                          size={16}
                        />

                        {officer.location ||
                          "Location not available"}
                      </p>

                      <p>
                        <span className="font-semibold text-neutral-900">
                          Employee ID:
                        </span>{" "}
                        {officer.employeeId ||
                          "Not available"}
                      </p>

                      <p>
                        <span className="font-semibold text-neutral-900">
                          Status:
                        </span>{" "}
                        {formatStatus(
                          officer.accountStatus
                        )}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedOfficer(
                          officer
                        )
                      }
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </article>
                )
              )}
            </div>
          </>
        )}
      </section>

      {selectedOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 text-lg font-bold text-white">
                  {getInitials(
                    selectedOfficer.fullName
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {
                      selectedOfficer.fullName
                    }
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedOfficer.designation ||
                      "Placement Officer"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOfficer(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close officer details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
              {[
                [
                  "Official Email",
                  selectedOfficer.email,
                ],
                [
                  "Phone Number",
                  selectedOfficer.phone ||
                    "Not available",
                ],
                [
                  "Employee ID",
                  selectedOfficer.employeeId ||
                    "Not available",
                ],
                [
                  "Designation",
                  selectedOfficer.designation ||
                    "Not available",
                ],
                [
                  "Department",
                  selectedOfficer.department ||
                    "Not available",
                ],
                [
                  "Institution",
                  selectedOfficer.institution ||
                    "Not available",
                ],
                [
                  "Institution Code",
                  selectedOfficer.institutionCode ||
                    "Not available",
                ],
                [
                  "Location",
                  selectedOfficer.location ||
                    "Not available",
                ],
                [
                  "Account Status",
                  formatStatus(
                    selectedOfficer.accountStatus
                  ),
                ],
                [
                  "Created On",
                  formatDate(
                    selectedOfficer.createdAt
                  ),
                ],
                [
                  "Last Login",
                  formatDate(
                    selectedOfficer.lastLoginAt
                  ),
                ],
                [
                  "Email Verification",
                  selectedOfficer.emailVerified
                    ? "Verified"
                    : "Not verified",
                ],
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-neutral-50 p-5"
                  >
                    <p className="text-sm font-semibold text-neutral-500">
                      {label}
                    </p>

                    <p className="mt-2 break-words font-bold text-neutral-900">
                      {value}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleCreateOfficer}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Add Placement Officer
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Create an active account
                  with a temporary login
                  password.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isCreating}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 disabled:opacity-50"
                aria-label="Close officer form"
              >
                <X size={21} />
              </button>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mx-6 mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 sm:mx-8"
              >
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                {errorMessage}
              </div>
            )}

            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isCreating}
                  placeholder="Dr. Ramesh Kumar"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Official Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={
                    handleInputChange
                  }
                  disabled={isCreating}
                  placeholder="officer@institution.edu"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Temporary Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      formData.password
                    }
                    onChange={
                      handleInputChange
                    }
                    disabled={isCreating}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-14 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) =>
                          !value
                      )
                    }
                    disabled={isCreating}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={19}
                      />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      formData.confirmPassword
                    }
                    onChange={
                      handleInputChange
                    }
                    disabled={isCreating}
                    placeholder="Re-enter password"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-14 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) =>
                          !value
                      )
                    }
                    disabled={isCreating}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-700"
                    aria-label="Toggle confirmed password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff
                        size={19}
                      />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {[
                [
                  "phone",
                  "Phone Number",
                  "+91 98765 43210",
                ],
                [
                  "employeeId",
                  "Employee ID",
                  "PO-2026-003",
                ],
                [
                  "designation",
                  "Designation",
                  "Placement Officer",
                ],
                [
                  "department",
                  "Department",
                  "Training and Placement Cell",
                ],
                [
                  "institution",
                  "Institution",
                  "CampusTE Institute of Technology",
                ],
                [
                  "institutionCode",
                  "Institution Code",
                  "CTE-CBE-001",
                ],
                [
                  "location",
                  "Location",
                  "Coimbatore, Tamil Nadu",
                ],
              ].map(
                ([
                  name,
                  label,
                  placeholder,
                ]) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="mb-2 block text-sm font-semibold text-neutral-700"
                    >
                      {label}
                    </label>

                    <input
                      id={name}
                      name={name}
                      type="text"
                      value={
                        formData[name]
                      }
                      onChange={
                        handleInputChange
                      }
                      disabled={
                        isCreating
                      }
                      placeholder={
                        placeholder
                      }
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                    />
                  </div>
                )
              )}

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:col-span-2">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />

                  <div>
                    <p className="font-bold text-blue-900">
                      Active account
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-700">
                      This account will be
                      created with the
                      Placement Officer role
                      and active status.
                      Share the temporary
                      password securely.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isCreating}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 px-5 py-3 font-semibold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Plus size={18} />
                )}

                {isCreating
                  ? "Creating Account..."
                  : "Create Officer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacementOfficers;