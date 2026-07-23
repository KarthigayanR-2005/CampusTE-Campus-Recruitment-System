import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import ProfileHeader from "../../components/student/profile/ProfileHeader";
import ProfileSidebar from "../../components/student/profile/ProfileSidebar";
import PersonalInformation from "../../components/student/profile/PersonalInformation";
import Education from "../../components/student/profile/Education";
import Skills from "../../components/student/profile/Skills";
import Projects from "../../components/student/profile/Projects";
import Experience from "../../components/student/profile/Experience";
import Certifications from "../../components/student/profile/Certifications";
import SocialLinks from "../../components/student/profile/SocialLinks";
import ResumeUpload from "../../components/student/profile/ResumeUpload";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getStudentProfileCompletionRequest,
  getStudentProfileRequest,
  PROFILE_DATA_CHANGED_EVENT,
  updateStudentProfileRequest,
} from "../../services/studentService";

const emptyProfile = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  rollNumber: "",
  institution: "",
  degree: "",
  department: "",
  yearOfStudy: "",
  cgpa: "",
  graduationYear: "",
  city: "",
  state: "",
  country: "",
  linkedinUrl: "",
  githubUrl: "",
  portfolioUrl: "",
  profileSummary: "",
};

const emptyCompletion = {
  percentage: 0,
  completedSections: 0,
  totalSections: 8,
  sections: [],
};

function Profile() {
  const navigate =
    useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const successTimer =
    useRef(null);

  const [
    profile,
    setProfile,
  ] = useState(
    emptyProfile
  );

  const [
    completion,
    setCompletion,
  ] = useState(
    emptyCompletion
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isCompletionLoading,
    setIsCompletionLoading,
  ] = useState(true);

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    completionError,
    setCompletionError,
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

  const loadProfile =
    useCallback(
      async () => {
        if (!token) {
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
          const response =
            await getStudentProfileRequest({
              token,
            });

          setProfile({
            ...emptyProfile,
            ...response.profile,
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
              "Unable to load your profile."
          );
        } finally {
          setIsLoading(false);
        }
      },
      [
        token,
        handleAuthenticationError,
      ]
    );

  const loadCompletion =
    useCallback(
      async ({
        showLoader = true,
      } = {}) => {
        if (!token) {
          setIsCompletionLoading(
            false
          );

          return;
        }

        if (showLoader) {
          setIsCompletionLoading(
            true
          );
        }

        setCompletionError("");

        try {
          const response =
            await getStudentProfileCompletionRequest({
              token,
            });

          setCompletion({
            ...emptyCompletion,
            ...response.completion,
          });
        } catch (error) {
          if (
            handleAuthenticationError(
              error
            )
          ) {
            return;
          }

          setCompletionError(
            error.message ||
              "Unable to load profile completion."
          );
        } finally {
          setIsCompletionLoading(
            false
          );
        }
      },
      [
        token,
        handleAuthenticationError,
      ]
    );

  useEffect(() => {
    loadProfile();
    loadCompletion();
  }, [
    loadProfile,
    loadCompletion,
  ]);

  useEffect(() => {
    const handleProfileDataChanged =
      () => {
        loadCompletion({
          showLoader: false,
        });
      };

    window.addEventListener(
      PROFILE_DATA_CHANGED_EVENT,
      handleProfileDataChanged
    );

    return () => {
      window.removeEventListener(
        PROFILE_DATA_CHANGED_EVENT,
        handleProfileDataChanged
      );
    };
  }, [loadCompletion]);

  useEffect(() => {
    return () => {
      if (
        successTimer.current
      ) {
        window.clearTimeout(
          successTimer.current
        );
      }
    };
  }, []);

  const handleFieldChange = (
    fieldName,
    fieldValue
  ) => {
    setProfile(
      (previousProfile) => ({
        ...previousProfile,
        [fieldName]:
          fieldValue,
      })
    );

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSave =
    async () => {
      setIsSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await updateStudentProfileRequest({
            token,
            profile,
          });

        setProfile({
          ...emptyProfile,
          ...response.profile,
        });

        setSuccessMessage(
          response.message ||
            "Profile updated successfully."
        );

        if (
          successTimer.current
        ) {
          window.clearTimeout(
            successTimer.current
          );
        }

        successTimer.current =
          window.setTimeout(
            () => {
              setSuccessMessage(
                ""
              );
            },
            4000
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
            "Unable to save your profile."
        );
      } finally {
        setIsSaving(false);
      }
    };

  const handleEditProfile =
    () => {
      document
        .getElementById(
          "personal-information"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    };

  const reloadProfilePage =
    () => {
      loadProfile();
      loadCompletion();
    };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={38}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading your profile
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving your
          information from MySQL.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700"
        >
          <CheckCircle2
            size={20}
          />

          {successMessage}
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

          <div>
            <p>
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={
                reloadProfilePage
              }
              className="mt-2 text-sm underline"
            >
              Reload profile
            </button>
          </div>
        </div>
      )}

      <ProfileHeader
        profile={profile}
        onEdit={
          handleEditProfile
        }
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24">
            <ProfileSidebar
              profile={profile}
              completion={
                completion
              }
              isCompletionLoading={
                isCompletionLoading
              }
              completionError={
                completionError
              }
              onRetryCompletion={() =>
                loadCompletion()
              }
            />
          </div>
        </aside>

        <main className="space-y-8 lg:col-span-8 xl:col-span-9">
          <PersonalInformation
            profile={profile}
            onChange={
              handleFieldChange
            }
            onSave={
              handleSave
            }
            isSaving={
              isSaving
            }
          />

          <Education
            profile={profile}
            onChange={
              handleFieldChange
            }
            onSave={
              handleSave
            }
            isSaving={
              isSaving
            }
          />

          <Skills />

          <Projects />

          <Experience />

          <Certifications />

          <SocialLinks
            profile={profile}
            onChange={
              handleFieldChange
            }
            onSave={
              handleSave
            }
            isSaving={
              isSaving
            }
          />

          <ResumeUpload />
        </main>
      </div>
    </div>
  );
}

export default Profile;