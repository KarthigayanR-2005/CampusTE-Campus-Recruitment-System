import {
    User,
    GraduationCap,
    FileText,
    Eye,
    BadgeCheck,
  } from "lucide-react";
  
  const applicants = [
    {
      id: 1,
      name: "Karthigayan R",
      college: "Amrita Vishwa Vidyapeetham",
      cgpa: "8.92",
      skills: ["React", "Node.js", "MongoDB"],
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Arjun Kumar",
      college: "VIT Chennai",
      cgpa: "8.65",
      skills: ["Python", "Django", "SQL"],
      status: "Review",
    },
    {
      id: 3,
      name: "Priya Sharma",
      college: "SRM University",
      cgpa: "9.12",
      skills: ["Flutter", "Firebase", "Figma"],
      status: "Interview",
    },
  ];
  
  function RecentApplicants() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Recent Applicants
            </h2>
  
            <p className="mt-2 text-neutral-500">
              Latest candidates who applied for your jobs.
            </p>
          </div>
  
          <User className="text-blue-600" size={28} />
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 text-left">
                <th className="pb-4 font-semibold">Candidate</th>
                <th className="pb-4 font-semibold">College</th>
                <th className="pb-4 font-semibold">CGPA</th>
                <th className="pb-4 font-semibold">Skills</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
  
            <tbody>
              {applicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <User size={20} />
                      </div>
  
                      <div>
                        <p className="font-semibold">
                          {applicant.name}
                        </p>
  
                        <div className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
                          <GraduationCap size={14} />
                          Student
                        </div>
                      </div>
                    </div>
                  </td>
  
                  <td>{applicant.college}</td>
  
                  <td>
                    <span className="font-semibold text-green-700">
                      {applicant.cgpa}
                    </span>
                  </td>
  
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
  
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        applicant.status === "Shortlisted"
                          ? "bg-green-100 text-green-700"
                          : applicant.status === "Interview"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
  
                  <td>
                    <div className="flex justify-center gap-2">
                      <button className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700">
                        <Eye size={18} />
                      </button>
  
                      <button className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700">
                        <FileText size={18} />
                      </button>
  
                      <button className="rounded-lg bg-purple-600 p-2 text-white hover:bg-purple-700">
                        <BadgeCheck size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  
  export default RecentApplicants;