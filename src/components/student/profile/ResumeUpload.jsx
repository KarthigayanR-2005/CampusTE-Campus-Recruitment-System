import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../../context/AuthContext";

import {
  deleteStudentResumeRequest,
  getStudentResumeFileRequest,
  getStudentResumeRequest,
  uploadStudentResumeRequest,
} from "../../../services/studentService";

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

function formatFileSize(
  fileSize
) {
  const size = Number(fileSize);

  if (
    !Number.isFinite(size) ||
    size <= 0
  ) {
    return "Unknown size";
  }

  if (size < 1024) {
    return `${size} bytes`;
  }

  if (
    size <
    1024 * 1024
  ) {
    return `${(
      size / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(2)} MB`;
}

function formatUploadedDate(
  dateValue
) {
  if (!dateValue) {
    return "Unknown date";
  }

  const date =
    new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function ResumeUpload() {
  const navigate =
    useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const fileInputReference =
    useRef(null);

  const messageTimerReference =
    useRef(null);

  const [
    resume,
    setResume,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    isUploading,
    setIsUploading,
  ] = useState(false);

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  const [
    isOpeningFile,
    setIsOpeningFile,
  ] = useState(false);

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

        setSuccessMessage(
          message
        );

        messageTimerReference.current =
          window.setTimeout(
            () => {
              setSuccessMessage(
                ""
              );
            },
            4000
          );
      },
      []
    );

  const loadResume =
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
            await getStudentResumeRequest({
              token,
            });

          setResume(
            response.resume ||
              null
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
              "Unable to retrieve your resume."
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
    loadResume();
  }, [loadResume]);

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

  const openFileSelector =
    () => {
      if (
        isUploading ||
        isDeleting
      ) {
        return;
      }

      fileInputReference
        .current
        ?.click();
    };

  const validateFile = (
    file
  ) => {
    const fileName =
      file.name.toLowerCase();

    const validExtension =
      fileName.endsWith(
        ".pdf"
      );

    const validMimeType =
      file.type ===
        "application/pdf" ||
      file.type === "";

    if (
      !validExtension ||
      !validMimeType
    ) {
      return "Only PDF resume files are allowed.";
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      return "Resume file size cannot exceed 5 MB.";
    }

    if (file.size <= 0) {
      return "The selected resume file is empty.";
    }

    return "";
  };

  const handleFileChange =
    async (event) => {
      const selectedFile =
        event.target.files?.[0];

      event.target.value = "";

      if (!selectedFile) {
        return;
      }

      const validationError =
        validateFile(
          selectedFile
        );

      if (validationError) {
        setErrorMessage(
          validationError
        );

        return;
      }

      setIsUploading(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await uploadStudentResumeRequest({
            token,
            file: selectedFile,
          });

        setResume(
          response.resume
        );

        showSuccessMessage(
          response.message ||
            "Resume uploaded successfully."
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
            "Unable to upload the resume."
        );
      } finally {
        setIsUploading(false);
      }
    };

  const handlePreview =
    async () => {
      if (!resume) {
        return;
      }

      const previewWindow =
        window.open(
          "",
          "_blank"
        );

      if (!previewWindow) {
        setErrorMessage(
          "Allow pop-ups in the browser to preview the resume."
        );

        return;
      }

      setIsOpeningFile(true);
      setErrorMessage("");

      previewWindow.document.write(
        "<p style='font-family: sans-serif; padding: 24px;'>Loading resume...</p>"
      );

      try {
        const resumeBlob =
          await getStudentResumeFileRequest({
            token,
            download: false,
          });

        const objectUrl =
          URL.createObjectURL(
            resumeBlob
          );

        previewWindow.location.href =
          objectUrl;

        window.setTimeout(
          () => {
            URL.revokeObjectURL(
              objectUrl
            );
          },
          60000
        );
      } catch (error) {
        previewWindow.close();

        if (
          handleAuthenticationError(
            error
          )
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to preview the resume."
        );
      } finally {
        setIsOpeningFile(false);
      }
    };

  const handleDownload =
    async () => {
      if (!resume) {
        return;
      }

      setIsOpeningFile(true);
      setErrorMessage("");

      try {
        const resumeBlob =
          await getStudentResumeFileRequest({
            token,
            download: true,
          });

        const objectUrl =
          URL.createObjectURL(
            resumeBlob
          );

        const downloadLink =
          document.createElement(
            "a"
          );

        downloadLink.href =
          objectUrl;

        downloadLink.download =
          resume.originalFileName ||
          "resume.pdf";

        document.body.appendChild(
          downloadLink
        );

        downloadLink.click();
        downloadLink.remove();

        URL.revokeObjectURL(
          objectUrl
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
            "Unable to download the resume."
        );
      } finally {
        setIsOpeningFile(false);
      }
    };

  const handleDelete =
    async () => {
      if (!resume) {
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${resume.originalFileName}"?`
        );

      if (!confirmed) {
        return;
      }

      setIsDeleting(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await deleteStudentResumeRequest({
            token,
          });

        setResume(null);

        showSuccessMessage(
          response.message ||
            "Resume deleted successfully."
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
            "Unable to delete the resume."
        );
      } finally {
        setIsDeleting(false);
      }
    };

  const isBusy =
    isUploading ||
    isDeleting ||
    isOpeningFile;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <input
        ref={
          fileInputReference
        }
        type="file"
        accept=".pdf,application/pdf"
        onChange={
          handleFileChange
        }
        className="hidden"
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Resume
          </h2>

          <p className="mt-2 text-neutral-600">
            Upload your latest resume
            to apply for jobs and
            internships.
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            PDF format only, maximum
            file size 5 MB.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            loadResume({
              showMainLoader:
                false,
            })
          }
          disabled={
            isLoading ||
            isRefreshing ||
            isBusy
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-50"
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
      </div>

      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
        >
          <CheckCircle2
            size={19}
          />

          {successMessage}
        </div>
      )}

      {errorMessage && (
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
        <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-neutral-200">
          <LoaderCircle
            size={36}
            className="animate-spin text-blue-600"
          />

          <h3 className="mt-4 text-lg font-semibold text-neutral-900">
            Loading resume
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            Retrieving your resume
            information.
          </p>
        </div>
      ) : resume ? (
        <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <FileText
                size={40}
                className="text-blue-600"
              />
            </div>

            <h3 className="max-w-full break-words text-xl font-semibold text-neutral-900">
              {
                resume.originalFileName
              }
            </h3>

            <p className="mt-2 text-neutral-500">
              Uploaded on{" "}
              {formatUploadedDate(
                resume.uploadedAt
              )}{" "}
              •{" "}
              {formatFileSize(
                resume.fileSize
              )}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={
                  openFileSelector
                }
                disabled={isBusy}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Upload
                    size={18}
                  />
                )}

                {isUploading
                  ? "Uploading..."
                  : "Replace Resume"}
              </button>

              <button
                type="button"
                onClick={
                  handlePreview
                }
                disabled={isBusy}
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 transition hover:bg-neutral-100 disabled:opacity-50"
              >
                {isOpeningFile ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Eye size={18} />
                )}

                Preview
              </button>

              <button
                type="button"
                onClick={
                  handleDownload
                }
                disabled={isBusy}
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 transition hover:bg-neutral-100 disabled:opacity-50"
              >
                <Download
                  size={18}
                />

                Download
              </button>

              <button
                type="button"
                onClick={
                  handleDelete
                }
                disabled={isBusy}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
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

                {isDeleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <FileText
                size={40}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-xl font-semibold text-neutral-900">
              No resume uploaded
            </h3>

            <p className="mt-2 max-w-lg text-neutral-500">
              Upload your latest PDF
              resume so recruiters and
              placement officers can
              review your profile.
            </p>

            <button
              type="button"
              onClick={
                openFileSelector
              }
              disabled={isUploading}
              className="mt-7 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition hover:scale-[1.02] disabled:opacity-60"
            >
              {isUploading ? (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Upload
                  size={18}
                />
              )}

              {isUploading
                ? "Uploading..."
                : "Upload Resume"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-start gap-4">
          <Sparkles
            size={30}
            className="shrink-0"
          />

          <div>
            <h3 className="text-lg font-semibold">
              AI Resume Analysis
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-indigo-100">
              Soon you will receive an
              AI-generated resume score,
              ATS compatibility, missing
              skills, keyword
              suggestions, grammar
              improvements and
              personalized
              recommendations.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed rounded-xl bg-white px-5 py-2 font-medium text-indigo-700 opacity-70"
            >
              Analyze Resume — Coming
              Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeUpload;