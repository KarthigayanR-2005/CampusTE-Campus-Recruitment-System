import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Trash2,
  Upload,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  X,
} from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "Arjun Kumar",
    registerNumber: "CB.EN.U4CSE23001",
    email: "arjun.kumar@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science and Engineering",
    batch: "2023 - 2027",
    cgpa: 8.9,
    backlogs: 0,
    placementStatus: "Placed",
    eligibility: "Eligible",
    company: "TechNova Solutions",
    package: "₹10.5 LPA",
    skills: ["Java", "React", "Node.js", "MySQL"],
    location: "Coimbatore, Tamil Nadu",
    profileCompletion: 96,
  },
  {
    id: 2,
    name: "Priya Sharma",
    registerNumber: "CB.EN.U4CSE23014",
    email: "priya.sharma@college.edu",
    phone: "+91 91234 56780",
    department: "Computer Science and Engineering",
    batch: "2023 - 2027",
    cgpa: 9.2,
    backlogs: 0,
    placementStatus: "Interview",
    eligibility: "Eligible",
    company: "-",
    package: "-",
    skills: ["React", "JavaScript", "Figma", "TypeScript"],
    location: "Chennai, Tamil Nadu",
    profileCompletion: 92,
  },
  {
    id: 3,
    name: "Rahul Menon",
    registerNumber: "CB.EN.U4AIE23008",
    email: "rahul.menon@college.edu",
    phone: "+91 99887 66554",
    department: "Artificial Intelligence and Data Science",
    batch: "2023 - 2027",
    cgpa: 8.6,
    backlogs: 0,
    placementStatus: "Applied",
    eligibility: "Eligible",
    company: "-",
    package: "-",
    skills: ["Python", "Pandas", "Power BI", "SQL"],
    location: "Kochi, Kerala",
    profileCompletion: 88,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    registerNumber: "CB.EN.U4ECE23021",
    email: "sneha.reddy@college.edu",
    phone: "+91 90000 11223",
    department: "Electronics and Communication Engineering",
    batch: "2023 - 2027",
    cgpa: 7.4,
    backlogs: 1,
    placementStatus: "Not Applied",
    eligibility: "Eligible",
    company: "-",
    package: "-",
    skills: ["C++", "Embedded Systems", "MATLAB"],
    location: "Hyderabad, Telangana",
    profileCompletion: 74,
  },
  {
    id: 5,
    name: "Kavin Raj",
    registerNumber: "CB.EN.U4EEE23011",
    email: "kavin.raj@college.edu",
    phone: "+91 98844 77221",
    department: "Electrical and Electronics Engineering",
    batch: "2023 - 2027",
    cgpa: 6.2,
    backlogs: 2,
    placementStatus: "Not Applied",
    eligibility: "Not Eligible",
    company: "-",
    package: "-",
    skills: ["Electrical Systems", "AutoCAD", "Python"],
    location: "Coimbatore, Tamil Nadu",
    profileCompletion: 61,
  },
  {
    id: 6,
    name: "Meera Nair",
    registerNumber: "CB.EN.U4CSE23029",
    email: "meera.nair@college.edu",
    phone: "+91 97772 31145",
    department: "Computer Science and Engineering",
    batch: "2023 - 2027",
    cgpa: 9.0,
    backlogs: 0,
    placementStatus: "Shortlisted",
    eligibility: "Eligible",
    company: "-",
    package: "-",
    skills: ["Cybersecurity", "Linux", "Wireshark", "Python"],
    location: "Kochi, Kerala",
    profileCompletion: 94,
  },
  {
    id: 7,
    name: "Vikram Singh",
    registerNumber: "CB.EN.U4IT23018",
    email: "vikram.singh@college.edu",
    phone: "+91 96661 27890",
    department: "Information Technology",
    batch: "2023 - 2027",
    cgpa: 8.7,
    backlogs: 0,
    placementStatus: "Placed",
    eligibility: "Eligible",
    company: "DataCraft Analytics",
    package: "₹8.8 LPA",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
    location: "Bengaluru, Karnataka",
    profileCompletion: 98,
  },
  {
    id: 8,
    name: "Divya Krishnan",
    registerNumber: "CB.EN.U4CSE23036",
    email: "divya.krishnan@college.edu",
    phone: "+91 95555 22441",
    department: "Computer Science and Engineering",
    batch: "2023 - 2027",
    cgpa: 8.3,
    backlogs: 0,
    placementStatus: "Applied",
    eligibility: "Eligible",
    company: "-",
    package: "-",
    skills: ["HTML", "CSS", "React", "TypeScript"],
    location: "Chennai, Tamil Nadu",
    profileCompletion: 86,
  },
  {
    id: 9,
    name: "Sanjay Krishnan",
    registerNumber: "CB.EN.U4AIE23016",
    email: "sanjay.krishnan@college.edu",
    phone: "+91 94444 66552",
    department: "Artificial Intelligence and Data Science",
    batch: "2023 - 2027",
    cgpa: 9.4,
    backlogs: 0,
    placementStatus: "Placed",
    eligibility: "Eligible",
    company: "Infosphere Technologies",
    package: "₹12 LPA",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    location: "Tiruchirappalli, Tamil Nadu",
    profileCompletion: 100,
  },
];

const departmentOptions = [
  "All Departments",
  "Computer Science and Engineering",
  "Information Technology",
  "Artificial Intelligence and Data Science",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
];

const placementStatusStyles = {
  Placed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Interview: "border-purple-200 bg-purple-50 text-purple-700",
  Shortlisted: "border-cyan-200 bg-cyan-50 text-cyan-700",
  Applied: "border-blue-200 bg-blue-50 text-blue-700",
  "Not Applied": "border-neutral-200 bg-neutral-100 text-neutral-600",
};

const eligibilityStyles = {
  Eligible: "bg-emerald-50 text-emerald-700",
  "Not Eligible": "bg-rose-50 text-rose-700",
};

const emptyStudentForm = {
  name: "",
  registerNumber: "",
  email: "",
  phone: "",
  department: "Computer Science and Engineering",
  batch: "2023 - 2027",
  cgpa: "",
  backlogs: "0",
  location: "",
};

function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");
  const [placementFilter, setPlacementFilter] = useState("All");
  const [eligibilityFilter, setEligibilityFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentForm, setStudentForm] = useState(emptyStudentForm);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 6;

  const filteredStudents = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.registerNumber.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        student.department === departmentFilter;

      const matchesPlacement =
        placementFilter === "All" ||
        student.placementStatus === placementFilter;

      const matchesEligibility =
        eligibilityFilter === "All" ||
        student.eligibility === eligibilityFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesPlacement &&
        matchesEligibility
      );
    });
  }, [
    departmentFilter,
    eligibilityFilter,
    placementFilter,
    searchTerm,
    students,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );

  const startIndex = (currentPage - 1) * studentsPerPage;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const stats = {
    total: students.length,
    eligible: students.filter(
      (student) => student.eligibility === "Eligible"
    ).length,
    placed: students.filter(
      (student) => student.placementStatus === "Placed"
    ).length,
    unplaced: students.filter(
      (student) => student.placementStatus !== "Placed"
    ).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("All Departments");
    setPlacementFilter("All");
    setEligibilityFilter("All");
    setCurrentPage(1);
  };

  const updatePlacementStatus = (studentId, placementStatus) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              placementStatus,
            }
          : student
      )
    );

    setSelectedStudent((previousStudent) =>
      previousStudent?.id === studentId
        ? {
            ...previousStudent,
            placementStatus,
          }
        : previousStudent
    );

    setOpenMenuId(null);
    showMessage(`Student marked as ${placementStatus}.`);
  };

  const toggleEligibility = (studentId) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              eligibility:
                student.eligibility === "Eligible"
                  ? "Not Eligible"
                  : "Eligible",
            }
          : student
      )
    );

    setSelectedStudent((previousStudent) =>
      previousStudent?.id === studentId
        ? {
            ...previousStudent,
            eligibility:
              previousStudent.eligibility === "Eligible"
                ? "Not Eligible"
                : "Eligible",
          }
        : previousStudent
    );

    setOpenMenuId(null);
    showMessage("Student eligibility updated.");
  };

  const deleteStudent = (studentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this student?"
    );

    if (!confirmed) {
      return;
    }

    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== studentId)
    );

    setSelectedStudent(null);
    setOpenMenuId(null);
    showMessage("Student removed successfully.");
  };

  const handleStudentFormChange = (event) => {
    const { name, value } = event.target;

    setStudentForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleAddStudent = (event) => {
    event.preventDefault();

    if (
      !studentForm.name.trim() ||
      !studentForm.registerNumber.trim() ||
      !studentForm.email.trim() ||
      !studentForm.cgpa
    ) {
      showMessage(
        "Complete the required student registration fields."
      );
      return;
    }

    const cgpa = Number(studentForm.cgpa);
    const backlogs = Number(studentForm.backlogs);

    const newStudent = {
      id: Date.now(),
      ...studentForm,
      cgpa,
      backlogs,
      placementStatus: "Not Applied",
      eligibility:
        cgpa >= 6.5 && backlogs <= 1
          ? "Eligible"
          : "Not Eligible",
      company: "-",
      package: "-",
      skills: [],
      profileCompletion: 45,
    };

    setStudents((previousStudents) => [
      newStudent,
      ...previousStudents,
    ]);

    setStudentForm(emptyStudentForm);
    setShowAddStudent(false);
    setCurrentPage(1);
    showMessage("Student registered successfully.");
  };

  const handleExport = () => {
    const headers = [
      "Name",
      "Register Number",
      "Email",
      "Department",
      "CGPA",
      "Backlogs",
      "Eligibility",
      "Placement Status",
      "Company",
      "Package",
    ];

    const rows = students.map((student) => [
      student.name,
      student.registerNumber,
      student.email,
      student.department,
      student.cgpa,
      student.backlogs,
      student.eligibility,
      student.placementStatus,
      student.company,
      student.package,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const file = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = "placement-students.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Student report exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <GraduationCap size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Student Management
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Students
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage student records, placement eligibility,
                applications, academic information and placement
                outcomes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  showMessage(
                    "Bulk student upload will be connected to spreadsheet import."
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Upload size={19} />
                Import Students
              </button>

              <button
                type="button"
                onClick={() => setShowAddStudent(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <UserPlus size={19} />
                Add Student
              </button>
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
            Registered Students
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
            <UserCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.eligible}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Eligible Students
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.placed}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Students Placed
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <UserX size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.unplaced}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Not Yet Placed
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Student Directory
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search, filter and manage placement student records.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <Download size={18} />
                Export CSV
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
              >
                <Filter size={18} />
                Reset Filters
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_280px_210px_190px]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search name, register number, email or skill..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(event) =>
                handleFilterChange(
                  setDepartmentFilter,
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {departmentOptions.map((department) => (
                <option key={department}>{department}</option>
              ))}
            </select>

            <select
              value={placementFilter}
              onChange={(event) =>
                handleFilterChange(
                  setPlacementFilter,
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All</option>
              <option>Placed</option>
              <option>Interview</option>
              <option>Shortlisted</option>
              <option>Applied</option>
              <option>Not Applied</option>
            </select>

            <select
              value={eligibilityFilter}
              onChange={(event) =>
                handleFilterChange(
                  setEligibilityFilter,
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All</option>
              <option>Eligible</option>
              <option>Not Eligible</option>
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1250px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Department
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Academic
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Eligibility
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Placement Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Company
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Profile
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
                          {student.name}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                          {student.registerNumber}
                        </p>

                        <p className="mt-1 text-xs text-neutral-400">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="max-w-[220px] text-sm font-semibold text-neutral-700">
                      {student.department}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {student.batch}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-bold text-neutral-900">
                      {student.cgpa} CGPA
                    </p>

                    <p
                      className={`mt-1 text-xs font-semibold ${
                        student.backlogs === 0
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {student.backlogs} active backlog
                      {student.backlogs === 1 ? "" : "s"}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        eligibilityStyles[student.eligibility]
                      }`}
                    >
                      {student.eligibility}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        placementStatusStyles[
                          student.placementStatus
                        ]
                      }`}
                    >
                      {student.placementStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <p className="max-w-[190px] font-semibold text-neutral-800">
                      {student.company}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {student.package}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="w-28">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">
                          Completion
                        </span>

                        <span className="font-bold text-neutral-700">
                          {student.profileCompletion}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                          style={{
                            width: `${student.profileCompletion}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="relative px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((previousId) =>
                          previousId === student.id
                            ? null
                            : student.id
                        )
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                      aria-label="Open student actions"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenuId === student.id && (
                      <div className="absolute right-6 top-14 z-20 w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStudent(student);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          <Eye size={17} />
                          View Profile
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleEligibility(student.id)
                          }
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          {student.eligibility === "Eligible" ? (
                            <UserX size={17} />
                          ) : (
                            <UserCheck size={17} />
                          )}
                          Toggle Eligibility
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updatePlacementStatus(
                              student.id,
                              "Placed"
                            )
                          }
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                          <CheckCircle2 size={17} />
                          Mark as Placed
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updatePlacementStatus(
                              student.id,
                              "Applied"
                            )
                          }
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
                        >
                          <FileText size={17} />
                          Mark as Applied
                        </button>

                        <div className="my-1 border-t border-neutral-100" />

                        <button
                          type="button"
                          onClick={() => deleteStudent(student.id)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 size={17} />
                          Remove Student
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 xl:hidden">
          {paginatedStudents.map((student) => (
            <article
              key={student.id}
              className="rounded-2xl border border-neutral-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                    {student.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {student.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {student.registerNumber}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                    placementStatusStyles[student.placementStatus]
                  }`}
                >
                  {student.placementStatus}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-neutral-600">
                <p className="flex items-start gap-2">
                  <BookOpen size={17} className="mt-0.5 shrink-0" />
                  {student.department}
                </p>

                <p className="flex items-center gap-2">
                  <GraduationCap size={17} />
                  {student.cgpa} CGPA · {student.backlogs} backlog
                  {student.backlogs === 1 ? "" : "s"}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={17} />
                  {student.location}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    eligibilityStyles[student.eligibility]
                  }`}
                >
                  {student.eligibility}
                </span>

                {student.skills.slice(0, 3).map((skill) => (
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
                  onClick={() => setSelectedStudent(student)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  type="button"
                  onClick={() => toggleEligibility(student.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700"
                >
                  <UserCheck size={16} />
                  Eligibility
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updatePlacementStatus(student.id, "Placed")
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                >
                  <CheckCircle2 size={16} />
                  Place
                </button>

                <button
                  type="button"
                  onClick={() => deleteStudent(student.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Users size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No students found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search query or selected filters.
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

        {filteredStudents.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + studentsPerPage,
                  filteredStudents.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredStudents.length}
              </span>{" "}
              students
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
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
                aria-label="Next page"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        )}
      </section>

      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {selectedStudent.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedStudent.name}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedStudent.registerNumber}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close student profile"
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

                  <p className="mt-2 break-all font-medium text-neutral-900">
                    {selectedStudent.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Phone
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedStudent.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <GraduationCap size={16} />
                    Academic
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedStudent.cgpa} CGPA
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {selectedStudent.backlogs} active backlog
                    {selectedStudent.backlogs === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPin size={16} />
                    Location
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedStudent.location}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Education
                </h3>

                <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                  <p className="font-bold text-neutral-900">
                    {selectedStudent.department}
                  </p>

                  <p className="mt-2 text-sm text-neutral-600">
                    Batch: {selectedStudent.batch}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Technical Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedStudent.skills.length > 0 ? (
                    selectedStudent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500">
                      No skills added yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Eligibility
                  </p>

                  <p
                    className={`mt-2 font-bold ${
                      selectedStudent.eligibility === "Eligible"
                        ? "text-emerald-700"
                        : "text-rose-700"
                    }`}
                  >
                    {selectedStudent.eligibility}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Placement Status
                  </p>

                  <p className="mt-2 font-bold text-blue-700">
                    {selectedStudent.placementStatus}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Profile Completion
                  </p>

                  <p className="mt-2 font-bold text-purple-700">
                    {selectedStudent.profileCompletion}%
                  </p>
                </div>
              </div>

              {selectedStudent.placementStatus === "Placed" && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="font-bold text-emerald-900">
                    Placement Details
                  </p>

                  <p className="mt-3 text-sm text-emerald-800">
                    Company: {selectedStudent.company}
                  </p>

                  <p className="mt-1 text-sm text-emerald-800">
                    Package: {selectedStudent.package}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() =>
                  toggleEligibility(selectedStudent.id)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                <UserCheck size={18} />
                Toggle Eligibility
              </button>

              <button
                type="button"
                onClick={() =>
                  updatePlacementStatus(
                    selectedStudent.id,
                    "Placed"
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                <CheckCircle2 size={18} />
                Mark as Placed
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleAddStudent}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Add New Student
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Register a student in the placement portal.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddStudent(false);
                  setStudentForm(emptyStudentForm);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close add student form"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Student Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={studentForm.name}
                  onChange={handleStudentFormChange}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Register Number
                </label>

                <input
                  type="text"
                  name="registerNumber"
                  value={studentForm.registerNumber}
                  onChange={handleStudentFormChange}
                  placeholder="CB.EN.U4CSE23000"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={studentForm.email}
                  onChange={handleStudentFormChange}
                  placeholder="student@college.edu"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={studentForm.phone}
                  onChange={handleStudentFormChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Department
                </label>

                <select
                  name="department"
                  value={studentForm.department}
                  onChange={handleStudentFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  {departmentOptions
                    .filter(
                      (department) =>
                        department !== "All Departments"
                    )
                    .map((department) => (
                      <option key={department}>{department}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Batch
                </label>

                <input
                  type="text"
                  name="batch"
                  value={studentForm.batch}
                  onChange={handleStudentFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={studentForm.location}
                  onChange={handleStudentFormChange}
                  placeholder="City, State"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  CGPA
                </label>

                <input
                  type="number"
                  name="cgpa"
                  min="0"
                  max="10"
                  step="0.1"
                  value={studentForm.cgpa}
                  onChange={handleStudentFormChange}
                  placeholder="8.5"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Active Backlogs
                </label>

                <input
                  type="number"
                  name="backlogs"
                  min="0"
                  value={studentForm.backlogs}
                  onChange={handleStudentFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => {
                  setShowAddStudent(false);
                  setStudentForm(emptyStudentForm);
                }}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <Plus size={18} />
                Register Student
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Students;