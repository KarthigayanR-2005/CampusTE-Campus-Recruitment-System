import { useMemo, useState } from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  GraduationCap,
  Mail,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserCheck,
  Users,
  X,
} from "lucide-react";

const initialCandidates = [
  {
    id: 1,
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    college: "Amrita Vishwa Vidyapeetham",
    branch: "Computer Science and Engineering",
    cgpa: 9.1,
    graduationYear: 2027,
    location: "Coimbatore, Tamil Nadu",
    experience: "6 Months",
    resumeScore: 95,
    availability: "Available",
    skills: ["React", "Node.js", "JavaScript", "MongoDB"],
    rolePreference: "Full Stack Developer",
    summary:
      "Full-stack developer with strong experience in React, Node.js, API development and database integration.",
    saved: true,
  },
  {
    id: 2,
    name: "Nisha Verma",
    email: "nisha.verma@example.com",
    college: "PSG College of Technology",
    branch: "Information Technology",
    cgpa: 8.8,
    graduationYear: 2027,
    location: "Chennai, Tamil Nadu",
    experience: "1 Year",
    resumeScore: 92,
    availability: "Available",
    skills: ["Python", "Django", "SQL", "Power BI"],
    rolePreference: "Data Analyst",
    summary:
      "Data-focused student skilled in Python, SQL, dashboard creation and business intelligence.",
    saved: false,
  },
  {
    id: 3,
    name: "Arun Prakash",
    email: "arun.prakash@example.com",
    college: "VIT University",
    branch: "Artificial Intelligence and Data Science",
    cgpa: 9.3,
    graduationYear: 2027,
    location: "Vellore, Tamil Nadu",
    experience: "8 Months",
    resumeScore: 97,
    availability: "Available",
    skills: ["Python", "Machine Learning", "TensorFlow", "Pandas"],
    rolePreference: "Machine Learning Engineer",
    summary:
      "AI student with practical experience in predictive modelling, deep learning and data preprocessing.",
    saved: true,
  },
  {
    id: 4,
    name: "Keerthana S",
    email: "keerthana.s@example.com",
    college: "Anna University",
    branch: "Computer Science and Engineering",
    cgpa: 8.5,
    graduationYear: 2027,
    location: "Chennai, Tamil Nadu",
    experience: "Fresher",
    resumeScore: 86,
    availability: "Available",
    skills: ["Java", "Spring Boot", "MySQL", "Git"],
    rolePreference: "Backend Developer",
    summary:
      "Backend-focused candidate with knowledge of Java, Spring Boot, REST APIs and relational databases.",
    saved: false,
  },
  {
    id: 5,
    name: "Rohit Kumar",
    email: "rohit.kumar@example.com",
    college: "SRM Institute of Science and Technology",
    branch: "Electronics and Communication Engineering",
    cgpa: 8.2,
    graduationYear: 2027,
    location: "Hyderabad, Telangana",
    experience: "6 Months",
    resumeScore: 83,
    availability: "Unavailable",
    skills: ["AWS", "Linux", "Networking", "Python"],
    rolePreference: "Cloud Support Engineer",
    summary:
      "Cloud and networking enthusiast with practical knowledge of AWS services and Linux administration.",
    saved: false,
  },
  {
    id: 6,
    name: "Lakshmi Narayanan",
    email: "lakshmi.n@example.com",
    college: "Kumaraguru College of Technology",
    branch: "Information Technology",
    cgpa: 8.9,
    graduationYear: 2027,
    location: "Coimbatore, Tamil Nadu",
    experience: "1 Year",
    resumeScore: 91,
    availability: "Available",
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    rolePreference: "Frontend Developer",
    summary:
      "Frontend developer experienced in responsive UI development, accessibility and modern design systems.",
    saved: false,
  },
  {
    id: 7,
    name: "Farhan Ali",
    email: "farhan.ali@example.com",
    college: "Manipal Institute of Technology",
    branch: "Computer Science and Engineering",
    cgpa: 8.7,
    graduationYear: 2027,
    location: "Bengaluru, Karnataka",
    experience: "10 Months",
    resumeScore: 89,
    availability: "Available",
    skills: ["Cybersecurity", "Linux", "Wireshark", "Python"],
    rolePreference: "Cybersecurity Analyst",
    summary:
      "Cybersecurity candidate with experience in vulnerability assessment, network analysis and incident reporting.",
    saved: true,
  },
  {
    id: 8,
    name: "Divya Ramesh",
    email: "divya.ramesh@example.com",
    college: "Cochin University of Science and Technology",
    branch: "Computer Science and Engineering",
    cgpa: 8.4,
    graduationYear: 2027,
    location: "Kochi, Kerala",
    experience: "Fresher",
    resumeScore: 81,
    availability: "Available",
    skills: ["C++", "Java", "Data Structures", "SQL"],
    rolePreference: "Software Engineer",
    summary:
      "Strong problem solver with a good foundation in object-oriented programming, algorithms and databases.",
    saved: false,
  },
  {
    id: 9,
    name: "Sanjay Krishnan",
    email: "sanjay.krishnan@example.com",
    college: "NIT Trichy",
    branch: "Computer Science and Engineering",
    cgpa: 9.4,
    graduationYear: 2027,
    location: "Tiruchirappalli, Tamil Nadu",
    experience: "1 Year",
    resumeScore: 98,
    availability: "Available",
    skills: ["Java", "Spring Boot", "Redis", "PostgreSQL"],
    rolePreference: "Software Development Engineer",
    summary:
      "Software engineer experienced in backend architecture, scalable APIs, caching and database optimization.",
    saved: true,
  },
];

const branchOptions = [
  "All Branches",
  "Computer Science and Engineering",
  "Information Technology",
  "Artificial Intelligence and Data Science",
  "Electronics and Communication Engineering",
];

const experienceOptions = [
  "All Experience",
  "Fresher",
  "6 Months",
  "8 Months",
  "10 Months",
  "1 Year",
];

function CandidateSearch() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState("All Branches");
  const [experienceFilter, setExperienceFilter] =
    useState("All Experience");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [minimumCgpa, setMinimumCgpa] = useState("0");
  const [minimumScore, setMinimumScore] = useState("0");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const candidatesPerPage = 6;

  const filteredCandidates = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.college.toLowerCase().includes(query) ||
        candidate.rolePreference.toLowerCase().includes(query) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesBranch =
        branchFilter === "All Branches" ||
        candidate.branch === branchFilter;

      const matchesExperience =
        experienceFilter === "All Experience" ||
        candidate.experience === experienceFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        candidate.availability === availabilityFilter;

      const matchesCgpa =
        candidate.cgpa >= Number(minimumCgpa || 0);

      const matchesScore =
        candidate.resumeScore >= Number(minimumScore || 0);

      return (
        matchesSearch &&
        matchesBranch &&
        matchesExperience &&
        matchesAvailability &&
        matchesCgpa &&
        matchesScore
      );
    });
  }, [
    availabilityFilter,
    branchFilter,
    candidates,
    experienceFilter,
    minimumCgpa,
    minimumScore,
    searchTerm,
  ]);

  const sortedCandidates = useMemo(() => {
    return [...filteredCandidates].sort(
      (first, second) => second.resumeScore - first.resumeScore
    );
  }, [filteredCandidates]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedCandidates.length / candidatesPerPage)
  );

  const startIndex = (currentPage - 1) * candidatesPerPage;

  const paginatedCandidates = sortedCandidates.slice(
    startIndex,
    startIndex + candidatesPerPage
  );

  const savedCount = candidates.filter(
    (candidate) => candidate.saved
  ).length;

  const strongMatches = candidates.filter(
    (candidate) => candidate.resumeScore >= 90
  ).length;

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const toggleSavedCandidate = (candidateId) => {
    setCandidates((previousCandidates) =>
      previousCandidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              saved: !candidate.saved,
            }
          : candidate
      )
    );

    setSelectedCandidate((previousCandidate) =>
      previousCandidate?.id === candidateId
        ? {
            ...previousCandidate,
            saved: !previousCandidate.saved,
          }
        : previousCandidate
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setBranchFilter("All Branches");
    setExperienceFilter("All Experience");
    setAvailabilityFilter("All");
    setMinimumCgpa("0");
    setMinimumScore("0");
    setCurrentPage(1);
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleInvite = (candidate) => {
    showMessage(
      `Invitation sent to ${candidate.name} for the selected opportunity.`
    );
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Search size={25} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Talent Discovery
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Search Candidates
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Discover candidates using academic, technical and
                AI-powered resume matching filters.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
                <p className="text-sm text-blue-100">
                  Strong Matches
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {strongMatches}
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
                <p className="text-sm text-blue-100">
                  Saved Candidates
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {savedCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className="flex items-center gap-3 border-t border-neutral-200 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-800 sm:px-8">
            <CheckCircle2 size={19} />
            {message}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Candidate Search
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Search by name, college, skill or preferred role.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <SlidersHorizontal size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="relative mt-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              handleFilterChange(setSearchTerm, event.target.value)
            }
            placeholder="Search candidates, colleges, roles or skills..."
            className="w-full rounded-2xl border border-neutral-300 py-4 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {showFilters && (
          <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="flex items-center gap-3">
              <Filter size={19} className="text-blue-700" />

              <h3 className="font-bold text-neutral-900">
                Advanced Filters
              </h3>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Branch
                </label>

                <select
                  value={branchFilter}
                  onChange={(event) =>
                    handleFilterChange(
                      setBranchFilter,
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  {branchOptions.map((branch) => (
                    <option key={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Experience
                </label>

                <select
                  value={experienceFilter}
                  onChange={(event) =>
                    handleFilterChange(
                      setExperienceFilter,
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  {experienceOptions.map((experience) => (
                    <option key={experience}>{experience}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Availability
                </label>

                <select
                  value={availabilityFilter}
                  onChange={(event) =>
                    handleFilterChange(
                      setAvailabilityFilter,
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>All</option>
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Minimum CGPA
                </label>

                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={minimumCgpa}
                  onChange={(event) =>
                    handleFilterChange(
                      setMinimumCgpa,
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Minimum Resume Score
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={minimumScore}
                  onChange={(event) =>
                    handleFilterChange(
                      setMinimumScore,
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
              >
                <X size={17} />
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Candidate Results
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Candidates are ranked by resume match score.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <Users size={17} />
            {filteredCandidates.length} candidates found
          </div>
        </div>

        {paginatedCandidates.length > 0 ? (
          <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3 sm:p-8">
            {paginatedCandidates.map((candidate) => (
              <article
                key={candidate.id}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white">
                      {candidate.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <h3 className="font-bold text-neutral-900">
                        {candidate.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {candidate.rolePreference}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleSavedCandidate(candidate.id)
                    }
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                      candidate.saved
                        ? "bg-amber-100 text-amber-700"
                        : "bg-neutral-100 text-neutral-500 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                    aria-label="Save candidate"
                  >
                    <Bookmark
                      size={18}
                      className={
                        candidate.saved ? "fill-current" : ""
                      }
                    />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-neutral-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      CGPA
                    </p>

                    <p className="mt-1 text-lg font-bold text-neutral-900">
                      {candidate.cgpa}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-purple-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                      Match Score
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-lg font-bold text-purple-700">
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                      {candidate.resumeScore}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-neutral-600">
                  <p className="flex items-start gap-2">
                    <GraduationCap
                      size={17}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />
                    <span>{candidate.college}</span>
                  </p>

                  <p className="flex items-start gap-2">
                    <BriefcaseBusiness
                      size={17}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />
                    <span>{candidate.experience}</span>
                  </p>

                  <p className="flex items-start gap-2">
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-neutral-400"
                    />
                    <span>{candidate.location}</span>
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      candidate.availability === "Available"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {candidate.availability}
                  </span>

                  <Sparkles
                    size={18}
                    className="text-purple-600"
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCandidate(candidate)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-3 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Eye size={17} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInvite(candidate)}
                    disabled={
                      candidate.availability !== "Available"
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <UserCheck size={17} />
                    Invite
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Search size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No candidates found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search query or candidate filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {sortedCandidates.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + candidatesPerPage,
                  sortedCandidates.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {sortedCandidates.length}
              </span>{" "}
              candidates
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={19} />
              </button>

              <span className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        )}
      </section>

      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {selectedCandidate.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedCandidate.name}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedCandidate.rolePreference}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Mail size={16} />
                    Email
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedCandidate.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPin size={16} />
                    Location
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedCandidate.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <GraduationCap size={16} />
                    Academic
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedCandidate.cgpa} CGPA ·{" "}
                    {selectedCandidate.graduationYear}
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-purple-600">
                    <Sparkles size={16} />
                    Resume Match
                  </p>

                  <p className="mt-2 text-2xl font-bold text-purple-700">
                    {selectedCandidate.resumeScore}/100
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Candidate Summary
                </h3>

                <p className="mt-3 leading-7 text-neutral-600">
                  {selectedCandidate.summary}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Education
                </h3>

                <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                  <p className="font-bold text-neutral-900">
                    {selectedCandidate.college}
                  </p>

                  <p className="mt-2 text-sm text-neutral-600">
                    {selectedCandidate.branch}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Experience
                </h3>

                <p className="mt-3 text-neutral-600">
                  {selectedCandidate.experience}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() =>
                  toggleSavedCandidate(selectedCandidate.id)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                <Bookmark
                  size={18}
                  className={
                    selectedCandidate.saved ? "fill-current" : ""
                  }
                />
                {selectedCandidate.saved
                  ? "Remove Saved"
                  : "Save Candidate"}
              </button>

              <button
                type="button"
                onClick={() => handleInvite(selectedCandidate)}
                disabled={
                  selectedCandidate.availability !== "Available"
                }
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
              >
                <UserCheck size={18} />
                Invite Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateSearch;