import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import ApplicationsHero from "../../components/student/applications/ApplicationsHero";
import ApplicationsStats from "../../components/student/applications/ApplicationsStats";
import ApplicationSearch from "../../components/student/applications/ApplicationSearch";
import ApplicationFilters from "../../components/student/applications/ApplicationFilters";
import ApplicationsGrid from "../../components/student/applications/ApplicationsGrid";
import EmptyApplications from "../../components/student/applications/EmptyApplications";
import ApplicationPagination from "../../components/student/applications/ApplicationPagination";
import ApplicationDetailsModal from "../../components/student/applications/ApplicationDetailsModal.jsx";
import StudentOfferModal from "../../components/offers/StudentOfferModal.jsx";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getStudentApplicationRequest,
  getStudentApplicationsRequest,
  withdrawStudentApplicationRequest,
} from "../../services/studentApplicationService";

import {
  getStudentOffersRequest,
} from "../../services/offerService.js";

const initialFilters = {
  status: "",
  mode: "",
  location: "",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function Applications() {
  const navigate =
    useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    offers,
    setOffers,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filters,
    setFilters,
  ] = useState(
    initialFilters
  );

  const [
    selectedApplication,
    setSelectedApplication,
  ] = useState(null);

  const [
    offerApplication,
    setOfferApplication,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isDetailsLoading,
    setIsDetailsLoading,
  ] = useState(false);

  const [
    withdrawingId,
    setWithdrawingId,
  ] = useState(null);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const applicationsPerPage = 4;

  const handleAuthenticationError =
    useCallback(
      (error) => {
        if (
          error?.status === 401
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

  const loadApplications =
    useCallback(async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const [
          applicationResponse,
          offerResponse,
        ] = await Promise.all([
          getStudentApplicationsRequest({
            token,
          }),

          getStudentOffersRequest({
            token,
          }),
        ]);

        setApplications(
          Array.isArray(
            applicationResponse
              ?.applications
          )
            ? applicationResponse
                .applications
            : []
        );

        setOffers(
          Array.isArray(
            offerResponse?.offers
          )
            ? offerResponse.offers
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
            "Unable to retrieve your applications and offers."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      token,
      handleAuthenticationError,
    ]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const offersByApplicationId =
    useMemo(
      () =>
        new Map(
          offers.map(
            (offer) => [
              String(
                offer.applicationId
              ),

              offer,
            ]
          )
        ),
      [offers]
    );

  const applicationsWithOffers =
    useMemo(
      () =>
        applications.map(
          (application) => {
            const offer =
              offersByApplicationId.get(
                String(
                  application.applicationId
                )
              );

            return {
              ...application,

              offer:
                offer || null,

              hasOffer:
                Boolean(offer),

              offerStatus:
                offer?.status ||
                null,
            };
          }
        ),
      [
        applications,
        offersByApplicationId,
      ]
    );

  const filteredApplications =
    useMemo(() => {
      const cleanedSearch =
        normalizeText(
          search
        );

      const cleanedLocation =
        normalizeText(
          filters.location
        );

      return applicationsWithOffers.filter(
        (application) => {
          const companyName =
            application.company
              ?.companyName || "";

          const jobTitle =
            application.job
              ?.jobTitle || "";

          const offerDesignation =
            application.offer
              ?.designation || "";

          const location =
            [
              application.job
                ?.city,

              application.job
                ?.country,

              application.offer
                ?.workLocation,
            ]
              .filter(Boolean)
              .join(" ");

          const matchesSearch =
            !cleanedSearch ||
            normalizeText(
              `${companyName} ${jobTitle} ${offerDesignation}`
            ).includes(
              cleanedSearch
            );

          const matchesStatus =
            !filters.status ||
            application.status ===
              filters.status;

          const matchesMode =
            !filters.mode ||
            application.job
              ?.workMode ===
              filters.mode;

          const matchesLocation =
            !cleanedLocation ||
            normalizeText(
              location
            ).includes(
              cleanedLocation
            );

          return (
            matchesSearch &&
            matchesStatus &&
            matchesMode &&
            matchesLocation
          );
        }
      );
    }, [
      applicationsWithOffers,
      search,
      filters,
    ]);

  const totalPages =
    Math.max(
      1,

      Math.ceil(
        filteredApplications.length /
          applicationsPerPage
      )
    );

  useEffect(() => {
    setCurrentPage(
      (previousPage) =>
        Math.min(
          previousPage,
          totalPages
        )
    );
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    filters,
  ]);

  const startIndex =
    (currentPage - 1) *
    applicationsPerPage;

  const paginatedApplications =
    filteredApplications.slice(
      startIndex,

      startIndex +
        applicationsPerPage
    );

  const handleReset = () => {
    setSearch("");

    setFilters(
      initialFilters
    );

    setCurrentPage(1);
  };

  const handleViewDetails =
    async (application) => {
      setSelectedApplication(
        application
      );

      setIsDetailsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getStudentApplicationRequest({
            token,

            applicationId:
              application.applicationId,
          });

        const offer =
          offersByApplicationId.get(
            String(
              application.applicationId
            )
          );

        setSelectedApplication({
          ...response.application,

          offer:
            offer || null,

          hasOffer:
            Boolean(offer),

          offerStatus:
            offer?.status ||
            null,
        });
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
            "Unable to retrieve application details."
        );
      } finally {
        setIsDetailsLoading(false);
      }
    };

  const replaceApplication = (
    updatedApplication
  ) => {
    if (!updatedApplication) {
      return;
    }

    setApplications(
      (
        previousApplications
      ) =>
        previousApplications.map(
          (application) =>
            String(
              application.applicationId
            ) ===
            String(
              updatedApplication.applicationId
            )
              ? updatedApplication
              : application
        )
    );

    setSelectedApplication(
      (
        previousApplication
      ) =>
        String(
          previousApplication
            ?.applicationId ||
            ""
        ) ===
        String(
          updatedApplication.applicationId
        )
          ? {
              ...updatedApplication,

              offer:
                offersByApplicationId.get(
                  String(
                    updatedApplication.applicationId
                  )
                ) || null,
            }
          : previousApplication
    );
  };

  const replaceOffer = (
    updatedOffer
  ) => {
    if (!updatedOffer) {
      return;
    }

    setOffers(
      (
        previousOffers
      ) => {
        const offerExists =
          previousOffers.some(
            (offer) =>
              String(
                offer.offerId
              ) ===
              String(
                updatedOffer.offerId
              )
          );

        if (offerExists) {
          return previousOffers.map(
            (offer) =>
              String(
                offer.offerId
              ) ===
              String(
                updatedOffer.offerId
              )
                ? updatedOffer
                : offer
          );
        }

        return [
          updatedOffer,
          ...previousOffers,
        ];
      }
    );

    setSelectedApplication(
      (
        previousApplication
      ) =>
        String(
          previousApplication
            ?.applicationId ||
            ""
        ) ===
        String(
          updatedOffer.applicationId
        )
          ? {
              ...previousApplication,

              offer:
                updatedOffer,

              hasOffer:
                true,

              offerStatus:
                updatedOffer.status,
            }
          : previousApplication
    );
  };

  const handleWithdraw =
    async (application) => {
      const confirmed =
        window.confirm(
          `Withdraw your application for "${
            application.job
              ?.jobTitle ||
            "this job"
          }"?`
        );

      if (!confirmed) {
        return;
      }

      setWithdrawingId(
        application.applicationId
      );

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await withdrawStudentApplicationRequest({
            token,

            applicationId:
              application.applicationId,
          });

        replaceApplication(
          response.application
        );

        setSuccessMessage(
          response.message ||
            "Application withdrawn successfully."
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
            "Unable to withdraw the application."
        );
      } finally {
        setWithdrawingId(null);
      }
    };

  const handleOpenOffer = (
    application
  ) => {
    const offer =
      offersByApplicationId.get(
        String(
          application.applicationId
        )
      );

    if (!offer) {
      setErrorMessage(
        "No offer is available for this application."
      );

      return;
    }

    setOfferApplication(
      application
    );

    setSelectedApplication(
      null
    );

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleOfferSuccess = (
    message
  ) => {
    setSuccessMessage(
      message ||
        "Offer response submitted successfully."
    );

    setErrorMessage("");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={40}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading applications
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving your
          applications and offers
          from MySQL.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {successMessage && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700"
          >
            <CheckCircle2
              size={20}
            />

            <div className="flex-1">
              {
                successMessage
              }
            </div>

            <button
              type="button"
              onClick={() =>
                setSuccessMessage(
                  ""
                )
              }
              className="rounded-lg p-1 hover:bg-emerald-100"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 font-semibold text-rose-700"
          >
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

        <ApplicationsHero
          totalApplications={
            applications.length
          }
        />

        <ApplicationsStats
          applications={
            applicationsWithOffers
          }
        />

        <ApplicationSearch
          search={search}
          setSearch={
            setSearch
          }
        />

        <ApplicationFilters
          filters={filters}
          setFilters={
            setFilters
          }
          onReset={
            handleReset
          }
        />

        {paginatedApplications.length >
        0 ? (
          <>
            <ApplicationsGrid
              applications={
                paginatedApplications
              }
              onViewDetails={
                handleViewDetails
              }
            />

            <ApplicationPagination
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              startIndex={
                startIndex
              }
              pageSize={
                applicationsPerPage
              }
              totalItems={
                filteredApplications.length
              }
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <EmptyApplications
            hasApplications={
              applications.length >
              0
            }
            onReset={
              handleReset
            }
            onBrowseJobs={() =>
              navigate(
                "/student/jobs"
              )
            }
          />
        )}
      </div>

      {selectedApplication && (
        <ApplicationDetailsModal
          application={
            selectedApplication
          }
          offer={
            offersByApplicationId.get(
              String(
                selectedApplication.applicationId
              )
            ) || null
          }
          isLoading={
            isDetailsLoading
          }
          isWithdrawing={
            String(
              withdrawingId
            ) ===
            String(
              selectedApplication.applicationId
            )
          }
          onWithdraw={
            handleWithdraw
          }
          onViewOffer={() =>
            handleOpenOffer(
              selectedApplication
            )
          }
          onClose={() =>
            setSelectedApplication(
              null
            )
          }
        />
      )}

      {offerApplication && (
        <StudentOfferModal
          token={token}
          application={
            offerApplication
          }
          offer={
            offersByApplicationId.get(
              String(
                offerApplication.applicationId
              )
            ) || null
          }
          onClose={() =>
            setOfferApplication(
              null
            )
          }
          onOfferChanged={
            replaceOffer
          }
          onSuccess={
            handleOfferSuccess
          }
          onError={(error) => {
            if (
              handleAuthenticationError(
                error
              )
            ) {
              return;
            }

            setErrorMessage(
              error.message ||
                "Unable to manage the offer."
            );
          }}
        />
      )}
    </>
  );
}

export default Applications;