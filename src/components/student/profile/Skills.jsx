import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
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
  createStudentSkillRequest,
  deleteStudentSkillRequest,
  getStudentSkillsRequest,
  updateStudentSkillRequest,
} from "../../../services/studentService";

const emptyForm = {
  name: "",
  level: "beginner",
};

const badgeColors = {
  beginner:
    "bg-rose-100 text-rose-700",
  intermediate:
    "bg-amber-100 text-amber-700",
  advanced:
    "bg-emerald-100 text-emerald-700",
  expert:
    "bg-purple-100 text-purple-700",
};

const levelOptions = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
  {
    value: "expert",
    label: "Expert",
  },
];

function formatLevel(level) {
  if (!level) {
    return "Unknown";
  }

  return (
    level.charAt(0).toUpperCase() +
    level.slice(1)
  );
}

function Skills() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const messageTimerReference =
    useRef(null);

  const [skills, setSkills] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [
    deletingSkillId,
    setDeletingSkillId,
  ] = useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [
    editingSkill,
    setEditingSkill,
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

  const loadSkills = useCallback(
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
          await getStudentSkillsRequest({
            token,
          });

        setSkills(
          Array.isArray(response.skills)
            ? response.skills
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
            "Only Student accounts can manage skills."
          );
        } else {
          setErrorMessage(
            error.message ||
              "Unable to retrieve your skills."
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
    loadSkills();
  }, [loadSkills]);

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
    setEditingSkill(null);
    setFormData(emptyForm);
    setErrorMessage("");
    setShowModal(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);

    setFormData({
      name: skill.name,
      level: skill.level,
    });

    setErrorMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setShowModal(false);
    setEditingSkill(null);
    setFormData(emptyForm);
    setErrorMessage("");
  };

  const validateForm = () => {
    const skillName =
      formData.name.trim();

    if (!skillName) {
      return "Skill name is required.";
    }

    if (skillName.length < 2) {
      return "Skill name must contain at least 2 characters.";
    }

    if (skillName.length > 100) {
      return "Skill name cannot exceed 100 characters.";
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

    try {
      const skillData = {
        name: formData.name.trim(),
        level: formData.level,
      };

      let response;

      if (editingSkill) {
        response =
          await updateStudentSkillRequest({
            token,
            skillId:
              editingSkill.skillId,
            skill: skillData,
          });

        setSkills((previousSkills) =>
          previousSkills
            .map((skill) =>
              skill.skillId ===
              response.skill.skillId
                ? response.skill
                : skill
            )
            .sort((first, second) =>
              first.name.localeCompare(
                second.name
              )
            )
        );
      } else {
        response =
          await createStudentSkillRequest({
            token,
            skill: skillData,
          });

        setSkills((previousSkills) =>
          [
            ...previousSkills,
            response.skill,
          ].sort((first, second) =>
            first.name.localeCompare(
              second.name
            )
          )
        );
      }

      setShowModal(false);
      setEditingSkill(null);
      setFormData(emptyForm);

      showSuccessMessage(
        response.message ||
          "Skill saved successfully."
      );
    } catch (error) {
      if (
        handleAuthenticationError(error)
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          "Unable to save the skill."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (
    skill
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${skill.name}?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingSkillId(
      skill.skillId
    );

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response =
        await deleteStudentSkillRequest({
          token,
          skillId: skill.skillId,
        });

      setSkills((previousSkills) =>
        previousSkills.filter(
          (currentSkill) =>
            currentSkill.skillId !==
            skill.skillId
        )
      );

      showSuccessMessage(
        response.message ||
          "Skill deleted successfully."
      );
    } catch (error) {
      if (
        handleAuthenticationError(error)
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          "Unable to delete the skill."
      );
    } finally {
      setDeletingSkillId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Skills
          </h2>

          <p className="mt-2 text-neutral-600">
            Showcase your technical and
            professional skills.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              loadSkills({
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
            Add Skill
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
            Loading skills
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Retrieving your skills from
            MySQL.
          </p>
        </div>
      ) : skills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Code2 size={30} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-neutral-900">
            No skills added
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Add your technical and
            professional skills to improve
            your profile.
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add First Skill
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((skill) => {
            const isDeleting =
              deletingSkillId ===
              skill.skillId;

            return (
              <div
                key={skill.skillId}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Code2 size={22} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-neutral-900">
                      {skill.name}
                    </h3>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        badgeColors[
                          skill.level
                        ] ||
                        "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {formatLevel(
                        skill.level
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(skill)
                    }
                    disabled={isDeleting}
                    className="rounded-lg border border-neutral-200 p-2 transition hover:bg-neutral-100 disabled:opacity-50"
                    aria-label={`Edit ${skill.name}`}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(skill)
                    }
                    disabled={isDeleting}
                    className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    aria-label={`Delete ${skill.name}`}
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
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  {editingSkill
                    ? "Edit Skill"
                    : "Add Skill"}
                </h3>

                <p className="mt-1 text-sm text-neutral-600">
                  Enter the skill name and
                  your proficiency level.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 disabled:opacity-50"
                aria-label="Close skill form"
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

            <div className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="skillName"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Skill Name
                </label>

                <input
                  id="skillName"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData(
                      (previousData) => ({
                        ...previousData,
                        name:
                          event.target
                            .value,
                      })
                    )
                  }
                  disabled={isSubmitting}
                  placeholder="Example: React"
                  autoFocus
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="skillLevel"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Proficiency Level
                </label>

                <select
                  id="skillLevel"
                  value={formData.level}
                  onChange={(event) =>
                    setFormData(
                      (previousData) => ({
                        ...previousData,
                        level:
                          event.target
                            .value,
                      })
                    )
                  }
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                >
                  {levelOptions.map(
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
                ) : editingSkill ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {isSubmitting
                  ? "Saving..."
                  : editingSkill
                    ? "Update Skill"
                    : "Add Skill"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Skills;