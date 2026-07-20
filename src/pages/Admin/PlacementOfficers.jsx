import { useMemo, useState } from "react";
import {
  Ban,
  Building2,
  CheckCircle2,
  Download,
  Eye,
  Mail,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserCog,
  Users,
  X,
} from "lucide-react";

const initialPlacementOfficers = [
  {
    id: 1,
    name: "Dr. Meenakshi Rao",
    email: "placement@campuste.edu",
    phone: "+91 98844 77221",
    employeeId: "PO-2026-001",
    designation: "Director of Placements",
    department: "Career Development Centre",
    institution: "CampusTE Institute of Technology",
    institutionCode: "CTE-CBE-001",
    location: "Coimbatore, Tamil Nadu",
    status: "Active",
    verification: "Verified",
    studentsManaged: 1248,
    activeDrives: 18,
    recruitersManaged: 86,
    studentsPlaced: 539,
    joinedDate: "2025-08-10",
  },
  {
    id: 2,
    name: "Prof. Arun Kumar",
    email: "arun.kumar@greenfield.edu",
    phone: "+91 97772 31145",
    employeeId: "PO-2026-034",
    designation: "Placement Officer",
    department: "Training and Placement Cell",
    institution: "Greenfield Institute of Technology",
    institutionCode: "GIT-SLM-014",
    location: "Salem, Tamil Nadu",
    status: "Pending",
    verification: "Pending",
    studentsManaged: 0,
    activeDrives: 0,
    recruitersManaged: 0,
    studentsPlaced: 0,
    joinedDate: "2026-07-19",
  },
  {
    id: 3,
    name: "Dr. Ramesh Narayanan",
    email: "ramesh.n@metroengineering.edu",
    phone: "+91 94444 88110",
    employeeId: "PO-2026-011",
    designation: "Head of Placements",
    department: "Placement and Corporate Relations",
    institution: "Metro Engineering College",
    institutionCode: "MEC-MDU-008",
    location: "Madurai, Tamil Nadu",
    status: "Active",
    verification: "Verified",
    studentsManaged: 1124,
    activeDrives: 14,
    recruitersManaged: 64,
    studentsPlaced: 426,
    joinedDate: "2025-06-25",
  },
  {
    id: 4,
    name: "Prof. Vikram Singh",
    email: "vikram.singh@horizonuniversity.edu",
    phone: "+91 99000 77665",
    employeeId: "PO-2026-021",
    designation: "Associate Director – Career Services",
    department: "Career Services",
    institution: "Horizon University",
    institutionCode: "HU-BLR-021",
    location: "Bengaluru, Karnataka",
    status: "Active",
    verification: "Verified",
    studentsManaged: 2168,
    activeDrives: 26,
    recruitersManaged: 132,
    studentsPlaced: 984,
    joinedDate: "2025-03-20",
  },
  {
    id: 5,
    name: "Prof. Neha Kulkarni",
    email: "neha.kulkarni@westerntech.edu",
    phone: "+91 96660 44228",
    employeeId: "PO-2026-031",
    designation: "Training and Placement Officer",
    department: "Training and Placement",
    institution: "Western Technical College",
    institutionCode: "WTC-PNE-031",
    location: "Pune, Maharashtra",
    status: "Suspended",
    verification: "Verified",
    studentsManaged: 1056,
    activeDrives: 0,
    recruitersManaged: 58,
    studentsPlaced: 311,
    joinedDate: "2025-11-22",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  employeeId: "",
  designation: "",
  department: "",
  institution: "",
  institutionCode: "",
  location: "",
};

const statusStyles = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Suspended: "border-rose-200 bg-rose-50 text-rose-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

const verificationStyles = {
  Verified: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-rose-50 text-rose-700",
};

function PlacementOfficers() {
  const [officers, setOfficers] = useState(
    initialPlacementOfficers
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Statuses");
  const [selectedOfficer, setSelectedOfficer] =
    useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [officerForm, setOfficerForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const filteredOfficers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return officers.filter((officer) => {
      const matchesSearch =
        officer.name.toLowerCase().includes(query) ||
        officer.email.toLowerCase().includes(query) ||
        officer.employeeId.toLowerCase().includes(query) ||
        officer.institution.toLowerCase().includes(query) ||
        officer.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        officer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [officers, searchTerm, statusFilter]);

  const statistics = {
    total: officers.length,
    active: officers.filter(
      (officer) => officer.status === "Active"
    ).length,
    pending: officers.filter(
      (officer) => officer.verification === "Pending"
    ).length,
    suspended: officers.filter(
      (officer) => officer.status === "Suspended"
    ).length,
  };

  const showStatusMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const updateOfficer = (officerId, updates) => {
    setOfficers((previousOfficers) =>
      previousOfficers.map((officer) =>
        officer.id === officerId
          ? { ...officer, ...updates }
          : officer
      )
    );

    setSelectedOfficer((previousOfficer) =>
      previousOfficer?.id === officerId
        ? { ...previousOfficer, ...updates }
        : previousOfficer
    );
  };

  const verifyOfficer = (officerId) => {
    updateOfficer(officerId, {
      verification: "Verified",
      status: "Active",
    });

    showStatusMessage(
      "Placement officer verified successfully."
    );
  };

  const suspendOfficer = (officerId) => {
    updateOfficer(officerId, {
      status: "Suspended",
    });

    showStatusMessage("Placement officer account suspended.");
  };

  const activateOfficer = (officerId) => {
    updateOfficer(officerId, {
      status: "Active",
    });

    showStatusMessage("Placement officer account activated.");
  };

  const deleteOfficer = (officerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this placement officer?"
    );

    if (!confirmed) {
      return;
    }

    setOfficers((previousOfficers) =>
      previousOfficers.filter(
        (officer) => officer.id !== officerId
      )
    );

    setSelectedOfficer(null);
    showStatusMessage("Placement officer removed.");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setOfficerForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleAddOfficer = (event) => {
    event.preventDefault();

    if (
      !officerForm.name.trim() ||
      !officerForm.email.trim() ||
      !officerForm.employeeId.trim() ||
      !officerForm.designation.trim() ||
      !officerForm.institution.trim()
    ) {
      showStatusMessage(
        "Complete all required placement officer fields."
      );
      return;
    }

    const duplicateEmail = officers.some(
      (officer) =>
        officer.email.toLowerCase() ===
        officerForm.email.toLowerCase()
    );

    if (duplicateEmail) {
      showStatusMessage(
        "A placement officer with this email already exists."
      );
      return;
    }

    const newOfficer = {
      id: Date.now(),
      ...officerForm,
      status: "Pending",
      verification: "Pending",
      studentsManaged: 0,
      activeDrives: 0,
      recruitersManaged: 0,
      studentsPlaced: 0,
      joinedDate: new Date().toISOString().slice(0, 10),
    };

    setOfficers((previousOfficers) => [
      newOfficer,
      ...previousOfficers,
    ]);

    setOfficerForm(emptyForm);
    setShowAddModal(false);

    showStatusMessage(
      "Placement officer added for verification."
    );
  };

  const exportOfficers = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Employee ID",
      "Designation",
      "Department",
      "Institution",
      "Institution Code",
      "Location",
      "Status",
      "Verification",
      "Students Managed",
      "Active Drives",
      "Recruiters Managed",
      "Students Placed",
      "Joined Date",
    ];

    const rows = officers.map((officer) => [
      officer.name,
      officer.email,
      officer.phone,
      officer.employeeId,
      officer.designation,
      officer.department,
      officer.institution,
      officer.institutionCode,
      officer.location,
      officer.status,
      officer.verification,
      officer.studentsManaged,
      officer.activeDrives,
      officer.recruitersManaged,
      officer.studentsPlaced,
      officer.joinedDate,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const file = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = "campuste-placement-officers.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);

    showStatusMessage(
      "Placement officer data exported successfully."
    );
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <UserCog size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Institution Administration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Placement Officers
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Verify placement officer accounts, manage access and
                monitor placement activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={exportOfficers}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20"
              >
                <Download size={18} />
                Export
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
              >
                <Plus size={18} />
                Add Officer
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className="flex items-center gap-3 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-800 sm:px-8">
            <CheckCircle2 size={19} />
            {message}
          </div>
        )}
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <UserCog
            size={23}
            className="text-blue-700"
          />

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {statistics.total}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Registered Officers
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <UserCheck
            size={23}
            className="text-emerald-700"
          />

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {statistics.active}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Active Officers
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <ShieldCheck
            size={23}
            className="text-amber-700"
          />

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {statistics.pending}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Pending Verification
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <Ban
            size={23}
            className="text-rose-700"
          />

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {statistics.suspended}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            Suspended Officers
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search officer, institution, email or ID..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                  Officer
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                  Institution
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                  Activity
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                  Verification
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOfficers.map((officer) => (
                <tr
                  key={officer.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="px-6 py-5">
                    <p className="font-bold text-neutral-900">
                      {officer.name}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      {officer.designation}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                      <Mail size={13} />
                      {officer.email}
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      {officer.employeeId}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-bold text-neutral-900">
                      {officer.institution}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      {officer.department}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                      <MapPin size={13} />
                      {officer.location}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="rounded-xl bg-blue-50 p-2">
                        <p className="font-bold text-blue-700">
                          {officer.studentsManaged}
                        </p>
                        <p className="text-xs text-blue-600">
                          Students
                        </p>
                      </div>

                      <div className="rounded-xl bg-purple-50 p-2">
                        <p className="font-bold text-purple-700">
                          {officer.activeDrives}
                        </p>
                        <p className="text-xs text-purple-600">
                          Drives
                        </p>
                      </div>

                      <div className="rounded-xl bg-amber-50 p-2">
                        <p className="font-bold text-amber-700">
                          {officer.recruitersManaged}
                        </p>
                        <p className="text-xs text-amber-600">
                          Recruiters
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50 p-2">
                        <p className="font-bold text-emerald-700">
                          {officer.studentsPlaced}
                        </p>
                        <p className="text-xs text-emerald-600">
                          Placed
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        verificationStyles[
                          officer.verification
                        ]
                      }`}
                    >
                      {officer.verification}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[officer.status]
                      }`}
                    >
                      {officer.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedOfficer(officer)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-blue-700 hover:bg-blue-50"
                        aria-label="View officer"
                      >
                        <Eye size={18} />
                      </button>

                      {officer.verification !== "Verified" && (
                        <button
                          type="button"
                          onClick={() =>
                            verifyOfficer(officer.id)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-50"
                          aria-label="Verify officer"
                        >
                          <UserCheck size={18} />
                        </button>
                      )}

                      {officer.status === "Active" ? (
                        <button
                          type="button"
                          onClick={() =>
                            suspendOfficer(officer.id)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-amber-700 hover:bg-amber-50"
                          aria-label="Suspend officer"
                        >
                          <Ban size={18} />
                        </button>
                      ) : (
                        officer.verification === "Verified" && (
                          <button
                            type="button"
                            onClick={() =>
                              activateOfficer(officer.id)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-emerald-700 hover:bg-emerald-50"
                            aria-label="Activate officer"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteOfficer(officer.id)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-rose-700 hover:bg-rose-50"
                        aria-label="Delete officer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOfficers.length === 0 && (
          <div className="py-16 text-center">
            <UserCog
              size={34}
              className="mx-auto text-neutral-400"
            />

            <h3 className="mt-4 text-lg font-bold text-neutral-900">
              No placement officers found
            </h3>
          </div>
        )}
      </section>

      {selectedOfficer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {selectedOfficer.name}
                </h2>

                <p className="mt-1 text-neutral-600">
                  {selectedOfficer.designation}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOfficer(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-sm text-neutral-500">
                  Institution
                </p>
                <p className="mt-1 font-bold text-neutral-900">
                  {selectedOfficer.institution}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-sm text-neutral-500">
                  Employee ID
                </p>
                <p className="mt-1 font-bold text-neutral-900">
                  {selectedOfficer.employeeId}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-sm text-neutral-500">
                  Email
                </p>
                <p className="mt-1 break-all font-bold text-neutral-900">
                  {selectedOfficer.email}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-sm text-neutral-500">
                  Phone
                </p>
                <p className="mt-1 font-bold text-neutral-900">
                  {selectedOfficer.phone}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-sm text-neutral-500">
                  Location
                </p>
                <p className="mt-1 font-bold text-neutral-900">
                  {selectedOfficer.location}
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-sm text-neutral-500">
                  Joined Date
                </p>
                <p className="mt-1 font-bold text-neutral-900">
                  {selectedOfficer.joinedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4">
          <form
            onSubmit={handleAddOfficer}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Add Placement Officer
                </h2>

                <p className="mt-1 text-sm text-neutral-600">
                  Register a new placement officer account.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setOfficerForm(emptyForm);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              {[
                ["name", "Full Name", "Dr. Ramesh Kumar"],
                [
                  "email",
                  "Official Email",
                  "officer@institution.edu",
                ],
                ["phone", "Phone Number", "+91 98765 43210"],
                ["employeeId", "Employee ID", "PO-2026-041"],
                [
                  "designation",
                  "Designation",
                  "Placement Officer",
                ],
                [
                  "department",
                  "Department",
                  "Training and Placement",
                ],
                [
                  "institution",
                  "Institution",
                  "Institution name",
                ],
                [
                  "institutionCode",
                  "Institution Code",
                  "CTE-CBE-001",
                ],
                ["location", "Location", "City, State"],
              ].map(([name, label, placeholder]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    {label}
                  </label>

                  <input
                    type={name === "email" ? "email" : "text"}
                    name={name}
                    value={officerForm[name]}
                    onChange={handleFormChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setOfficerForm(emptyForm);
                }}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Officer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacementOfficers;