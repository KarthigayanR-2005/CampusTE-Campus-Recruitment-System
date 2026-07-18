import { useMemo, useState } from "react";

import interviews from "../../data/interviews";

import InterviewsHero from "../../components/student/interviews/InterviewsHero";
import InterviewStats from "../../components/student/interviews/InterviewStats";
import InterviewSearch from "../../components/student/interviews/InterviewSearch";
import InterviewFilters from "../../components/student/interviews/InterviewFilters";
import InterviewGrid from "../../components/student/interviews/InterviewGrid";
import InterviewPagination from "../../components/student/interviews/InterviewPagination";
import InterviewDetailsModal from "../../components/student/interviews/InterviewDetailsModal";

function Interviews() {
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [roundFilter, setRoundFilter] = useState("All");

  const [selectedInterview, setSelectedInterview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const interviewsPerPage = 6;

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const matchesSearch =
        `${interview.company} ${interview.role} ${interview.interviewer}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || interview.status === statusFilter;

      const matchesMode =
        modeFilter === "All" || interview.mode === modeFilter;

      const matchesRound =
        roundFilter === "All" || interview.round === roundFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMode &&
        matchesRound
      );
    });
  }, [
    searchTerm,
    statusFilter,
    modeFilter,
    roundFilter,
  ]);

  const totalPages = Math.ceil(
    filteredInterviews.length / interviewsPerPage
  );

  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * interviewsPerPage,
    currentPage * interviewsPerPage
  );

  return (
    <div className="space-y-8">
      <InterviewsHero />

      <InterviewStats interviews={interviews} />

      <InterviewSearch
        searchTerm={searchTerm}
        setSearchTerm={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
      />

      <InterviewFilters
        statusFilter={statusFilter}
        setStatusFilter={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
        modeFilter={modeFilter}
        setModeFilter={(value) => {
          setModeFilter(value);
          setCurrentPage(1);
        }}
        roundFilter={roundFilter}
        setRoundFilter={(value) => {
          setRoundFilter(value);
          setCurrentPage(1);
        }}
      />

      <InterviewGrid
        interviews={paginatedInterviews}
        onViewDetails={setSelectedInterview}
      />

      <InterviewPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <InterviewDetailsModal
        interview={selectedInterview}
        onClose={() => setSelectedInterview(null)}
      />
    </div>
  );
}

export default Interviews;