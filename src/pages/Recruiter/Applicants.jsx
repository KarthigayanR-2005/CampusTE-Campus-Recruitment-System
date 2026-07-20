import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Star,
  UserCheck,
  Users,
  UserX,
  Video,
  X,
  XCircle,
} from "lucide-react";

const initialApplicants = [
  {
    id: 1,
    name: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    phone: "+91 98765 43210",
    college: "Amrita Vishwa Vidyapeetham",
    branch: "Computer Science and Engineering",
    cgpa: 8.9,
    graduationYear: 2027,
    location: "Coimbatore, Tamil Nadu",
    job: "Software Development Engineer",
    appliedDate: "2026-07-18",
    status: "Applied",
    resumeScore: 91,
    skills: ["Java", "React", "Node.js", "MySQL"],
    experience: "6-month Web Development Internship",
    summary:
      "Computer Science student with strong full-stack development experience and excellent problem-solving skills.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 91234 56780",
    college: "PSG College of Technology",
    branch: "Information Technology",
    cgpa: 9.2,
    graduationYear: 2027,
    location: "Chennai, Tamil Nadu",
    job: "Frontend Developer Intern",
    appliedDate: "2026-07-17",
    status: "Shortlisted",
    resumeScore: 94,
    skills: ["React", "JavaScript", "Figma", "Tailwind CSS"],
    experience: "Frontend Developer Intern at a startup",
    summary:
      "Frontend-focused student skilled in building responsive and accessible web applications.",
  },
  {
    id: 3,
    name: "Rahul Menon",
    email: "rahul.menon@example.com",
    phone: "+91 99887 66554",
    college: "VIT University",
    branch: "Artificial Intelligence and Data Science",
    cgpa: 8.6,
    graduationYear: 2027,
    location: "Vellore, Tamil Nadu",
    job: "Data Analyst",
    appliedDate: "2026-07-16",
    status: "Interview",
    resumeScore: 88,
    skills: ["Python", "Pandas", "Power BI", "SQL"],
    experience: "Data Analytics Internship",
    summary:
      "Data analytics student experienced in data visualization, dashboard creation and predictive modelling.",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phone: "+91 90000 11223",
    college: "SRM Institute of Science and Technology",
    branch: "Computer Science and Engineering",
    cgpa: 8.4,
    graduationYear: 2027,
    location: "Hyderabad, Telangana",
    job: "Software Development Engineer",
    appliedDate: "2026-07-15",
    status: "Rejected",
    resumeScore: 72,
    skills: ["C++", "Java", "Spring Boot", "MongoDB"],
    experience: "Academic project experience",
    summary:
      "Computer Science student interested in backend engineering and distributed systems.",
  },
  {
    id: 5,
    name: "Kavin Raj",
    email: "kavin.raj@example.com",
    phone: "+91 98844 77221",
    college: "Kumaraguru College of Technology",
    branch: "Electronics and Communication Engineering",
    cgpa: 8.1,
    graduationYear: 2027,
    location: "Coimbatore, Tamil Nadu",
    job: "Cloud Support Associate",
    appliedDate: "2026-07-14",
    status: "Applied",
    resumeScore: 79,
    skills: ["AWS", "Linux", "Networking", "Python"],
    experience: "AWS Cloud Virtual Internship",
    summary:
      "Cloud enthusiast with practical knowledge of Linux administration, networking and AWS services.",
  },
  {
    id: 6,
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 97772 31145",
    college: "Cochin University of Science and Technology",
    branch: "Information Technology",
    cgpa: 9.0,
    graduationYear: 2027,
    location: "Kochi, Kerala",
    job: "Cybersecurity Analyst",
    appliedDate: "2026-07-13",
    status: "Shortlisted",
    resumeScore: 92,
    skills: ["Cybersecurity", "Linux", "Wireshark", "Python"],
    experience: "Security Operations Internship",
    summary:
      "Cybersecurity student with experience in network monitoring, vulnerability analysis and incident reporting.",
  },
  {
    id: 7,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 96661 27890",
    college: "Manipal Institute of Technology",
    branch: "Computer Science and Engineering",
    cgpa: 8.7,
    graduationYear: 2027,
    location: "Manipal, Karnataka",
    job: "Backend Developer",
    appliedDate: "2026-07-12",
    status: "Interview",
    resumeScore: 90,
    skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
    experience: "Backend Engineering Internship",
    summary:
      "Backend developer experienced in REST APIs, database design, caching and scalable server-side systems.",
  },
  {
    id: 8,
    name: "Divya Krishnan",
    email: "divya.krishnan@example.com",
    phone: "+91 95555 22441",
    college: "Anna University",
    branch: "Computer Science and Engineering",
    cgpa: 8.3,
    graduationYear: 2027,
    location: "Chennai, Tamil Nadu",
    job: "Frontend Developer Intern",
    appliedDate: "2026-07-11",
    status: "Applied",
    resumeScore: 84,
    skills: ["HTML", "CSS", "React", "TypeScript"],
    experience: "Freelance web development experience",
    summary:
      "Frontend developer with strong attention to interface design, usability and responsive layouts.",
  },
];

const statusStyles = {
  Applied: "border-blue-200 bg-blue-50 text-blue-700",
  Shortlisted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Interview: "border-purple-200 bg-purple-50 text-purple-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

function Applicants() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("All Jobs");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [interviewApplicant, setInterviewApplicant] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    date: "",
    time: "",
    mode: "Google Meet",
    interviewer: "",
  });
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const applicantsPerPage = 5;

  const jobOptions = useMemo(
    () => [...new Set(applicants.map((applicant) => applicant.job))],
    [applicants]
  );

  const filteredApplicants = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return applicants.filter((applicant) => {
      const matchesSearch =
        applicant.name.toLowerCase().includes(normalizedSearch) ||
        applicant.email.toLowerCase().includes(normalizedSearch) ||
        applicant.college.toLowerCase().includes(normalizedSearch) ||
        applicant.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch)
        );

      const matchesJob =
        jobFilter === "All Jobs" || applicant.job === jobFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        applicant.status === statusFilter;

      return matchesSearch && matchesJob && matchesStatus;
    });
  }, [applicants, jobFilter, searchTerm, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplicants.length / applicantsPerPage)
  );

  const startIndex = (currentPage - 1) * applicantsPerPage;

  const paginatedApplicants = filteredApplicants.slice(
    startIndex,
    startIndex + applicantsPerPage
  );

  const stats = {
    total: applicants.length,
    shortlisted: applicants.filter(
      (applicant) => applicant.status === "Shortlisted"
    ).length,
    interviews: applicants.filter(
      (applicant) => applicant.status === "Interview"
    ).length,
    rejected: applicants.filter(
      (applicant) => applicant.status === "Rejected"
    ).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const updateApplicantStatus = (applicantId, status) => {
    setApplicants((previousApplicants) =>
      previousApplicants.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, status }
          : applicant
      )
    );

    setSelectedApplicant((previousApplicant) =>
      previousApplicant?.id === applicantId
        ? { ...previousApplicant, status }
        : previousApplicant
    );

    showMessage(`Applicant status changed to ${status}.`);
  };

  const handleScheduleInterview = (event) => {
    event.preventDefault();

    if (
      !interviewForm.date ||
      !interviewForm.time ||
      !interviewForm.interviewer.trim()
    ) {
      showMessage(
        "Enter the interview date, time and interviewer name."
      );
      return;
    }

    updateApplicantStatus(interviewApplicant.id, "Interview");
    setInterviewApplicant(null);

    setInterviewForm({
      date: "",
      time: "",
      mode: "Google Meet",
      interviewer: "",
    });

    showMessage("Interview scheduled successfully.");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleJobFilter = (event) => {
    setJobFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Users size={25} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Applicant Tracking
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Manage Applicants
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Review candidate profiles, analyse resume scores,
                shortlist suitable applicants and schedule interviews.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Sparkles size={21} className="text-yellow-300" />

                <div>
                  <p className="text-sm text-blue-100">
                    AI-ranked candidates
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {applicants.filter(
                      (applicant) => applicant.resumeScore >= 90
                    ).length}{" "}
                    strong matches
                  </p>
                </div>
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

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Users size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Applicants
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <UserCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.shortlisted}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Shortlisted
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <CalendarDays size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.interviews}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Interviews Scheduled
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <UserX size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.rejected}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Rejected
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Candidate Applications
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Search and filter applicants across all active jobs.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_260px_210px]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search candidate, college, email or skill..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={jobFilter}
              onChange={handleJobFilter}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Jobs</option>

              {jobOptions.map((job) => (
                <option key={job}>{job}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Statuses</option>
              <option>Applied</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Candidate
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Applied Role
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Academic
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Skills
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Resume Score
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedApplicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                        {applicant.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
                          {applicant.name}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                          {applicant.email}
                        </p>

                        <p className="mt-1 text-xs text-neutral-400">
                          Applied {applicant.appliedDate}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="max-w-[220px] font-semibold text-neutral-800">
                      {applicant.job}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                      <GraduationCap
                        size={17}
                        className="text-neutral-400"
                      />
                      {applicant.cgpa} CGPA
                    </div>

                    <p className="mt-1 max-w-[220px] text-xs leading-5 text-neutral-500">
                      {applicant.college}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex max-w-[240px] flex-wrap gap-2">
                      {applicant.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}

                      {applicant.skills.length > 3 && (
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                          +{applicant.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Star
                        size={17}
                        className="fill-amber-400 text-amber-400"
                      />

                      <span className="text-lg font-bold text-neutral-900">
                        {applicant.resumeScore}
                      </span>

                      <span className="text-sm text-neutral-500">
                        /100
                      </span>
                    </div>

                    <div className="mt-2 h-2 w-28 overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                        style={{
                          width: `${applicant.resumeScore}%`,
                        }}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[applicant.status]
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedApplicant(applicant)
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        aria-label="View applicant"
                      >
                        <Eye size={18} />
                      </button>

                      {applicant.status !== "Shortlisted" &&
                        applicant.status !== "Interview" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateApplicantStatus(
                                applicant.id,
                                "Shortlisted"
                              )
                            }
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                            aria-label="Shortlist applicant"
                          >
                            <UserCheck size={18} />
                          </button>
                        )}

                      {applicant.status !== "Rejected" && (
                        <button
                          type="button"
                          onClick={() =>
                            setInterviewApplicant(applicant)
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition hover:bg-purple-100"
                          aria-label="Schedule interview"
                        >
                          <CalendarPlus size={18} />
                        </button>
                      )}

                      {applicant.status !== "Rejected" && (
                        <button
                          type="button"
                          onClick={() =>
                            updateApplicantStatus(
                              applicant.id,
                              "Rejected"
                            )
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-100"
                          aria-label="Reject applicant"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 xl:hidden">
          {paginatedApplicants.map((applicant) => (
            <article
              key={applicant.id}
              className="rounded-2xl border border-neutral-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                    {applicant.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {applicant.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {applicant.college}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                    statusStyles[applicant.status]
                  }`}
                >
                  {applicant.status}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-neutral-600">
                <p className="flex items-start gap-2">
                  <BriefcaseBusiness
                    size={17}
                    className="mt-0.5 shrink-0"
                  />
                  {applicant.job}
                </p>

                <p className="flex items-center gap-2">
                  <GraduationCap size={17} />
                  {applicant.cgpa} CGPA · {applicant.branch}
                </p>

                <p className="flex items-center gap-2">
                  <Star
                    size={17}
                    className="fill-amber-400 text-amber-400"
                  />
                  Resume score: {applicant.resumeScore}/100
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {applicant.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedApplicant(applicant)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Eye size={16} />
                  View
                </button>

                {applicant.status !== "Shortlisted" &&
                  applicant.status !== "Interview" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateApplicantStatus(
                          applicant.id,
                          "Shortlisted"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                    >
                      <UserCheck size={16} />
                      Shortlist
                    </button>
                  )}

                {applicant.status !== "Rejected" && (
                  <button
                    type="button"
                    onClick={() =>
                      setInterviewApplicant(applicant)
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700"
                  >
                    <CalendarPlus size={16} />
                    Interview
                  </button>
                )}

                {applicant.status !== "Rejected" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateApplicantStatus(
                        applicant.id,
                        "Rejected"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                  >
                    <UserX size={16} />
                    Reject
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredApplicants.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Users size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No applicants found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search text or filters.
            </p>
          </div>
        )}

        {filteredApplicants.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + applicantsPerPage,
                  filteredApplicants.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredApplicants.length}
              </span>{" "}
              applicants
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

      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {selectedApplicant.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedApplicant.name}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedApplicant.job}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplicant(null)}
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
                    {selectedApplicant.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Phone
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedApplicant.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <GraduationCap size={16} />
                    Academic
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedApplicant.cgpa} CGPA ·{" "}
                    {selectedApplicant.graduationYear}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPin size={16} />
                    Location
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedApplicant.location}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Candidate Summary
                </h3>

                <p className="mt-3 leading-7 text-neutral-600">
                  {selectedApplicant.summary}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Education
                </h3>

                <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                  <p className="font-bold text-neutral-900">
                    {selectedApplicant.college}
                  </p>

                  <p className="mt-2 text-sm text-neutral-600">
                    {selectedApplicant.branch}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    CGPA: {selectedApplicant.cgpa}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedApplicant.skills.map((skill) => (
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
                  {selectedApplicant.experience}
                </p>
              </div>

              <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-neutral-900">
                      AI Resume Match Score
                    </p>

                    <p className="mt-1 text-sm text-neutral-600">
                      Based on skills, academics and role relevance.
                    </p>
                  </div>

                  <p className="text-3xl font-bold text-purple-700">
                    {selectedApplicant.resumeScore}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() =>
                  showMessage(
                    `Opening resume for ${selectedApplicant.name}.`
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                <FileText size={18} />
                View Resume
              </button>

              {selectedApplicant.status !== "Rejected" && (
                <button
                  type="button"
                  onClick={() => {
                    setInterviewApplicant(selectedApplicant);
                    setSelectedApplicant(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
                >
                  <CalendarPlus size={18} />
                  Schedule Interview
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {interviewApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleScheduleInterview}
            className="w-full max-w-xl rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Schedule Interview
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Candidate: {interviewApplicant.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInterviewApplicant(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Interview Date
                  </label>

                  <input
                    type="date"
                    value={interviewForm.date}
                    onChange={(event) =>
                      setInterviewForm((previousForm) => ({
                        ...previousForm,
                        date: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Interview Time
                  </label>

                  <input
                    type="time"
                    value={interviewForm.time}
                    onChange={(event) =>
                      setInterviewForm((previousForm) => ({
                        ...previousForm,
                        time: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Mode
                </label>

                <select
                  value={interviewForm.mode}
                  onChange={(event) =>
                    setInterviewForm((previousForm) => ({
                      ...previousForm,
                      mode: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Google Meet</option>
                  <option>Microsoft Teams</option>
                  <option>Zoom</option>
                  <option>In Person</option>
                  <option>Phone Interview</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interviewer Name
                </label>

                <input
                  type="text"
                  value={interviewForm.interviewer}
                  onChange={(event) =>
                    setInterviewForm((previousForm) => ({
                      ...previousForm,
                      interviewer: event.target.value,
                    }))
                  }
                  placeholder="Enter interviewer name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  {interviewForm.mode === "In Person" ? (
                    <MapPin
                      size={20}
                      className="mt-0.5 text-blue-700"
                    />
                  ) : (
                    <Video
                      size={20}
                      className="mt-0.5 text-blue-700"
                    />
                  )}

                  <div>
                    <p className="font-semibold text-blue-900">
                      {interviewForm.mode}
                    </p>

                    <p className="mt-1 text-sm text-blue-700">
                      Meeting details can be generated and emailed after
                      backend integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={() => setInterviewApplicant(null)}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <Clock3 size={18} />
                Schedule Interview
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Applicants;