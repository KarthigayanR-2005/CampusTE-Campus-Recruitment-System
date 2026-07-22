import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FolderGit2,
  Globe,
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import {
  createStudentProjectRequest,
  deleteStudentProjectRequest,
  getStudentProjectsRequest,
  updateStudentProjectRequest,
} from "../../../services/studentService";

const emptyForm = {
  title: "",
  description: "",
  technologiesInput: "",
  githubUrl: "",
  liveDemoUrl: "",
  startDate: "",
  endDate: "",
  status: "in_progress",
};

const statusOptions = [
  {
    value: "planned",
    label: "Planned",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "on_hold",
    label: "On Hold",
  },
];

const statusStyles = {
  planned: "bg-blue-100 text-blue-700",
  in_progress:
    "bg-amber-100 text-amber-700",
  completed:
    "bg-emerald-100 text-emerald-700",
  on_hold:
    "bg-neutral-200 text-neutral-700",
};

function formatStatus(status) {
  const matchingStatus =
    statusOptions.find(
      (option) =>
        option.value === status
    );

  return (
    matchingStatus?.label || "Unknown"
  );
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
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

function Projects() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const messageTimerReference =
    useRef(null);

  const [projects, setProjects] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [
    deletingProjectId,
    setDeletingProjectId,
  ] = useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [
    editingProject,
    setEditingProject,
  ] = useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

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

  const loadProjects = useCallback(
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
          await getStudentProjectsRequest({
            token,
          });

        setProjects(
          Array.isArray(response.projects)
            ? response.projects
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
            "Unable to retrieve your projects."
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
    loadProjects();
  }, [loadProjects]);

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
    setEditingProject(null);
    setFormData(emptyForm);
    setErrorMessage("");
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);

    setFormData({
      title: project.title,
      description:
        project.description,
      technologiesInput:
        project.technologies.join(", "),
      githubUrl:
        project.githubUrl || "",
      liveDemoUrl:
        project.liveDemoUrl || "",
      startDate:
        project.startDate || "",
      endDate:
        project.endDate || "",
      status:
        project.status ||
        "in_progress",
    });

    setErrorMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setShowModal(false);
    setEditingProject(null);
    setFormData(emptyForm);
    setErrorMessage("");
  };

  const handleInputChange = (
    event
  ) => {
    const { name, value } =
      event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const validateForm = () => {
    const title =
      formData.title.trim();

    const description =
      formData.description.trim();

    const technologies =
      formData.technologiesInput
        .split(",")
        .map((technology) =>
          technology.trim()
        )
        .filter(Boolean);

    if (!title) {
      return "Project title is required.";
    }

    if (title.length < 2) {
      return "Project title must contain at least 2 characters.";
    }

    if (!description) {
      return "Project description is required.";
    }

    if (description.length < 10) {
      return "Project description must contain at least 10 characters.";
    }

    if (technologies.length === 0) {
      return "Add at least one technology.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate <
        formData.startDate
    ) {
      return "Project end date cannot be before its start date.";
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

    const technologies = [
      ...new Set(
        formData.technologiesInput
          .split(",")
          .map((technology) =>
            technology.trim()
          )
          .filter(Boolean)
      ),
    ];

    const projectData = {
      title:
        formData.title.trim(),

      description:
        formData.description.trim(),

      technologies,

      githubUrl:
        formData.githubUrl.trim(),

      liveDemoUrl:
        formData.liveDemoUrl.trim(),

      startDate:
        formData.startDate,

      endDate:
        formData.endDate,

      status:
        formData.status,
    };

    try {
      let response;

      if (editingProject) {
        response =
          await updateStudentProjectRequest({
            token,
            projectId:
              editingProject.projectId,
            project: projectData,
          });

        setProjects(
          (previousProjects) =>
            previousProjects.map(
              (project) =>
                project.projectId ===
                response.project.projectId
                  ? response.project
                  : project
            )
        );
      } else {
        response =
          await createStudentProjectRequest({
            token,
            project: projectData,
          });

        setProjects(
          (previousProjects) => [
            response.project,
            ...previousProjects,
          ]
        );
      }

      setShowModal(false);
      setEditingProject(null);
      setFormData(emptyForm);

      showSuccessMessage(
        response.message ||
          "Project saved successfully."
      );
    } catch (error) {
      if (
        handleAuthenticationError(error)
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          "Unable to save the project."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (
    project
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingProjectId(
      project.projectId
    );

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response =
        await deleteStudentProjectRequest({
          token,
          projectId:
            project.projectId,
        });

      setProjects(
        (previousProjects) =>
          previousProjects.filter(
            (currentProject) =>
              currentProject.projectId !==
              project.projectId
          )
      );

      showSuccessMessage(
        response.message ||
          "Project deleted successfully."
      );
    } catch (error) {
      if (
        handleAuthenticationError(error)
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          "Unable to delete the project."
      );
    } finally {
      setDeletingProjectId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Projects
          </h2>

          <p className="mt-2 text-neutral-600">
            Showcase your academic and
            personal projects.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              loadProjects({
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
            Add Project
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
            Loading projects
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Retrieving your projects from
            MySQL.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <FolderGit2 size={30} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-neutral-900">
            No projects added
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Add your academic, personal,
            or professional projects.
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => {
            const isDeleting =
              deletingProjectId ===
              project.projectId;

            return (
              <article
                key={project.projectId}
                className="rounded-xl border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <FolderGit2
                          size={22}
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                          {project.title}
                        </h3>

                        <span
                          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[
                              project.status
                            ] ||
                            "bg-neutral-100 text-neutral-700"
                          }`}
                        >
                          {formatStatus(
                            project.status
                          )}
                        </span>
                      </div>
                    </div>

                    <p className="mt-5 whitespace-pre-line leading-relaxed text-neutral-600">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>

                    {(project.startDate ||
                      project.endDate) && (
                      <p className="mt-5 text-sm font-medium text-neutral-500">
                        {project.startDate
                          ? formatDate(
                              project.startDate
                            )
                          : "Start date not provided"}

                        {" — "}

                        {project.endDate
                          ? formatDate(
                              project.endDate
                            )
                          : "Present"}
                      </p>
                    )}

                    {(project.githubUrl ||
                      project.liveDemoUrl) && (
                      <div className="mt-6 flex flex-wrap gap-5">
                        {project.githubUrl && (
                          <a
                            href={
                              project.githubUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 font-medium text-neutral-700 hover:text-blue-600"
                          >
                            <Globe size={18} />
                            GitHub
                          </a>
                        )}

                        {project.liveDemoUrl && (
                          <a
                            href={
                              project.liveDemoUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 font-medium text-neutral-700 hover:text-blue-600"
                          >
                            <ExternalLink
                              size={18}
                            />
                            Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(project)
                      }
                      disabled={isDeleting}
                      className="rounded-lg border border-neutral-200 p-3 transition hover:bg-neutral-100 disabled:opacity-50"
                      aria-label={`Edit ${project.title}`}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(project)
                      }
                      disabled={isDeleting}
                      className="rounded-lg border border-red-200 p-3 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      aria-label={`Delete ${project.title}`}
                    >
                      {isDeleting ? (
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
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
                  {editingProject
                    ? "Edit Project"
                    : "Add Project"}
                </h3>

                <p className="mt-1 text-sm text-neutral-600">
                  Add project details,
                  technologies and links.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 disabled:opacity-50"
                aria-label="Close project form"
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
              <div className="sm:col-span-2">
                <label
                  htmlFor="projectTitle"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Project Title
                </label>

                <input
                  id="projectTitle"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="Example: CampusTE"
                  autoFocus
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="projectDescription"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Description
                </label>

                <textarea
                  id="projectDescription"
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  rows={5}
                  maxLength={5000}
                  placeholder="Describe the problem, solution and your contribution."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />

                <p className="mt-2 text-right text-xs text-neutral-500">
                  {
                    formData.description
                      .length
                  }
                  /5000
                </p>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="projectTechnologies"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Technologies
                </label>

                <input
                  id="projectTechnologies"
                  name="technologiesInput"
                  type="text"
                  value={
                    formData.technologiesInput
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="React, Node.js, MySQL, Tailwind CSS"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />

                <p className="mt-2 text-xs text-neutral-500">
                  Separate technologies
                  using commas.
                </p>
              </div>

              <div>
                <label
                  htmlFor="projectStatus"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Project Status
                </label>

                <select
                  id="projectStatus"
                  name="status"
                  value={formData.status}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                >
                  {statusOptions.map(
                    (status) => (
                      <option
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="projectGithubUrl"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  GitHub URL
                </label>

                <input
                  id="projectGithubUrl"
                  name="githubUrl"
                  type="url"
                  value={
                    formData.githubUrl
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="https://github.com/user/repository"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="projectDemoUrl"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Live Demo URL
                </label>

                <input
                  id="projectDemoUrl"
                  name="liveDemoUrl"
                  type="url"
                  value={
                    formData.liveDemoUrl
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="https://project.example.com"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="projectStartDate"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Start Date
                </label>

                <input
                  id="projectStartDate"
                  name="startDate"
                  type="date"
                  value={
                    formData.startDate
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="projectEndDate"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  End Date
                </label>

                <input
                  id="projectEndDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />

                <p className="mt-2 text-xs text-neutral-500">
                  Leave empty for an
                  ongoing project.
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
                ) : editingProject ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {isSubmitting
                  ? "Saving..."
                  : editingProject
                    ? "Update Project"
                    : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Projects;