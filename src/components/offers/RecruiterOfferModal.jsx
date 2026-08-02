import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  FileCheck2,
  FileSignature,
  IndianRupee,
  LoaderCircle,
  MapPin,
  Send,
  Trash2,
  Upload,
  User,
  X,
  XCircle,
} from "lucide-react";

import {
  createRecruiterOfferRequest,
  deleteRecruiterOfferLetterRequest,
  getRecruiterOfferLetterRequest,
  sendRecruiterOfferRequest,
  updateRecruiterOfferRequest,
  uploadRecruiterOfferLetterRequest,
  withdrawRecruiterOfferRequest,
} from "../../services/offerService.js";

const MAX_OFFER_LETTER_SIZE =
  5 * 1024 * 1024;

const offerStatusStyles = {
  draft:
    "border-neutral-300 bg-neutral-100 text-neutral-700",

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
};

const offerStatusLabels = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  declined: "Declined",
  withdrawn: "Withdrawn",
  expired: "Expired",
};

function getToday() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

function createInitialForm(
  applicant,
  offer
) {
  return {
    designation:
      offer?.designation ||
      applicant?.job
        ?.jobTitle ||
      "",

    salaryAmount:
      offer?.compensation
        ?.amount || "",

    currencyCode:
      offer?.compensation
        ?.currency ||
      "INR",

    salaryPeriod:
      offer?.compensation
        ?.period ||
      "annual",

    joiningDate:
      offer?.joiningDate ||
      "",

    workLocation:
      offer?.workLocation ||
      [
        applicant?.job?.city,
        applicant?.job
          ?.country,
      ]
        .filter(Boolean)
        .join(", "),

    offerExpiryDate:
      offer?.offerExpiryDate ||
      "",

    employmentType:
      offer?.employmentType ||
      applicant?.job
        ?.employmentType ||
      "",

    probationPeriod:
      offer?.probationPeriod ||
      "",

    terms:
      offer?.terms ||
      "",
  };
}

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

function formatMoney({
  amount,
  currency,
  period,
}) {
  const numericAmount =
    Number(amount);

  if (
    !Number.isFinite(
      numericAmount
    )
  ) {
    return "Not provided";
  }

  let formattedAmount;

  try {
    formattedAmount =
      new Intl.NumberFormat(
        "en-IN",
        {
          style:
            "currency",

          currency:
            currency ||
            "INR",

          maximumFractionDigits:
            0,
        }
      ).format(
        numericAmount
      );
  } catch {
    formattedAmount =
      `${
        currency ||
        "INR"
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
    !Number.isFinite(
      size
    ) ||
    size <= 0
  ) {
    return "Size not available";
  }

  if (
    size < 1024
  ) {
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

function RecruiterOfferModal({
  token,
  applicant,
  offer,
  onClose,
  onOfferChanged,
  onSuccess,
  onError,
}) {
  const fileInputRef =
    useRef(null);

  const [
    currentOffer,
    setCurrentOffer,
  ] = useState(
    offer || null
  );

  const [
    form,
    setForm,
  ] = useState(
    createInitialForm(
      applicant,
      offer
    )
  );

  const [
    selectedOfferLetter,
    setSelectedOfferLetter,
  ] = useState(null);

  const [
    isWorking,
    setIsWorking,
  ] = useState(false);

  const [
    isLetterWorking,
    setIsLetterWorking,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const minimumDate =
    useMemo(
      () => getToday(),
      []
    );

  useEffect(() => {
    setCurrentOffer(
      offer || null
    );

    setForm(
      createInitialForm(
        applicant,
        offer
      )
    );

    setSelectedOfferLetter(
      null
    );

    setErrorMessage("");

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  }, [
    applicant,
    offer,
  ]);

  if (!applicant) {
    return null;
  }

  const offerStatus =
    currentOffer?.status ||
    "draft";

  const isDraft =
    !currentOffer ||
    offerStatus ===
      "draft";

  const isBusy =
    isWorking ||
    isLetterWorking;

  const hasOfferLetter =
    Boolean(
      currentOffer
        ?.offerLetter
        ?.available
    );

  const canModifyOfferLetter =
    Boolean(
      currentOffer
    ) &&
    offerStatus ===
      "draft";

  const canWithdraw =
    Boolean(
      currentOffer
    ) &&
    [
      "draft",
      "sent",
    ].includes(
      offerStatus
    );

  const updateField = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (
        previousForm
      ) => ({
        ...previousForm,

        [name]:
          name ===
          "currencyCode"
            ? value
                .toUpperCase()
                .slice(0, 3)
            : value,
      })
    );
  };

  const updateOfferState = (
    updatedOffer
  ) => {
    if (!updatedOffer) {
      return;
    }

    setCurrentOffer(
      updatedOffer
    );

    setForm(
      createInitialForm(
        applicant,
        updatedOffer
      )
    );

    onOfferChanged?.(
      updatedOffer
    );
  };

  const mergeOfferLetter = (
    offerLetter
  ) => {
    if (!currentOffer) {
      return;
    }

    const updatedOffer = {
      ...currentOffer,

      offerLetter: {
        available:
          Boolean(
            offerLetter
              ?.available
          ),

        originalFileName:
          offerLetter
            ?.originalFileName ||
          "",

        mimeType:
          offerLetter
            ?.mimeType ||
          "",

        sizeBytes:
          Number(
            offerLetter
              ?.sizeBytes ||
              0
          ),
      },
    };

    updateOfferState(
      updatedOffer
    );
  };

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

  const validateForm = () => {
    const designation =
      form.designation.trim();

    const salaryAmount =
      Number(
        form.salaryAmount
      );

    const currencyCode =
      form.currencyCode
        .trim()
        .toUpperCase();

    const workLocation =
      form.workLocation
        .trim();

    if (
      designation.length <
      2
    ) {
      return "Enter a valid offered designation.";
    }

    if (
      designation.length >
      150
    ) {
      return "Designation cannot exceed 150 characters.";
    }

    if (
      !Number.isFinite(
        salaryAmount
      ) ||
      salaryAmount <= 0
    ) {
      return "Enter a valid salary amount.";
    }

    if (
      !/^[A-Z]{3}$/.test(
        currencyCode
      )
    ) {
      return "Currency code must contain exactly three letters.";
    }

    if (
      ![
        "annual",
        "monthly",
      ].includes(
        form.salaryPeriod
      )
    ) {
      return "Select a valid salary period.";
    }

    if (
      !form.offerExpiryDate
    ) {
      return "Select the offer expiry date.";
    }

    if (
      form.offerExpiryDate <
      minimumDate
    ) {
      return "Offer expiry date cannot be in the past.";
    }

    if (
      !form.joiningDate
    ) {
      return "Select the joining date.";
    }

    if (
      form.joiningDate <
      minimumDate
    ) {
      return "Joining date cannot be in the past.";
    }

    if (
      form.offerExpiryDate >
      form.joiningDate
    ) {
      return "Offer expiry date must be on or before the joining date.";
    }

    if (
      workLocation.length <
      2
    ) {
      return "Enter a valid work location.";
    }

    if (
      workLocation.length >
      200
    ) {
      return "Work location cannot exceed 200 characters.";
    }

    if (
      form.employmentType
        .trim()
        .length >
      80
    ) {
      return "Employment type cannot exceed 80 characters.";
    }

    if (
      form.probationPeriod
        .trim()
        .length >
      100
    ) {
      return "Probation period cannot exceed 100 characters.";
    }

    if (
      form.terms.length >
      10000
    ) {
      return "Offer terms cannot exceed 10,000 characters.";
    }

    return "";
  };

  const getOfferPayload =
    () => ({
      designation:
        form.designation
          .trim(),

      salaryAmount:
        Number(
          form.salaryAmount
        ),

      currencyCode:
        form.currencyCode
          .trim()
          .toUpperCase(),

      salaryPeriod:
        form.salaryPeriod,

      joiningDate:
        form.joiningDate,

      workLocation:
        form.workLocation
          .trim(),

      offerExpiryDate:
        form.offerExpiryDate,

      employmentType:
        form.employmentType
          .trim(),

      probationPeriod:
        form.probationPeriod
          .trim(),

      terms:
        form.terms
          .trim(),
    });

  const handleSaveDraft =
    async (event) => {
      event.preventDefault();

      const validationError =
        validateForm();

      if (
        validationError
      ) {
        setErrorMessage(
          validationError
        );

        return;
      }

      setIsWorking(true);
      setErrorMessage("");

      try {
        const offerData =
          getOfferPayload();

        const response =
          currentOffer
            ? await updateRecruiterOfferRequest({
                token,

                offerId:
                  currentOffer
                    .offerId,

                offerData,
              })
            : await createRecruiterOfferRequest({
                token,

                applicationId:
                  applicant
                    .applicationId,

                offerData,
              });

        updateOfferState(
          response.offer
        );

        onSuccess?.(
          response.message ||
            "Offer draft saved successfully."
        );
      } catch (error) {
        handleRequestError(
          error,
          "Unable to save the offer draft."
        );
      } finally {
        setIsWorking(false);
      }
    };

  const handleOfferLetterSelection =
    (event) => {
      const file =
        event.target
          .files?.[0];

      if (!file) {
        setSelectedOfferLetter(
          null
        );

        return;
      }

      const fileName =
        file.name
          .toLowerCase();

      const validExtension =
        fileName.endsWith(
          ".pdf"
        );

      const validMimeType =
        !file.type ||
        file.type ===
          "application/pdf";

      if (
        !validExtension ||
        !validMimeType
      ) {
        event.target.value =
          "";

        setSelectedOfferLetter(
          null
        );

        setErrorMessage(
          "Select a valid PDF offer letter."
        );

        return;
      }

      if (
        file.size >
        MAX_OFFER_LETTER_SIZE
      ) {
        event.target.value =
          "";

        setSelectedOfferLetter(
          null
        );

        setErrorMessage(
          "Offer letter file size cannot exceed 5 MB."
        );

        return;
      }

      setSelectedOfferLetter(
        file
      );

      setErrorMessage("");
    };

  const handleUploadOfferLetter =
    async () => {
      if (
        !currentOffer
      ) {
        setErrorMessage(
          "Save the offer draft before uploading the PDF."
        );

        return;
      }

      if (
        currentOffer.status !==
        "draft"
      ) {
        setErrorMessage(
          "The offer letter can only be uploaded or replaced while the offer is a draft."
        );

        return;
      }

      if (
        !selectedOfferLetter
      ) {
        setErrorMessage(
          "Select a PDF offer letter first."
        );

        return;
      }

      setIsLetterWorking(
        true
      );

      setErrorMessage("");

      try {
        const response =
          await uploadRecruiterOfferLetterRequest({
            token,

            offerId:
              currentOffer
                .offerId,

            file:
              selectedOfferLetter,
          });

        mergeOfferLetter(
          response.offerLetter
        );

        setSelectedOfferLetter(
          null
        );

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            "";
        }

        onSuccess?.(
          response.message ||
            "Offer letter uploaded successfully."
        );
      } catch (error) {
        handleRequestError(
          error,
          "Unable to upload the offer letter."
        );
      } finally {
        setIsLetterWorking(
          false
        );
      }
    };

  const handleDeleteOfferLetter =
    async () => {
      if (
        !currentOffer
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          "Delete the uploaded offer letter PDF?"
        );

      if (!confirmed) {
        return;
      }

      setIsLetterWorking(
        true
      );

      setErrorMessage("");

      try {
        const response =
          await deleteRecruiterOfferLetterRequest({
            token,

            offerId:
              currentOffer
                .offerId,
          });

        mergeOfferLetter({
          available:
            false,

          originalFileName:
            "",

          mimeType:
            "",

          sizeBytes:
            0,
        });

        setSelectedOfferLetter(
          null
        );

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            "";
        }

        onSuccess?.(
          response.message ||
            "Offer letter deleted successfully."
        );
      } catch (error) {
        handleRequestError(
          error,
          "Unable to delete the offer letter."
        );
      } finally {
        setIsLetterWorking(
          false
        );
      }
    };

  const handleOpenOfferLetter =
    async (
      download
    ) => {
      if (
        !currentOffer ||
        !hasOfferLetter
      ) {
        setErrorMessage(
          "No offer letter is available."
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

      setIsLetterWorking(
        true
      );

      setErrorMessage("");

      try {
        const result =
          await getRecruiterOfferLetterRequest({
            token,

            offerId:
              currentOffer
                .offerId,

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
        setIsLetterWorking(
          false
        );
      }
    };

  const handleSendOffer =
    async () => {
      if (
        !currentOffer
      ) {
        setErrorMessage(
          "Save the offer draft before sending it."
        );

        return;
      }

      if (
        currentOffer.status !==
        "draft"
      ) {
        setErrorMessage(
          "Only a draft offer can be sent."
        );

        return;
      }

      if (
        !hasOfferLetter
      ) {
        setErrorMessage(
          "Upload the offer letter PDF before sending the offer."
        );

        return;
      }

      const confirmed =
        window.confirm(
          `Send this offer to ${
            applicant.student
              ?.fullName ||
            "the student"
          }?`
        );

      if (!confirmed) {
        return;
      }

      setIsWorking(true);
      setErrorMessage("");

      try {
        const response =
          await sendRecruiterOfferRequest({
            token,

            offerId:
              currentOffer
                .offerId,
          });

        updateOfferState(
          response.offer
        );

        onSuccess?.(
          response.message ||
            "Offer sent successfully."
        );
      } catch (error) {
        handleRequestError(
          error,
          "Unable to send the offer."
        );
      } finally {
        setIsWorking(false);
      }
    };

  const handleWithdrawOffer =
    async () => {
      if (
        !currentOffer
      ) {
        return;
      }

      const withdrawalNote =
        window.prompt(
          "Enter the reason for withdrawing this offer:",
          "Offer withdrawn by the Recruiter."
        );

      if (
        withdrawalNote ===
        null
      ) {
        return;
      }

      if (
        withdrawalNote
          .trim()
          .length >
        1000
      ) {
        setErrorMessage(
          "Withdrawal reason cannot exceed 1000 characters."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Withdraw this offer? This action cannot be reversed."
        );

      if (!confirmed) {
        return;
      }

      setIsWorking(true);
      setErrorMessage("");

      try {
        const response =
          await withdrawRecruiterOfferRequest({
            token,

            offerId:
              currentOffer
                .offerId,

            note:
              withdrawalNote
                .trim(),
          });

        updateOfferState(
          response.offer
        );

        onSuccess?.(
          response.message ||
            "Offer withdrawn successfully."
        );
      } catch (error) {
        handleRequestError(
          error,
          "Unable to withdraw the offer."
        );
      } finally {
        setIsWorking(false);
      }
    };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white sm:p-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <FileSignature
                  size={24}
                />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                  Offer Management
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {currentOffer
                    ? "Job Offer"
                    : "Create Job Offer"}
                </h2>
              </div>
            </div>

            <p className="mt-4 text-blue-100">
              {applicant.student
                ?.fullName ||
                "Student"}{" "}
              ·{" "}
              {applicant.job
                ?.jobTitle ||
                "Job position"}
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

        {currentOffer && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 sm:px-8">
            <div>
              <p className="text-sm text-neutral-500">
                Current offer status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                  offerStatusStyles[
                    offerStatus
                  ] ||
                  offerStatusStyles
                    .draft
                }`}
              >
                {offerStatusLabels[
                  offerStatus
                ] ||
                  offerStatus}
              </span>
            </div>

            <p className="text-sm text-neutral-600">
              Offer ID:{" "}
              <span className="font-bold text-neutral-900">
                {
                  currentOffer
                    .offerId
                }
              </span>
            </p>
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
                  setErrorMessage(
                    ""
                  )
                }
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-4 border-b border-neutral-200 p-6 sm:grid-cols-3 sm:p-8">
          <SummaryCard
            icon={User}
            label="Candidate"
            value={
              applicant.student
                ?.fullName
            }
          />

          <SummaryCard
            icon={
              BriefcaseBusiness
            }
            label="Applied Role"
            value={
              applicant.job
                ?.jobTitle
            }
          />

          <SummaryCard
            icon={Building2}
            label="Company"
            value={
              applicant.company
                ?.companyName ||
              "Your company"
            }
          />
        </div>

        <form
          onSubmit={
            handleSaveDraft
          }
          className="space-y-7 p-6 sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Offered Designation"
              required
            >
              <input
                type="text"
                name="designation"
                value={
                  form.designation
                }
                onChange={
                  updateField
                }
                disabled={
                  !isDraft ||
                  isBusy
                }
                minLength={2}
                maxLength={150}
                required
                placeholder="Software Development Engineer"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
              />
            </FormField>

            <FormField
              label="Employment Type"
            >
              <input
                type="text"
                name="employmentType"
                value={
                  form.employmentType
                }
                onChange={
                  updateField
                }
                disabled={
                  !isDraft ||
                  isBusy
                }
                maxLength={80}
                placeholder="Full-time"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
              />
            </FormField>

            <FormField
              label="Salary Amount"
              required
            >
              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  type="number"
                  name="salaryAmount"
                  value={
                    form.salaryAmount
                  }
                  onChange={
                    updateField
                  }
                  disabled={
                    !isDraft ||
                    isBusy
                  }
                  min="1"
                  step="0.01"
                  required
                  placeholder="800000"
                  className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
                />
              </div>
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Currency"
                required
              >
                <input
                  type="text"
                  name="currencyCode"
                  value={
                    form.currencyCode
                  }
                  onChange={
                    updateField
                  }
                  disabled={
                    !isDraft ||
                    isBusy
                  }
                  maxLength={3}
                  required
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 uppercase outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
                />
              </FormField>

              <FormField
                label="Salary Period"
                required
              >
                <select
                  name="salaryPeriod"
                  value={
                    form.salaryPeriod
                  }
                  onChange={
                    updateField
                  }
                  disabled={
                    !isDraft ||
                    isBusy
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
                >
                  <option value="annual">
                    Annual
                  </option>

                  <option value="monthly">
                    Monthly
                  </option>
                </select>
              </FormField>
            </div>

            <FormField
              label="Offer Expiry Date"
              required
            >
              <input
                type="date"
                name="offerExpiryDate"
                value={
                  form.offerExpiryDate
                }
                onChange={
                  updateField
                }
                disabled={
                  !isDraft ||
                  isBusy
                }
                min={
                  minimumDate
                }
                max={
                  form.joiningDate ||
                  undefined
                }
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
              />
            </FormField>

            <FormField
              label="Joining Date"
              required
            >
              <input
                type="date"
                name="joiningDate"
                value={
                  form.joiningDate
                }
                onChange={
                  updateField
                }
                disabled={
                  !isDraft ||
                  isBusy
                }
                min={
                  form.offerExpiryDate ||
                  minimumDate
                }
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
              />
            </FormField>

            <FormField
              label="Work Location"
              required
            >
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  type="text"
                  name="workLocation"
                  value={
                    form.workLocation
                  }
                  onChange={
                    updateField
                  }
                  disabled={
                    !isDraft ||
                    isBusy
                  }
                  minLength={2}
                  maxLength={200}
                  required
                  placeholder="Bengaluru, India"
                  className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
                />
              </div>
            </FormField>

            <FormField
              label="Probation Period"
            >
              <input
                type="text"
                name="probationPeriod"
                value={
                  form.probationPeriod
                }
                onChange={
                  updateField
                }
                disabled={
                  !isDraft ||
                  isBusy
                }
                maxLength={100}
                placeholder="6 months"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
              />
            </FormField>
          </div>

          <FormField
            label="Offer Terms"
          >
            <textarea
              name="terms"
              rows={7}
              value={
                form.terms
              }
              onChange={
                updateField
              }
              disabled={
                !isDraft ||
                isBusy
              }
              maxLength={10000}
              placeholder="Add compensation terms, benefits, reporting requirements and other employment conditions."
              className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
            />

            <p className="mt-2 text-right text-xs text-neutral-400">
              {
                form.terms
                  .length
              }
              /10000
            </p>
          </FormField>

          <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <FileSignature
                  size={22}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-neutral-900">
                  Offer Letter PDF
                </h3>

                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Upload one valid PDF
                  with a maximum size of
                  5 MB. A PDF is required
                  before sending the
                  offer.
                </p>
              </div>
            </div>

            {!currentOffer && (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-700">
                Save the offer draft
                before uploading the
                offer-letter PDF.
              </div>
            )}

            {currentOffer &&
              hasOfferLetter && (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <FileCheck2
                          size={22}
                        />
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
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
                        className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-50"
                      >
                        <Eye
                          size={17}
                        />

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
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                      >
                        <Download
                          size={17}
                        />

                        Download
                      </button>

                      {canModifyOfferLetter && (
                        <button
                          type="button"
                          onClick={
                            handleDeleteOfferLetter
                          }
                          disabled={
                            isBusy
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                        >
                          <Trash2
                            size={17}
                          />

                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

            {canModifyOfferLetter && (
              <div className="mt-5">
                <input
                  ref={
                    fileInputRef
                  }
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={
                    handleOfferLetterSelection
                  }
                  className="hidden"
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef
                        .current
                        ?.click()
                    }
                    disabled={
                      isBusy
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-300 bg-white px-5 py-3 font-semibold text-indigo-700 hover:bg-indigo-50 disabled:opacity-50"
                  >
                    <Upload
                      size={18}
                    />

                    {hasOfferLetter
                      ? "Choose Replacement PDF"
                      : "Choose Offer Letter PDF"}
                  </button>

                  {selectedOfferLetter && (
                    <div className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                      <p className="truncate font-semibold text-neutral-900">
                        {
                          selectedOfferLetter
                            .name
                        }
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {formatFileSize(
                          selectedOfferLetter
                            .size
                        )}
                      </p>
                    </div>
                  )}

                  {selectedOfferLetter && (
                    <button
                      type="button"
                      onClick={
                        handleUploadOfferLetter
                      }
                      disabled={
                        isBusy
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isLetterWorking ? (
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <Upload
                          size={18}
                        />
                      )}

                      {hasOfferLetter
                        ? "Replace PDF"
                        : "Upload PDF"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentOffer &&
              !hasOfferLetter &&
              offerStatus !==
                "draft" && (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-700">
                  No offer-letter PDF is
                  attached to this offer.
                </div>
              )}
          </section>

          {currentOffer && (
            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h3 className="font-bold text-neutral-900">
                Offer Summary
              </h3>

              <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                <SummaryValue
                  icon={
                    IndianRupee
                  }
                  label="Compensation"
                  value={formatMoney({
                    amount:
                      currentOffer
                        .compensation
                        ?.amount,

                    currency:
                      currentOffer
                        .compensation
                        ?.currency,

                    period:
                      currentOffer
                        .compensation
                        ?.period,
                  })}
                />

                <SummaryValue
                  icon={
                    CalendarDays
                  }
                  label="Joining Date"
                  value={formatDate(
                    currentOffer
                      .joiningDate
                  )}
                />

                <SummaryValue
                  icon={MapPin}
                  label="Location"
                  value={
                    currentOffer
                      .workLocation
                  }
                />
              </div>
            </section>
          )}

          <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 pt-6">
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

            {canWithdraw && (
              <button
                type="button"
                onClick={
                  handleWithdrawOffer
                }
                disabled={
                  isBusy
                }
                className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-5 py-3 font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle
                  size={18}
                />

                Withdraw Offer
              </button>
            )}

            {isDraft && (
              <button
                type="submit"
                disabled={
                  isBusy
                }
                className="inline-flex items-center gap-2 rounded-xl border border-blue-300 bg-blue-50 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isWorking ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <FileSignature
                    size={18}
                  />
                )}

                {currentOffer
                  ? "Update Draft"
                  : "Save Draft"}
              </button>
            )}

            {currentOffer
              ?.status ===
              "draft" && (
              <button
                type="button"
                onClick={
                  handleSendOffer
                }
                disabled={
                  isBusy ||
                  !hasOfferLetter
                }
                title={
                  hasOfferLetter
                    ? "Send offer to the Student"
                    : "Upload the offer letter PDF before sending"
                }
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isWorking ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Send
                    size={18}
                  />
                )}

                {hasOfferLetter
                  ? "Send Offer"
                  : "Upload PDF Before Sending"}
              </button>
            )}

            {currentOffer
              ?.status ===
              "accepted" && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-5 py-3 font-bold text-emerald-700">
                <CheckCircle2
                  size={18}
                />

                Offer Accepted
              </span>
            )}

            {currentOffer
              ?.status ===
              "declined" && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-rose-100 px-5 py-3 font-bold text-rose-700">
                <XCircle
                  size={18}
                />

                Offer Declined
              </span>
            )}

            {currentOffer
              ?.status ===
              "sent" && (
              <span className="inline-flex items-center gap-2 rounded-xl bg-blue-100 px-5 py-3 font-bold text-blue-700">
                <Send
                  size={18}
                />

                Awaiting Student Response
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  required = false,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-neutral-700">
        {label}

        {required && (
          <span className="ml-1 text-rose-600">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-neutral-50 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
        <Icon
          size={17}
        />

        {label}
      </p>

      <p className="mt-2 font-bold text-neutral-900">
        {value ||
          "Not available"}
      </p>
    </div>
  );
}

function SummaryValue({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div>
      <p className="flex items-center gap-2 font-semibold text-blue-700">
        <Icon
          size={16}
        />

        {label}
      </p>

      <p className="mt-2 font-medium text-neutral-800">
        {value ||
          "Not available"}
      </p>
    </div>
  );
}

export default RecruiterOfferModal;