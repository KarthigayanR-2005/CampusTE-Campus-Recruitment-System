import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  Award,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../../context/AuthContext";

import {
  createStudentCertificationRequest,
  deleteStudentCertificationRequest,
  getStudentCertificationsRequest,
  updateStudentCertificationRequest,
} from "../../../services/studentService";

const emptyForm = {
  title: "",
  issuer: "",
  credentialId: "",
  credentialUrl: "",
  issueDate: "",
  expiryDate: "",
  doesNotExpire: false,
  description: "",
};

function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(
    `${dateValue}T00:00:00`
  );

  if (
    Number.isNaN(date.getTime())
  ) {
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

function Certifications() {
  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const messageTimerReference =
    useRef(null);

  const [
    certifications,
    setCertifications,
  ] = useState([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    deletingCertificationId,
    setDeletingCertificationId,
  ] = useState(null);

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    editingCertification,
    setEditingCertification,
  ] = useState(null);

  const [
    formData,
    setFormData,
  ] = useState(emptyForm);

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

  const showSuccessMessage =
    useCallback(
      (message) => {
        if (
          messageTimerReference.current
        ) {
          window.clearTimeout(
            messageTimerReference.current
          );
        }

        setSuccessMessage(message);

        messageTimerReference.current =
          window.setTimeout(
            () => {
              setSuccessMessage("");
            },
            4000
          );
      },
      []
    );

  const loadCertifications =
    useCallback(
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
            await getStudentCertificationsRequest({
              token,
            });

          setCertifications(
            Array.isArray(
              response.certifications
            )
              ? response.certifications
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
              "Unable to retrieve your certifications."
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
    loadCertifications();
  }, [loadCertifications]);

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
    setEditingCertification(null);

    setFormData({
      ...emptyForm,
    });

    setErrorMessage("");
    setShowModal(true);
  };

  const openEditModal = (
    certification
  ) => {
    setEditingCertification(
      certification
    );

    setFormData({
      title:
        certification.title || "",

      issuer:
        certification.issuer || "",

      credentialId:
        certification.credentialId ||
        "",

      credentialUrl:
        certification.credentialUrl ||
        "",

      issueDate:
        certification.issueDate || "",

      expiryDate:
        certification.expiryDate || "",

      doesNotExpire:
        Boolean(
          certification.doesNotExpire
        ),

      description:
        certification.description ||
        "",
    });

    setErrorMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }

    setShowModal(false);

    setEditingCertification(
      null
    );

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

    setFormData(
      (previousData) => {
        const updatedData = {
          ...previousData,

          [name]:
            type === "checkbox"
              ? checked
              : value,
        };

        if (
          name ===
            "doesNotExpire" &&
          checked
        ) {
          updatedData.expiryDate =
            "";
        }

        return updatedData;
      }
    );

    setErrorMessage("");
  };

  const validateForm = () => {
    const title =
      formData.title.trim();

    const issuer =
      formData.issuer.trim();

    if (!title) {
      return "Certification name is required.";
    }

    if (title.length < 2) {
      return "Certification name must contain at least 2 characters.";
    }

    if (!issuer) {
      return "Issuing organization is required.";
    }

    if (issuer.length < 2) {
      return "Issuing organization must contain at least 2 characters.";
    }

    if (!formData.issueDate) {
      return "Issue date is required.";
    }

    if (
      !formData.doesNotExpire &&
      !formData.expiryDate
    ) {
      return "Enter an expiry date or select Does Not Expire.";
    }

    if (
      !formData.doesNotExpire &&
      formData.expiryDate <
        formData.issueDate
    ) {
      return "Expiry date cannot be before the issue date.";
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
      setErrorMessage(
        validationError
      );

      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const certificationData = {
      title:
        formData.title.trim(),

      issuer:
        formData.issuer.trim(),

      credentialId:
        formData.credentialId.trim(),

      credentialUrl:
        formData.credentialUrl.trim(),

      issueDate:
        formData.issueDate,

      expiryDate:
        formData.doesNotExpire
          ? ""
          : formData.expiryDate,

      doesNotExpire:
        formData.doesNotExpire,

      description:
        formData.description.trim(),
    };

    try {
      let response;

      if (editingCertification) {
        response =
          await updateStudentCertificationRequest({
            token,

            certificationId:
              editingCertification
                .certificationId,

            certification:
              certificationData,
          });

        setCertifications(
          (
            previousCertifications
          ) =>
            previousCertifications.map(
              (certification) =>
                certification
                  .certificationId ===
                response.certification
                  .certificationId
                  ? response.certification
                  : certification
            )
        );
      } else {
        response =
          await createStudentCertificationRequest({
            token,

            certification:
              certificationData,
          });

        setCertifications(
          (
            previousCertifications
          ) => [
            response.certification,
            ...previousCertifications,
          ]
        );
      }

      setShowModal(false);

      setEditingCertification(
        null
      );

      setFormData({
        ...emptyForm,
      });

      showSuccessMessage(
        response.message ||
          "Certification saved successfully."
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
          "Unable to save the certification."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (
    certification
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${certification.title}"?`
      );

    if (!confirmed) {
      return;
    }

    setDeletingCertificationId(
      certification.certificationId
    );

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response =
        await deleteStudentCertificationRequest({
          token,

          certificationId:
            certification
              .certificationId,
        });

      setCertifications(
        (
          previousCertifications
        ) =>
          previousCertifications.filter(
            (
              currentCertification
            ) =>
              currentCertification
                .certificationId !==
              certification
                .certificationId
          )
      );

      showSuccessMessage(
        response.message ||
          "Certification deleted successfully."
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
          "Unable to delete the certification."
      );
    } finally {
      setDeletingCertificationId(
        null
      );
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Certifications
          </h2>

          <p className="mt-2 text-neutral-600">
            Showcase certifications that
            strengthen your profile.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              loadCertifications({
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

            Add Certification
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
            Loading certifications
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Retrieving your
            certifications from MySQL.
          </p>
        </div>
      ) : certifications.length ===
        0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Award size={30} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-neutral-900">
            No certifications added
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Add certificates that
            demonstrate your skills and
            achievements.
          </p>

          <button
            type="button"
            onClick={openCreateModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />

            Add First Certification
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {certifications.map(
            (certification) => {
              const isDeleting =
                deletingCertificationId ===
                certification
                  .certificationId;

              return (
                <article
                  key={
                    certification
                      .certificationId
                  }
                  className="rounded-xl border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <Award
                            size={22}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="break-words text-xl font-semibold text-neutral-900">
                            {
                              certification.title
                            }
                          </h3>

                          <p className="mt-1 text-neutral-600">
                            {
                              certification.issuer
                            }
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays
                            size={16}
                          />

                          Issued{" "}
                          {formatDate(
                            certification
                              .issueDate
                          )}
                        </span>

                        <span>
                          {certification
                            .doesNotExpire
                            ? "Does not expire"
                            : `Expires ${formatDate(
                                certification
                                  .expiryDate
                              )}`}
                        </span>
                      </div>

                      {certification
                        .credentialId && (
                        <p className="mt-4 text-sm text-neutral-600">
                          <span className="font-semibold text-neutral-700">
                            Credential
                            ID:
                          </span>{" "}
                          {
                            certification
                              .credentialId
                          }
                        </p>
                      )}

                      {certification
                        .description && (
                        <p className="mt-4 whitespace-pre-line leading-relaxed text-neutral-600">
                          {
                            certification
                              .description
                          }
                        </p>
                      )}

                      {certification
                        .credentialUrl && (
                        <a
                          href={
                            certification
                              .credentialUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink
                            size={18}
                          />

                          View Credential
                        </a>
                      )}
                    </div>

                    <div className="flex shrink-0 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            certification
                          )
                        }
                        disabled={
                          isDeleting
                        }
                        className="rounded-lg border border-neutral-200 p-3 transition hover:bg-neutral-100 disabled:opacity-50"
                        aria-label={`Edit ${certification.title}`}
                      >
                        <Pencil
                          size={18}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            certification
                          )
                        }
                        disabled={
                          isDeleting
                        }
                        className="rounded-lg border border-red-200 p-3 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        aria-label={`Delete ${certification.title}`}
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
                  {editingCertification
                    ? "Edit Certification"
                    : "Add Certification"}
                </h3>

                <p className="mt-1 text-sm text-neutral-600">
                  Add the certification
                  details and credential
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 disabled:opacity-50"
                aria-label="Close certification form"
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
                  htmlFor="certificationTitle"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Certification Name
                </label>

                <input
                  id="certificationTitle"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  autoFocus
                  placeholder="Example: AWS Cloud Practitioner"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="certificationIssuer"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Issuing Organization
                </label>

                <input
                  id="certificationIssuer"
                  name="issuer"
                  type="text"
                  value={formData.issuer}
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="Example: Amazon Web Services"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="credentialId"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Credential ID
                </label>

                <input
                  id="credentialId"
                  name="credentialId"
                  type="text"
                  value={
                    formData.credentialId
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="Optional credential ID"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="credentialUrl"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Credential URL
                </label>

                <input
                  id="credentialUrl"
                  name="credentialUrl"
                  type="url"
                  value={
                    formData.credentialUrl
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  placeholder="https://example.com/credential"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div>
                <label
                  htmlFor="certificationIssueDate"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Issue Date
                </label>

                <input
                  id="certificationIssueDate"
                  name="issueDate"
                  type="date"
                  value={
                    formData.issueDate
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
                  htmlFor="certificationExpiryDate"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Expiry Date
                </label>

                <input
                  id="certificationExpiryDate"
                  name="expiryDate"
                  type="date"
                  value={
                    formData.expiryDate
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={
                    isSubmitting ||
                    formData.doesNotExpire
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3">
                  <input
                    name="doesNotExpire"
                    type="checkbox"
                    checked={
                      formData
                        .doesNotExpire
                    }
                    onChange={
                      handleInputChange
                    }
                    disabled={
                      isSubmitting
                    }
                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="font-medium text-neutral-700">
                    This certification
                    does not expire
                  </span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="certificationDescription"
                  className="mb-2 block font-semibold text-neutral-700"
                >
                  Description
                </label>

                <textarea
                  id="certificationDescription"
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  disabled={isSubmitting}
                  rows={4}
                  maxLength={2000}
                  placeholder="Briefly describe what this certification demonstrates."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
                />

                <p className="mt-2 text-right text-xs text-neutral-500">
                  {
                    formData.description
                      .length
                  }
                  /2000
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
                ) : editingCertification ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {isSubmitting
                  ? "Saving..."
                  : editingCertification
                    ? "Update Certification"
                    : "Add Certification"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default Certifications;