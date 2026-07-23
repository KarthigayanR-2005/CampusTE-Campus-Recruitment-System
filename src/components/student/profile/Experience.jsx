import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import {
  createStudentExperienceRequest,
  deleteStudentExperienceRequest,
  getStudentExperiencesRequest,
  updateStudentExperienceRequest,
} from "../../../services/studentService";

const emptyForm = {
  company: "",
  role: "",
  employmentType: "internship",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
};

const employmentTypeOptions = [
  {
    value: "internship",
    label: "Internship",
  },
  {
    value: "full_time",
    label: "Full Time",
  },
  {
    value: "part_time",
    label: "Part Time",
  },
  {
    value: "freelance",
    label: "Freelance",
  },
  {
    value: "contract",
    label: "Contract",
  },
  {
    value: "volunteer",
    label: "Volunteer",
  },
  {
    value: "apprenticeship",
    label: "Apprenticeship",
  },
  {
    value: "other",
    label: "Other",
  },
];

function formatEmploymentType(value) {
  const matchingType =
    employmentTypeOptions.find(
      (option) =>
        option.value === value
    );

  return matchingType?.label || "Other";
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(
    `${dateValue}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

function Experience() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const messageTimerReference =
    useRef(null);

  const [
    experiences,
    setExperiences,
  ] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    deletingExperienceId,
    setDeletingExperienceId,
  ] = useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [
    editingExperience,
    setEditingExperience,
  ] = useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

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

  const loadExperiences = useCallback(
    async ({
      showMainLoader = true,
    } = {}) => {
      if (!token) {
        setIsLoading(false);
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
          await getStudentExperiencesRequest({
            token,
          });

        setExperiences(
          Array.isArray(response.experiences)
            ? response.experiences
            : []
        );
      } catch (error) {
        if (
          handleAuthenticationError(error)
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to retrieve your experiences."
        );
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
    loadExperiences();
  }, [loadExperiences]);

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

  const openCreateModal = () => {
    setEditingExperience(null);

    setFormData({
      ...emptyForm,
    });

    setErrorMessage("");
    setShowModal(true);
  };

  const openEditModal = (
    experience
  ) => {
    setEditingExperience(experience);

    setFormData({
      company:
        experience.company || "",

      role:
        experience.role || "",

      employmentType:
        experience.employmentType ||
        "internship",

      location:
        experience.location || "",

      startDate:
        experience.startDate || "",

      endDate:
        experience.endDate || "",

      currentlyWorking:
        Boolean(
          experience.currentlyWorking
        ),

      description:
        experience.description || "",
    });

    setErrorMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setShowModal(false);
    setEditingExperience(null);

    setFormData({
      ...emptyForm,
    });

    setErrorMessage("");
  };

  const handleInputChange = (
    event
  ) => {
    const {
      name,
      type,
      value,
      checked,
    } = event.target;

    setFormData((previousData) => {
      const updatedData = {
        ...previousData,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      };

      if (
        name === "currentlyWorking" &&
        checked
      ) {
        updatedData.endDate = "";
      }

      return updatedData;
    });

    setErrorMessage("");
  };

  const validateForm = () => {
    if (!formData.company.trim()) {
      return "Company or organization name is required.";
    }

    if (!formData.role.trim()) {
      return "Job title is required.";
    }

    if (!formData.location.trim()) {
      return "Location is required. Enter Remote when applicable.";
    }

    if (!formData.startDate) {
      return "Start date is required.";
    }

    if (
      !formData.currentlyWorking &&
      !formData.endDate
    ) {
      return "Enter an end date or select Currently Working.";
    }

    if (
      !formData.currentlyWorking &&
      formData.endDate <
        formData.startDate
    ) {
      return "End date cannot be before the start date.";
    }

    if (
      formData.description.trim()
        .length < 10
    ) {
      return "Description must contain at least 10 characters.";
    }

    return "";
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const experienceData = {
      company:
        formData.company.trim(),

      role:
        formData.role.trim(),

      employmentType:
        formData.employmentType,

      location:
        formData.location.trim(),

      startDate:
        formData.startDate,

      endDate:
        formData.currentlyWorking
          ? ""
          : formData.endDate,

      currentlyWorking:
        formData.currentlyWorking,

      description:
        formData.description.trim(),
    };

    try {
      let response;

      if (editingExperience) {
        response =
          await updateStudentExperienceRequest({
            token,

            experienceId:
              editingExperience.experienceId,

            experience:
              experienceData,
          });

        setExperiences(
          (previousExperiences) =>
            previousExperiences.map(
              (experience) =>
                experience.experienceId ===
                response.experience
                  .experienceId
                  ? response.experience
                  : experience
            )
        );
      } else {
        response =
          await createStudentExperienceRequest({
            token,
            experience:
              experienceData,
          });

        setExperiences(
          (previousExperiences) => [
            response.experience,
            ...previousExperiences,
          ]
        );
      }

      setShowModal(false);
      setEditingExperience(null);

      setFormData({
        ...emptyForm,
      });

      showSuccessMessage(
        response.message ||
          "Experience saved successfully."
      );
    } catch (error) {
      if (
        handleAuthenticationError(error)
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          "Unable to save the experience."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (
    experience
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${experience.role}" at "${experience.company}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingExperienceId(
      experience.experienceId
    );

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response =
        await deleteStudentExperienceRequest({
          token,

          experienceId:
            experience.experienceId,
        });

      setExperiences(
        (previousExperiences) =>
          previousExperiences.filter(
            (currentExperience) =>
              currentExperience
                .experienceId !==
              experience.experienceId
          )
      );

      showSuccessMessage(
        response.message ||
          "Experience deleted successfully."
      );
    } catch (error) {
      if (
        handleAuthenticationError(error)
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          "Unable to delete the experience."
      );
    } finally {
      setDeletingExperienceId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Experience
          </h2>

          <p className="mt-2 text-neutral-600">
            Highlight your internships,
            freelance work and
            professional experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              loadExperiences({
                showMainLoader: false,
              })
            }
            disabled={
              isLoading ||
              isRefreshing
            }
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={
                isRefreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]"
          >
            <Plus size={18} />
            Add Experience
          </button>
        </div>
      </div>

      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
        >
          <CheckCircle2 size={19} />
          {successMessage}
        </div>
      )}

      {errorMessage &&
        !showModal && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            {errorMessage}
          </div>
        )}

      {isLoading ? (
        <div className="flex min-h-52 flex-col items-center justify-center text-center">
          <LoaderCircle
            size={34}
            className="animate-spin text-blue-700"
          />

          <h3 className="mt-4 text-lg font-bold text-neutral-900">
            Loading experiences
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Retrieving your experiences
            from MySQL.
          </p>
        </div>
      ) : experiences.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Briefcase size={30} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-neutral-900">
            No experience added
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Add internships, freelance
            work or professional
            experience.
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map(
            (experience) => {
              const isDeleting =
                deletingExperienceId ===
                experience.experienceId;

              return (
                <article
                  key={
                    experience.experienceId
                  }
                  className="rounded-xl border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <Briefcase
                            size={22}
                          />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-semibold text-neutral-900">
                              {
                                experience.role
                              }
                            </h3>

                            {experience.currentlyWorking && (
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                Current
                              </span>
                            )}
                          </div>

                          <p className="mt-1 flex items-center gap-2 text-neutral-600">
                            <Building2
                              size={16}
                            />

                            {
                              experience.company
                            }
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-500">
                        <span className="flex items-center gap-2">
                          <Briefcase
                            size={16}
                          />

                          {formatEmploymentType(
                            experience.employmentType
                          )}
                        </span>

                        <span className="flex items-center gap-2">
                          <MapPin
                            size={16}
                          />

                          {
                            experience.location
                          }
                        </span>

                        <span className="flex items-center gap-2">
                          <CalendarDays
                            size={16}
                          />

                          {formatDate(
                            experience.startDate
                          )}

                          {" — "}

                          {experience.currentlyWorking
                            ? "Present"
                            : formatDate(
                                experience.endDate
                              )}
                        </span>
                      </div>

                      <p className="mt-5 whitespace-pre-line leading-relaxed text-neutral-600">
                        {
                          experience.description
                        }
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            experience
                          )
                        }
                        disabled={
                          isDeleting
                        }
                        className="rounded-lg border border-neutral-200 p-3 transition hover:bg-neutral-100 disabled:opacity-50"
                        aria-label={`Edit ${experience.role}`}
                      >
                        <Pencil
                          size={18}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            experience
                          )
                        }
                        disabled={
                          isDeleting
                        }
                        className="rounded-lg border border-red-200 p-3 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        aria-label={`Delete ${experience.role}`}
                      >
                        {isDeleting ? (
                          <LoaderCircle
                            size={18}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={18}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  {editingExperience
                    ? "Edit Experience"
                    : "Add Experience"}
                </h3>

                <p className="mt-1 text-sm text-neutral-600">
                  Add your work,
                  internship or freelance
                  experience.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 disabled:opacity-50"
                aria-label="Close experience form"
              >
                <X size={21} />
              </button>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mx-6 mt-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
              >
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                {errorMessage}
              </div>
            )}

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="experienceCompany"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Company or Organization
                </label>

                <input
                  id="experienceCompany"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  autoFocus
                  placeholder="Example: Google"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="experienceRole"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Job Title
                </label>

                <input
                  id="experienceRole"
                  name="role"
                  type="text"
                  value={formData.role}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="Example: Software Engineering Intern"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="employmentType"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Employment Type
                </label>

                <select
                  id="employmentType"
                  name="employmentType"
                  value={
                    formData.employmentType
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                >
                  {employmentTypeOptions.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="experienceLocation"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Location
                </label>

                <input
                  id="experienceLocation"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="Example: Bangalore, India or Remote"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="experienceStartDate"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Start Date
                </label>

                <input
                  id="experienceStartDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="experienceEndDate"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  End Date
                </label>

                <input
                  id="experienceEndDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={
                    handleInputChange
                  }
                  disabled={
                    isSubmitting ||
                    formData.currentlyWorking
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
                  <input
                    name="currentlyWorking"
                    type="checkbox"
                    checked={
                      formData.currentlyWorking
                    }
                    onChange={
                      handleInputChange
                    }
                    disabled={isSubmitting}
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="font-medium text-neutral-700">
                    I currently work here
                  </span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="experienceDescription"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Description
                </label>

                <textarea
                  id="experienceDescription"
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  rows={5}
                  maxLength={3000}
                  placeholder="Describe your responsibilities, contributions and achievements."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />

                <p className="mt-2 text-right text-xs text-neutral-500">
                  {
                    formData.description
                      .length
                  }
                  /3000
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : editingExperience ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {isSubmitting
                  ? "Saving..."
                  : editingExperience
                    ? "Update Experience"
                    : "Add Experience"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Experience;