import { useState } from "react";

import { resume } from "../../data/resume";

import ResumeHero from "../../components/student/resume/ResumeHero";
import ResumeStats from "../../components/student/resume/ResumeStats";
import ResumeViewer from "../../components/student/resume/ResumeViewer";
import ResumeUpload from "../../components/student/resume/ResumeUpload";
import ResumeScore from "../../components/student/resume/ResumeScore";
import ResumeSuggestions from "../../components/student/resume/ResumeSuggestions";
import ResumeHistory from "../../components/student/resume/ResumeHistory";
import ResumeActions from "../../components/student/resume/ResumeActions";
import EmptyResume from "../../components/student/resume/EmptyResume";
import DeleteResumeModal from "../../components/student/resume/DeleteResumeModal";

function Resume() {
  const [hasResume, setHasResume] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteResume = () => {
    setHasResume(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-8">

      <ResumeHero />

      {hasResume ? (
        <>

          <ResumeStats
            resume={resume}
          />

          <ResumeViewer
            resume={resume}
          />

          <div className="grid gap-8 xl:grid-cols-2">

            <ResumeUpload />

            <ResumeScore
              resume={resume}
            />

          </div>

          <ResumeSuggestions
            resume={resume}
          />

          <ResumeHistory
            resume={resume}
          />

          <ResumeActions
            onDelete={() => setShowDeleteModal(true)}
          />

        </>
      ) : (
        <EmptyResume />
      )}

      <DeleteResumeModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteResume}
      />

    </div>
  );
}

export default Resume;