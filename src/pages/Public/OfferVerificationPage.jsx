import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  AlertTriangle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileBadge2,
  FileCheck2,
  FileSearch,
  Hash,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Upload,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import {
  verifyPublicOfferDocumentIntegrityRequest,
  verifyPublicOfferRequest,
} from "../../services/publicOfferVerificationService";

const MAX_PDF_SIZE_BYTES =
  10 * 1024 * 1024;

function formatDate(
  value
) {
  if (!value) {
    return "Not available";
  }

  const parsedDate =
    new Date(value);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return String(value);
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day:
        "2-digit",

      month:
        "long",

      year:
        "numeric",
    }
  );
}

function formatDateTime(
  value
) {
  if (!value) {
    return "Not available";
  }

  const parsedDate =
    new Date(value);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return String(value);
  }

  return parsedDate.toLocaleString(
    "en-IN",
    {
      day:
        "2-digit",

      month:
        "long",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",
    }
  );
}

function formatStatus(
  value
) {
  const normalizedValue =
    String(
      value || ""
    )
      .trim()
      .toLowerCase();

  if (!normalizedValue) {
    return "Unknown";
  }

  return normalizedValue
    .split("_")
    .map(
      (part) =>
        part
          .charAt(0)
          .toUpperCase() +
        part.slice(1)
    )
    .join(" ");
}

function formatFileSize(
  bytes
) {
  const numericBytes =
    Number(bytes);

  if (
    !Number.isFinite(
      numericBytes
    ) ||
    numericBytes < 0
  ) {
    return "";
  }

  if (
    numericBytes <
    1024
  ) {
    return `${numericBytes} B`;
  }

  const kilobytes =
    numericBytes /
    1024;

  if (
    kilobytes <
    1024
  ) {
    return `${kilobytes.toFixed(
      1
    )} KB`;
  }

  const megabytes =
    kilobytes /
    1024;

  return `${megabytes.toFixed(
    2
  )} MB`;
}

function getStatusAppearance({
  state,
  verified,
  offerStatus,
}) {
  const normalizedState =
    String(
      state || ""
    ).toLowerCase();

  const normalizedOfferStatus =
    String(
      offerStatus || ""
    ).toLowerCase();

  if (
    normalizedState ===
    "superseded"
  ) {
    return {
      icon:
        RefreshCw,

      title:
        "Superseded Offer Version",

      badge:
        "Superseded",

      containerClass:
        "border-amber-200 bg-amber-50",

      iconClass:
        "bg-amber-100 text-amber-700",

      badgeClass:
        "bg-amber-100 text-amber-800",
    };
  }

  if (
    normalizedState ===
      "revoked" ||
    normalizedOfferStatus ===
      "withdrawn"
  ) {
    return {
      icon:
        ShieldAlert,

      title:
        normalizedState ===
        "revoked"
          ? "Offer Verification Revoked"
          : "Offer Withdrawn",

      badge:
        normalizedState ===
        "revoked"
          ? "Revoked"
          : "Withdrawn",

      containerClass:
        "border-red-200 bg-red-50",

      iconClass:
        "bg-red-100 text-red-700",

      badgeClass:
        "bg-red-100 text-red-800",
    };
  }

  if (
    normalizedOfferStatus ===
    "expired"
  ) {
    return {
      icon:
        Clock3,

      title:
        "Verified but Expired Offer",

      badge:
        "Expired",

      containerClass:
        "border-orange-200 bg-orange-50",

      iconClass:
        "bg-orange-100 text-orange-700",

      badgeClass:
        "bg-orange-100 text-orange-800",
    };
  }

  if (verified) {
    return {
      icon:
        ShieldCheck,

      title:
        "Verified CampusTE Offer",

      badge:
        "Authentic",

      containerClass:
        "border-emerald-200 bg-emerald-50",

      iconClass:
        "bg-emerald-100 text-emerald-700",

      badgeClass:
        "bg-emerald-100 text-emerald-800",
    };
  }

  return {
    icon:
      XCircle,

    title:
      "Offer Verification Failed",

    badge:
      "Invalid",

    containerClass:
      "border-red-200 bg-red-50",

    iconClass:
      "bg-red-100 text-red-700",

    badgeClass:
      "bg-red-100 text-red-800",
  };
}

function VerificationDetail({
  icon: Icon,
  label,
  value,
  monospace = false,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
          <Icon
            aria-hidden="true"
            className="h-4 w-4"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>

          <p
            className={`mt-1 break-words text-sm font-semibold text-slate-900 ${
              monospace
                ? "font-mono"
                : ""
            }`}
          >
            {value ||
              "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}

function SecurityCheck({
  passed,
  label,
  description,
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
      {passed ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 flex-none text-red-600" />
      )}

      <div>
        <p className="text-sm font-semibold text-slate-900">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="rounded-full bg-blue-50 p-4 text-blue-700">
        <RefreshCw
          aria-hidden="true"
          className="h-8 w-8 animate-spin"
        />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900">
        Verifying offer
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
        CampusTE is checking the secure verification token and current offer status.
      </p>
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}) {
  const errorData =
    error?.data || {};

  const message =
    errorData.message ||
    error?.message ||
    "Unable to verify this offer.";

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">
      <div className="rounded-full bg-red-50 p-4 text-red-700">
        <AlertTriangle
          aria-hidden="true"
          className="h-9 w-9"
        />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-slate-900">
        Verification unsuccessful
      </h2>

      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
        {message}
      </p>

      <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500">
        Check that the complete QR link was opened and that the token was not modified.
      </p>

      <button
        type="button"
        onClick={
          onRetry
        }
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <RefreshCw className="h-4 w-4" />

        Try Again
      </button>
    </div>
  );
}

function DocumentIntegritySection({
  publicId,
  token,
}) {
  const fileInputRef =
    useRef(null);

  const [
    selectedFile,
    setSelectedFile,
  ] =
    useState(null);

  const [
    integrityResult,
    setIntegrityResult,
  ] =
    useState(null);

  const [
    integrityError,
    setIntegrityError,
  ] =
    useState("");

  const [
    isVerifying,
    setIsVerifying,
  ] =
    useState(false);

  function clearSelectedFile() {
    setSelectedFile(
      null
    );

    setIntegrityResult(
      null
    );

    setIntegrityError(
      ""
    );

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  }

  function handleFileSelection(
    event
  ) {
    const file =
      event.target.files?.[0];

    setIntegrityResult(
      null
    );

    setIntegrityError(
      ""
    );

    if (!file) {
      setSelectedFile(
        null
      );

      return;
    }

    const isPdf =
      file.type ===
        "application/pdf" ||
      file.name
        .toLowerCase()
        .endsWith(
          ".pdf"
        );

    if (!isPdf) {
      event.target.value =
        "";

      setSelectedFile(
        null
      );

      setIntegrityError(
        "Only PDF documents can be verified."
      );

      return;
    }

    if (
      file.size >
      MAX_PDF_SIZE_BYTES
    ) {
      event.target.value =
        "";

      setSelectedFile(
        null
      );

      setIntegrityError(
        "The PDF must be 10 MB or smaller."
      );

      return;
    }

    setSelectedFile(
      file
    );
  }

  async function handleIntegrityVerification() {
    if (!selectedFile) {
      setIntegrityError(
        "Select the offer-letter PDF first."
      );

      return;
    }

    setIsVerifying(
      true
    );

    setIntegrityError(
      ""
    );

    setIntegrityResult(
      null
    );

    try {
      const result =
        await verifyPublicOfferDocumentIntegrityRequest({
          publicId,
          token,

          file:
            selectedFile,
        });

      setIntegrityResult(
        result
      );
    } catch (error) {
      setIntegrityError(
        error?.data
          ?.message ||
        error?.message ||
        "Unable to verify the PDF."
      );
    } finally {
      setIsVerifying(
        false
      );
    }
  }

  const integrityVerified =
    Boolean(
      integrityResult
        ?.integrityVerified
    );

  const exactDocumentMatch =
    Boolean(
      integrityResult
        ?.exactDocumentMatch
    );

  const digitalSignatureValid =
    Boolean(
      integrityResult
        ?.digitalSignatureValid
    );

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-100 p-2.5 text-blue-700">
            <FileSearch className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Document Integrity Verification
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              Upload the offer-letter PDF to verify that it exactly matches the document issued by CampusTE.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <input
          ref={
            fileInputRef
          }
          type="file"
          accept="application/pdf,.pdf"
          onChange={
            handleFileSelection
          }
          className="hidden"
        />

        {!selectedFile ? (
          <button
            type="button"
            onClick={() =>
              fileInputRef
                .current
                ?.click()
            }
            className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-9 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="rounded-full bg-blue-100 p-3 text-blue-700">
              <Upload className="h-6 w-6" />
            </div>

            <p className="mt-4 text-sm font-bold text-slate-900">
              Select Offer PDF
            </p>

            <p className="mt-1 text-xs text-slate-500">
              PDF only, maximum 10 MB
            </p>
          </button>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-lg bg-red-50 p-2.5 text-red-600">
                  <FileBadge2 className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {formatFileSize(
                      selectedFile.size
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  clearSelectedFile
                }
                disabled={
                  isVerifying
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Remove selected PDF"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {integrityError && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-none" />

            <p className="text-sm leading-6">
              {integrityError}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={
            handleIntegrityVerification
          }
          disabled={
            !selectedFile ||
            isVerifying
          }
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />

              Verifying Document...
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />

              Verify Document Integrity
            </>
          )}
        </button>

        {integrityResult && (
          <div
            className={`mt-6 rounded-xl border p-5 ${
              integrityVerified
                ? "border-emerald-200 bg-emerald-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`rounded-xl p-3 ${
                  integrityVerified
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {integrityVerified ? (
                  <ShieldCheck className="h-7 w-7" />
                ) : (
                  <ShieldX className="h-7 w-7" />
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  {integrityVerified
                    ? "Authentic & Untampered"
                    : "Document Integrity Check Failed"}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {integrityResult
                    ?.message}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <SecurityCheck
                passed={
                  exactDocumentMatch
                }
                label="SHA-256 Fingerprint"
                description={
                  exactDocumentMatch
                    ? "The uploaded PDF exactly matches the fingerprint of the CampusTE-issued file."
                    : "The uploaded PDF does not match the fingerprint stored for this offer version."
                }
              />

              <SecurityCheck
                passed={
                  digitalSignatureValid
                }
                label="Ed25519 Digital Signature"
                description={
                  digitalSignatureValid
                    ? "The stored document fingerprint has a valid CampusTE cryptographic signature."
                    : "The CampusTE digital signature could not be validated."
                }
              />
            </div>

            {integrityResult
              ?.verification && (
              <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Verification ID
                  </p>

                  <p className="mt-1 break-all font-mono text-xs font-semibold text-slate-900">
                    {
                      integrityResult
                        .verification
                        .publicId
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Document Version
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Version{" "}
                    {
                      integrityResult
                        .verification
                        .documentVersion
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Signature Algorithm
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {
                      integrityResult
                        .verification
                        .signatureAlgorithm ||
                      "Not available"
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Signing Key
                  </p>

                  <p className="mt-1 break-all font-mono text-xs font-semibold text-slate-900">
                    {
                      integrityResult
                        .verification
                        .signingKeyId ||
                      "Not available"
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 rounded-lg bg-slate-50 p-4">
          <p className="text-xs leading-5 text-slate-500">
            The uploaded PDF is processed only for verification. CampusTE calculates its SHA-256 fingerprint in memory and compares it with the registered document. The uploaded verification copy is not permanently stored.
          </p>
        </div>
      </div>
    </section>
  );
}

function OfferVerificationPage() {
  const {
    publicId,
  } =
    useParams();

  const [
    searchParams,
  ] =
    useSearchParams();

  const token =
    searchParams.get(
      "token"
    ) || "";

  const [
    verificationResult,
    setVerificationResult,
  ] =
    useState(null);

  const [
    error,
    setError,
  ] =
    useState(null);

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(true);

  const [
    retryCount,
    setRetryCount,
  ] =
    useState(0);

  useEffect(
    () => {
      let isActive =
        true;

      async function loadVerification() {
        setIsLoading(
          true
        );

        setError(
          null
        );

        try {
          const result =
            await verifyPublicOfferRequest({
              publicId,
              token,
            });

          if (isActive) {
            setVerificationResult(
              result
            );
          }
        } catch (
          requestError
        ) {
          if (isActive) {
            setVerificationResult(
              null
            );

            setError(
              requestError
            );
          }
        } finally {
          if (isActive) {
            setIsLoading(
              false
            );
          }
        }
      }

      loadVerification();

      return () => {
        isActive =
          false;
      };
    },
    [
      publicId,
      token,
      retryCount,
    ]
  );

  const verification =
    verificationResult
      ?.verification ||
    null;

  const appearance =
    useMemo(
      () =>
        getStatusAppearance({
          state:
            verificationResult
              ?.state,

          verified:
            Boolean(
              verificationResult
                ?.verified
            ),

          offerStatus:
            verification
              ?.offerStatus,
        }),
      [
        verificationResult,
        verification,
      ]
    );

  const StatusIcon =
    appearance.icon;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-700 p-2.5 text-white">
              <FileCheck2 className="h-6 w-6" />
            </div>

            <div>
              <p className="text-lg font-bold text-slate-950">
                CampusTE
              </p>

              <p className="text-xs text-slate-500">
                Secure Offer Verification
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:flex">
            <ShieldCheck className="h-4 w-4" />

            Public verification
          </div>
        </header>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              error={
                error
              }
              onRetry={() =>
                setRetryCount(
                  (
                    previousCount
                  ) =>
                    previousCount +
                    1
                )
              }
            />
          ) : (
            <>
              <div
                className={`border-b p-6 sm:p-8 ${appearance.containerClass}`}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-2xl p-3 ${appearance.iconClass}`}
                    >
                      <StatusIcon className="h-8 w-8" />
                    </div>

                    <div>
                      <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                        {appearance.title}
                      </h1>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
                        {verificationResult
                          ?.message ||
                          "CampusTE completed the offer verification check."}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-bold ${appearance.badgeClass}`}
                  >
                    {appearance.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-slate-950">
                    Verified offer information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Only non-sensitive information is shown on this public page.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <VerificationDetail
                    icon={
                      Building2
                    }
                    label="Company"
                    value={
                      verification
                        ?.companyName
                    }
                  />

                  <VerificationDetail
                    icon={
                      UserRound
                    }
                    label="Candidate"
                    value={
                      verification
                        ?.candidateName
                    }
                  />

                  <VerificationDetail
                    icon={
                      BriefcaseBusiness
                    }
                    label="Designation"
                    value={
                      verification
                        ?.designation
                    }
                  />

                  <VerificationDetail
                    icon={
                      FileBadge2
                    }
                    label="Job Title"
                    value={
                      verification
                        ?.jobTitle
                    }
                  />

                  <VerificationDetail
                    icon={
                      CheckCircle2
                    }
                    label="Offer Status"
                    value={formatStatus(
                      verification
                        ?.offerStatus
                    )}
                  />

                  <VerificationDetail
                    icon={
                      FileCheck2
                    }
                    label="Document Version"
                    value={`Version ${
                      verification
                        ?.documentVersion ||
                      1
                    }`}
                  />

                  <VerificationDetail
                    icon={
                      CalendarDays
                    }
                    label="Issued At"
                    value={formatDateTime(
                      verification
                        ?.issuedAt
                    )}
                  />

                  <VerificationDetail
                    icon={
                      CalendarDays
                    }
                    label="Joining Date"
                    value={formatDate(
                      verification
                        ?.joiningDate
                    )}
                  />

                  <VerificationDetail
                    icon={
                      Clock3
                    }
                    label="Offer Expiry Date"
                    value={formatDate(
                      verification
                        ?.offerExpiryDate
                    )}
                  />

                  <div className="sm:col-span-2 lg:col-span-3">
                    <VerificationDetail
                      icon={
                        Hash
                      }
                      label="Verification ID"
                      value={
                        verification
                          ?.publicId ||
                        publicId
                      }
                      monospace
                    />
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-blue-700" />

                    <div>
                      <p className="text-sm font-bold text-blue-950">
                        QR authenticity verification passed
                      </p>

                      <p className="mt-1 text-sm leading-6 text-blue-900">
                        The secure token embedded in the QR code matched a CampusTE verification record. To confirm that the actual PDF has not been changed, perform the document integrity verification below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {!isLoading &&
          !error &&
          verificationResult && (
            <DocumentIntegritySection
              publicId={
                publicId
              }
              token={
                token
              }
            />
          )}

        <footer className="mt-6 text-center text-xs leading-5 text-slate-500">
          CampusTE does not publicly display compensation, private contact details, uploaded signature images, authentication tokens or internal storage paths.
        </footer>
      </div>
    </main>
  );
}

export default OfferVerificationPage;