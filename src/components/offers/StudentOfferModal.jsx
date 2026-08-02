import {
  useEffect,
  useState,
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileSignature,
  IndianRupee,
  LoaderCircle,
  MapPin,
  Send,
  User,
  X,
  XCircle,
} from "lucide-react";

import {
  getStudentOfferLetterRequest,
  getStudentOfferRequest,
  respondToStudentOfferRequest,
} from "../../services/offerService.js";

const statusStyles = {
  sent:
    "border-blue-200 bg-blue-50 text-blue-700",

  accepted:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  declined:
    "border-rose-200 bg-rose-50 text-rose-700",

  withdrawn:
    "border-amber-200 bg-amber-50 text-amber-700",

  expired:
    "border-orange-200 bg-orange-50 text-orange-700",

  draft:
    "border-neutral-200 bg-neutral-100 text-neutral-700",
};

const statusLabels = {
  sent: "Awaiting Response",
  accepted: "Accepted",
  declined: "Declined",
  withdrawn: "Withdrawn",
  expired: "Expired",
  draft: "Draft",
};

function formatDate(value) {
  if (!value) {
    return "Not provided";
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

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
}

function formatDateTime(value) {
  if (!value) {
    return "Not available";
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
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function formatMoney(
  amount,
  currency,
  period
) {
  const numericAmount =
    Number(amount);

  if (
    !Number.isFinite(
      numericAmount
    )
  ) {
    return "Not disclosed";
  }

  let formattedAmount;

  try {
    formattedAmount =
      new Intl.NumberFormat(
        "en-IN",
        {
          style: "currency",

          currency:
            currency || "INR",

          maximumFractionDigits: 0,
        }
      ).format(
        numericAmount
      );
  } catch {
    formattedAmount =
      `${
        currency || "INR"
      } ${numericAmount}`;
  }

  return `${formattedAmount} ${
    period === "monthly"
      ? "per month"
      : "per year"
  }`;
}

function formatFileSize(
  sizeBytes
) {
  const size =
    Number(sizeBytes);

  if (
    !Number.isFinite(size) ||
    size <= 0
  ) {
    return "Size not available";
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

function StudentOfferModal({
  token,
  application,
  offer,
  onClose,
  onOfferChanged,
  onSuccess,
  onError,
}) {
  const [
    currentOffer,
    setCurrentOffer,
  ] = useState(
    offer || null
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isResponding,
    setIsResponding,
  ] = useState(false);

  const [
    isLetterLoading,
    setIsLetterLoading,
  ] = useState(false);

  const [
    declineMode,
    setDeclineMode,
  ] = useState(false);

  const [
    responseNote,
    setResponseNote,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  useEffect(() => {
    let active = true;

    async function loadOffer() {
      if (
        !token ||
        !offer?.offerId
      ) {
        setCurrentOffer(
          offer || null
        );

        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getStudentOfferRequest({
            token,

            offerId:
              offer.offerId,
          });

        if (active) {
          setCurrentOffer(
            response.offer
          );
        }
      } catch (error) {
        if (active) {
          setErrorMessage(
            error.message ||
              "Unable to retrieve the offer."
          );

          onError?.(
            error
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadOffer();

    return () => {
      active = false;
    };
  }, [
    token,
    offer,
    onError,
  ]);

  if (!offer) {
    return null;
  }

  const offerStatus =
    currentOffer?.status ||
    offer.status;

  const canRespond =
    offerStatus === "sent";

  const hasOfferLetter =
    Boolean(
      currentOffer
        ?.offerLetter
        ?.available
    );

  const isBusy =
    isLoading ||
    isResponding ||
    isLetterLoading;

  const handleRequestError = (
    error,
    fallbackMessage
  ) => {
    const message =
      error?.message ||
      fallbackMessage;

    setErrorMessage(
      message
    );

    onError?.(
      error
    );
  };

  const handleOpenOfferLetter =
    async (
      download
    ) => {
      if (
        !currentOffer?.offerId
      ) {
        setErrorMessage(
          "Offer information is unavailable."
        );

        return;
      }

      if (!hasOfferLetter) {
        setErrorMessage(
          "No offer-letter PDF is available for this offer."
        );

        return;
      }

      let previewWindow =
        null;

      if (!download) {
        previewWindow =
          window.open(
            "",
            "_blank"
          );
      }

      setIsLetterLoading(
        true
      );

      setErrorMessage("");

      try {
        const result =
          await getStudentOfferLetterRequest({
            token,

            offerId:
              currentOffer.offerId,

            download,
          });

        const objectUrl =
          URL.createObjectURL(
            result.blob
          );

        if (download) {
          const anchor =
            document.createElement(
              "a"
            );

          anchor.href =
            objectUrl;

          anchor.download =
            result.fileName ||
            currentOffer
              .offerLetter
              ?.originalFileName ||
            "offer-letter.pdf";

          document.body
            .appendChild(
              anchor
            );

          anchor.click();
          anchor.remove();
        } else if (
          previewWindow
        ) {
          previewWindow
            .location.href =
            objectUrl;
        } else {
          window.open(
            objectUrl,
            "_blank",
            "noopener,noreferrer"
          );
        }

        window.setTimeout(
          () => {
            URL.revokeObjectURL(
              objectUrl
            );
          },
          60000
        );
      } catch (error) {
        if (
          previewWindow
        ) {
          previewWindow.close();
        }

        handleRequestError(
          error,
          "Unable to retrieve the offer letter."
        );
      } finally {
        setIsLetterLoading(
          false
        );
      }
    };

  const respondToOffer =
    async (
      status,
      note = ""
    ) => {
      if (
        !currentOffer?.offerId
      ) {
        setErrorMessage(
          "Offer information is unavailable."
        );

        return;
      }

      const actionText =
        status === "accepted"
          ? "accept"
          : "decline";

      const confirmed =
        window.confirm(
          `Are you sure you want to ${actionText} this offer?`
        );

      if (!confirmed) {
        return;
      }

      setIsResponding(true);
      setErrorMessage("");

      try {
        const response =
          await respondToStudentOfferRequest({
            token,

            offerId:
              currentOffer.offerId,

            status,

            note:
              note.trim(),
          });

        setCurrentOffer(
          response.offer
        );

        setDeclineMode(false);
        setResponseNote("");

        onOfferChanged?.(
          response.offer
        );

        onSuccess?.(
          response.message ||
            (
              status ===
                "accepted"
                ? "Offer accepted successfully."
                : "Offer declined successfully."
            )
        );
      } catch (error) {
        handleRequestError(
          error,
          "Unable to respond to the offer."
        );
      } finally {
        setIsResponding(false);
      }
    };

  const handleAccept = () => {
    respondToOffer(
      "accepted",
      responseNote
    );
  };

  const handleDecline = () => {
    if (
      responseNote
        .trim()
        .length > 1000
    ) {
      setErrorMessage(
        "Decline reason cannot exceed 1000 characters."
      );

      return;
    }

    respondToOffer(
      "declined",
      responseNote
    );
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-950/65 p-4 backdrop-blur-sm">
      <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white sm:p-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <FileSignature
                  size={25}
                />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                  Job Offer
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {currentOffer
                    ?.designation ||
                    application?.job
                      ?.jobTitle ||
                    "Employment Offer"}
                </h2>
              </div>
            </div>

            <p className="mt-4 text-blue-100">
              {currentOffer
                ?.company
                ?.companyName ||
                application
                  ?.company
                  ?.companyName ||
                "Company"}
            </p>
          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              isBusy
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={21} />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-3 border-b border-blue-200 bg-blue-50 px-6 py-4 font-semibold text-blue-700">
            <LoaderCircle
              size={19}
              className="animate-spin"
            />

            Loading complete offer
            details
          </div>
        )}

        {errorMessage && (
          <div className="flex items-start gap-3 border-b border-rose-200 bg-rose-50 px-6 py-4 font-semibold text-rose-700 sm:px-8">
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
                  setErrorMessage("")
                }
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {currentOffer && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 sm:px-8">
              <div>
                <p className="text-sm text-neutral-500">
                  Offer status
                </p>

                <span
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                    statusStyles[
                      offerStatus
                    ] ||
                    statusStyles.draft
                  }`}
                >
                  {statusLabels[
                    offerStatus
                  ] ||
                    offerStatus}
                </span>
              </div>

              <div className="text-right">
                <p className="text-sm text-neutral-500">
                  Offer sent
                </p>

                <p className="mt-1 font-semibold text-neutral-900">
                  {formatDateTime(
                    currentOffer
                      .sentAt
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InformationCard
                  icon={Building2}
                  title="Company"
                  value={
                    currentOffer
                      .company
                      ?.companyName
                  }
                />

                <InformationCard
                  icon={
                    BriefcaseBusiness
                  }
                  title="Designation"
                  value={
                    currentOffer
                      .designation
                  }
                />

                <InformationCard
                  icon={User}
                  title="Employment Type"
                  value={
                    currentOffer
                      .employmentType ||
                    currentOffer.job
                      ?.employmentType
                  }
                />

                <InformationCard
                  icon={
                    IndianRupee
                  }
                  title="Compensation"
                  value={formatMoney(
                    currentOffer
                      .compensation
                      ?.amount,

                    currentOffer
                      .compensation
                      ?.currency,

                    currentOffer
                      .compensation
                      ?.period
                  )}
                />

                <InformationCard
                  icon={
                    CalendarDays
                  }
                  title="Joining Date"
                  value={formatDate(
                    currentOffer
                      .joiningDate
                  )}
                />

                <InformationCard
                  icon={MapPin}
                  title="Work Location"
                  value={
                    currentOffer
                      .workLocation
                  }
                />

                <InformationCard
                  icon={Clock3}
                  title="Offer Expiry"
                  value={formatDate(
                    currentOffer
                      .offerExpiryDate
                  )}
                />

                <InformationCard
                  icon={Send}
                  title="Probation Period"
                  value={
                    currentOffer
                      .probationPeriod
                  }
                />

                <InformationCard
                  icon={
                    FileSignature
                  }
                  title="Offer ID"
                  value={
                    currentOffer
                      .offerId
                  }
                />
              </section>

              <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    {hasOfferLetter ? (
                      <FileCheck2
                        size={22}
                      />
                    ) : (
                      <FileSignature
                        size={22}
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900">
                      Official Offer Letter
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      Review the official
                      offer-letter PDF
                      before accepting or
                      declining the offer.
                    </p>
                  </div>
                </div>

                {hasOfferLetter ? (
                  <div className="mt-5 rounded-2xl border border-indigo-200 bg-white p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <FileCheck2
                            size={22}
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold text-neutral-900">
                            {currentOffer
                              .offerLetter
                              ?.originalFileName ||
                              "Offer Letter.pdf"}
                          </p>

                          <p className="mt-1 text-sm text-neutral-500">
                            {formatFileSize(
                              currentOffer
                                .offerLetter
                                ?.sizeBytes
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenOfferLetter(
                              false
                            )
                          }
                          disabled={
                            isBusy
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 font-semibold text-indigo-700 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isLetterLoading ? (
                            <LoaderCircle
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <Eye
                              size={17}
                            />
                          )}

                          Preview
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleOpenOfferLetter(
                              true
                            )
                          }
                          disabled={
                            isBusy
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isLetterLoading ? (
                            <LoaderCircle
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <Download
                              size={17}
                            />
                          )}

                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-amber-700"
                      />

                      <div>
                        <p className="font-bold text-amber-900">
                          Offer letter unavailable
                        </p>

                        <p className="mt-1 text-sm leading-6 text-amber-700">
                          The Recruiter has
                          not attached an
                          offer-letter PDF
                          to this offer.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <h3 className="text-lg font-bold text-neutral-900">
                  Offer Terms
                </h3>

                <p className="mt-3 whitespace-pre-line leading-7 text-neutral-600">
                  {currentOffer.terms ||
                    "No additional terms were provided."}
                </p>
              </section>

              {Array.isArray(
                currentOffer.history
              ) &&
                currentOffer.history
                  .length > 0 && (
                  <section>
                    <h3 className="text-lg font-bold text-neutral-900">
                      Offer History
                    </h3>

                    <div className="mt-4 space-y-4">
                      {currentOffer.history.map(
                        (
                          history,
                          index
                        ) => (
                          <div
                            key={
                              history.historyId ||
                              index
                            }
                            className="flex gap-3 rounded-2xl border border-neutral-200 p-4"
                          >
                            <CheckCircle2
                              size={19}
                              className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            <div>
                              <p className="font-semibold capitalize text-neutral-900">
                                {
                                  history.status
                                }
                              </p>

                              <p className="mt-1 text-sm text-neutral-600">
                                {history.note ||
                                  "Offer status updated."}
                              </p>

                              <p className="mt-1 text-xs text-neutral-400">
                                {formatDateTime(
                                  history.createdAt
                                )}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                )}

              {offerStatus ===
                "accepted" && (
                <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={24}
                      className="mt-0.5 shrink-0 text-emerald-700"
                    />

                    <div>
                      <h3 className="font-bold text-emerald-900">
                        Offer Accepted
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-emerald-700">
                        You accepted this
                        employment offer.
                        The Recruiter has
                        been notified.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {offerStatus ===
                "declined" && (
                <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
                  <div className="flex items-start gap-3">
                    <XCircle
                      size={24}
                      className="mt-0.5 shrink-0 text-rose-700"
                    />

                    <div>
                      <h3 className="font-bold text-rose-900">
                        Offer Declined
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-rose-700">
                        You declined this
                        employment offer.
                        This response
                        cannot be changed.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {offerStatus ===
                "withdrawn" && (
                <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={24}
                      className="mt-0.5 shrink-0 text-amber-700"
                    />

                    <div>
                      <h3 className="font-bold text-amber-900">
                        Offer Withdrawn
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-amber-700">
                        The Recruiter has
                        withdrawn this
                        offer. You can no
                        longer respond.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {offerStatus ===
                "expired" && (
                <section className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                  <div className="flex items-start gap-3">
                    <Clock3
                      size={24}
                      className="mt-0.5 shrink-0 text-orange-700"
                    />

                    <div>
                      <h3 className="font-bold text-orange-900">
                        Offer Expired
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-orange-700">
                        The response
                        deadline has
                        passed. This offer
                        can no longer be
                        accepted or
                        declined.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {canRespond &&
                declineMode && (
                  <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                    <label className="block font-bold text-rose-900">
                      Decline Reason
                    </label>

                    <p className="mt-1 text-sm text-rose-700">
                      This is optional
                      and will be visible
                      to the Recruiter.
                    </p>

                    <textarea
                      rows={4}
                      maxLength={1000}
                      value={
                        responseNote
                      }
                      onChange={(
                        event
                      ) =>
                        setResponseNote(
                          event.target
                            .value
                        )
                      }
                      disabled={
                        isResponding
                      }
                      placeholder="Enter your reason for declining the offer"
                      className="mt-4 w-full resize-none rounded-xl border border-rose-300 bg-white px-4 py-3 outline-none focus:border-rose-600 focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <p className="mt-2 text-right text-xs text-rose-500">
                      {
                        responseNote.length
                      }
                      /1000
                    </p>
                  </section>
                )}
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={
                  onClose
                }
                disabled={
                  isBusy
                }
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Close
              </button>

              {canRespond &&
                declineMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setDeclineMode(
                        false
                      );

                      setResponseNote(
                        ""
                      );

                      setErrorMessage(
                        ""
                      );
                    }}
                    disabled={
                      isBusy
                    }
                    className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel Decline
                  </button>
                )}

              {canRespond &&
                !declineMode && (
                  <button
                    type="button"
                    onClick={() =>
                      setDeclineMode(
                        true
                      )
                    }
                    disabled={
                      isBusy
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-5 py-3 font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle
                      size={18}
                    />

                    Decline Offer
                  </button>
                )}

              {canRespond &&
                declineMode && (
                  <button
                    type="button"
                    onClick={
                      handleDecline
                    }
                    disabled={
                      isBusy
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isResponding ? (
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <XCircle
                        size={18}
                      />
                    )}

                    Confirm Decline
                  </button>
                )}

              {canRespond &&
                !declineMode && (
                  <button
                    type="button"
                    onClick={
                      handleAccept
                    }
                    disabled={
                      isBusy
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-semibold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isResponding ? (
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <CheckCircle2
                        size={18}
                      />
                    )}

                    Accept Offer
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InformationCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
        <Icon size={17} />

        {title}
      </p>

      <p className="mt-2 font-bold text-neutral-900">
        {value ||
          "Not provided"}
      </p>
    </div>
  );
}

export default StudentOfferModal;