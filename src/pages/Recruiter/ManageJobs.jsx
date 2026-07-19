import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Eye,
  FilePenLine,
  FileText,
  IndianRupee,
  MapPin,
  MoreVertical,
  PlusCircle,
  Search,
  Send,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialJobs = [
  {
    id: 1,
    title: "Software Development Engineer",
    department: "Engineering",
    location: "Bengaluru",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salary: "₹8 - ₹12 LPA",
    applicants: 126,
    deadline: "2026-08-15",
    status: "Active",
    postedDate: "2026-07-10",
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    department: "Product Engineering",
    location: "Chennai",
    workMode: "On-site",
    employmentType: "Internship",
    salary: "₹25,000 / month",
    applicants: 84,
    deadline: "2026-08-05",
    status: "Active",
    postedDate: "2026-07-12",
  },
  {
    id: 3,
    title: "Data Analyst",
    department: "Data and Analytics",
    location: "Hyderabad",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salary: "₹6 - ₹9 LPA",
    applicants: 67,
    deadline: "2026-08-22",
    status: "Active",
    postedDate: "2026-07-14",
  },
  {
    id: 4,
    title: "Graduate Engineer Trainee",
    department: "Technology",
    location: "Pune",
    workMode: "On-site",
    employmentType: "Graduate Trainee",
    salary: "₹5.5 LPA",
    applicants: 0,
    deadline: "2026-09-01",
    status: "Draft",
    postedDate: "Not published",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    workMode: "Remote",
    employmentType: "Full-time",
    salary: "₹7 - ₹10 LPA",
    applicants: 93,
    deadline: "2026-07-15",
    status: "Closed",
    postedDate: "2026-06-20",
  },
  {
    id: 6,
    title: "Backend Developer",
    department: "Engineering",
    location: "Bengaluru",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salary: "₹9 - ₹14 LPA",
    applicants: 112,
    deadline: "2026-07-18",
    status: "Closed",
    postedDate: "2026-06-28",
  },
  {
    id: 7,
    title: "Cybersecurity Analyst",
    department: "Information Security",
    location: "Mumbai",
    workMode: "On-site",
    employmentType: "Full-time",
    salary: "₹7 - ₹11 LPA",
    applicants: 46,
    deadline: "2026-08-30",
    status: "Active",
    postedDate: "2026-07-16",
  },
  {
    id: 8,
    title: "Cloud Support Associate",
    department: "Cloud Operations",
    location: "Coimbatore",
    workMode: "Hybrid",
    employmentType: "Full-time",
    salary: "₹5 - ₹8 LPA",
    applicants: 0,
    deadline: "2026-09-05",
    status: "Draft",
    postedDate: "Not published",
  },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
  Closed: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 5;

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / jobsPerPage)
  );

  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  const stats = {
    active: jobs.filter((job) => job.status === "Active").length,
    drafts: jobs.filter((job) => job.status === "Draft").length,
    closed: jobs.filter((job) => job.status === "Closed").length,
    applicants: jobs.reduce(
      (total, job) => total + job.applicants,
      0
    ),
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePublish = (jobId) => {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "Active",
              postedDate: new Date().toISOString().slice(0, 10),
            }
          : job
      )
    );

    setOpenMenuId(null);
    showMessage("Job published successfully.");
  };

  const handleClose = (jobId) => {
    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "Closed",
            }
          : job
      )
    );

    setOpenMenuId(null);
    showMessage("Job closed successfully.");
  };

  const handleDuplicate = (job) => {
    const duplicatedJob = {
      ...job,
      id: Date.now(),
      title: `${job.title} Copy`,
      applicants: 0,
      status: "Draft",
      postedDate: "Not published",
    };

    setJobs((previousJobs) => [
      duplicatedJob,
      ...previousJobs,
    ]);

    setOpenMenuId(null);
    setCurrentPage(1);
    showMessage("Job duplicated as a draft.");
  };

  const handleDelete = (jobId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!shouldDelete) {
      return;
    }

    setJobs((previousJobs) =>
      previousJobs.filter((job) => job.id !== jobId)
    );

    setOpenMenuId(null);
    showMessage("Job deleted successfully.");
  };

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) =>
      Math.max(previousPage - 1, 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((previousPage) =>
      Math.min(previousPage + 1, totalPages)
    );
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <BriefcaseBusiness size={25} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Job Management
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Manage Job Openings
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Track active openings, manage drafts, review applications
                and control the recruitment lifecycle.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/recruiter/post-job")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
            >
              <PlusCircle size={19} />
              Post New Job
            </button>
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
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={22} />
            </div>

            <span className="text-sm font-semibold text-emerald-600">
              Live
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.active}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Active Jobs
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <FileText size={22} />
            </div>

            <span className="text-sm font-semibold text-amber-600">
              Pending
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.drafts}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Draft Jobs
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
              <XCircle size={22} />
            </div>

            <span className="text-sm font-semibold text-neutral-500">
              Archived
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.closed}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Closed Jobs
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Users size={22} />
            </div>

            <span className="text-sm font-semibold text-blue-600">
              Total
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.applicants}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Applicants
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Job Listings
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search, filter and manage all company job openings.
              </p>
            </div>

            <div className="relative w-full xl:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search title, department or location..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {["All", "Active", "Draft", "Closed"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusFilter(status)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  statusFilter === status
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-neutral-300 bg-white text-neutral-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Job Details
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Location
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Salary
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Applicants
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Deadline
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
              {paginatedJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <BriefcaseBusiness size={21} />
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
                          {job.title}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                          {job.department}
                        </p>

                        <p className="mt-1 text-xs text-neutral-400">
                          {job.employmentType}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                      <MapPin size={16} className="text-neutral-400" />
                      {job.location}
                    </div>

                    <p className="mt-1 pl-6 text-xs text-neutral-500">
                      {job.workMode}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                      <IndianRupee
                        size={16}
                        className="text-neutral-400"
                      />
                      {job.salary}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/recruiter/applicants")
                      }
                      className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
                    >
                      <Users size={16} />
                      {job.applicants}
                    </button>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                      <CalendarDays
                        size={16}
                        className="text-neutral-400"
                      />
                      {job.deadline}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="relative px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((previousId) =>
                          previousId === job.id ? null : job.id
                        )
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                      aria-label="Open job actions"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenuId === job.id && (
                      <div className="absolute right-6 top-14 z-20 w-52 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenuId(null);
                            showMessage(
                              `Viewing ${job.title}. Detailed job page will be connected later.`
                            );
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          <Eye size={17} />
                          View Job
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOpenMenuId(null);
                            showMessage(
                              `Editing ${job.title}. Edit page will be connected later.`
                            );
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          <FilePenLine size={17} />
                          Edit Job
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicate(job)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          <Copy size={17} />
                          Duplicate
                        </button>

                        {job.status === "Draft" && (
                          <button
                            type="button"
                            onClick={() => handlePublish(job.id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                          >
                            <Send size={17} />
                            Publish Job
                          </button>
                        )}

                        {job.status === "Active" && (
                          <button
                            type="button"
                            onClick={() => handleClose(job.id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                          >
                            <XCircle size={17} />
                            Close Job
                          </button>
                        )}

                        <div className="my-1 border-t border-neutral-100" />

                        <button
                          type="button"
                          onClick={() => handleDelete(job.id)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 size={17} />
                          Delete Job
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 lg:hidden">
          {paginatedJobs.map((job) => (
            <article
              key={job.id}
              className="rounded-2xl border border-neutral-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <BriefcaseBusiness size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {job.department}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[job.status]}`}
                >
                  {job.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  {job.location} · {job.workMode}
                </p>

                <p className="flex items-center gap-2">
                  <IndianRupee size={16} />
                  {job.salary}
                </p>

                <p className="flex items-center gap-2">
                  <Users size={16} />
                  {job.applicants} applicants
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 size={16} />
                  Deadline: {job.deadline}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    showMessage(
                      `Viewing ${job.title}. Detailed page will be connected later.`
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  type="button"
                  onClick={() => handleDuplicate(job)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Copy size={16} />
                  Duplicate
                </button>

                {job.status === "Draft" && (
                  <button
                    type="button"
                    onClick={() => handlePublish(job.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
                  >
                    <Send size={16} />
                    Publish
                  </button>
                )}

                {job.status === "Active" && (
                  <button
                    type="button"
                    onClick={() => handleClose(job.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-700"
                  >
                    <XCircle size={16} />
                    Close
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(job.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <BriefcaseBusiness size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No jobs found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search term or selected status filter.
            </p>
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + jobsPerPage,
                  filteredJobs.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={19} />
              </button>

              <span className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ManageJobs;