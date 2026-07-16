import { Eye } from "lucide-react";

const applications = [
  {
    company: "Google",
    role: "Software Engineer Intern",
    appliedOn: "12 Jul 2026",
    status: "Shortlisted",
  },
  {
    company: "Microsoft",
    role: "Frontend Developer",
    appliedOn: "10 Jul 2026",
    status: "Interview",
  },
  {
    company: "Amazon",
    role: "SDE Intern",
    appliedOn: "08 Jul 2026",
    status: "Applied",
  },
  {
    company: "Zoho",
    role: "Software Developer",
    appliedOn: "05 Jul 2026",
    status: "Rejected",
  },
];

const statusStyles = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Selected: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

function RecentApplications() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-neutral-900">
          Recent Applications
        </h2>

        <p className="mt-1 text-neutral-600">
          Track the status of your latest job applications.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-neutral-200 text-left">

              <th className="pb-3 font-semibold text-neutral-700">
                Company
              </th>

              <th className="pb-3 font-semibold text-neutral-700">
                Role
              </th>

              <th className="pb-3 font-semibold text-neutral-700">
                Applied On
              </th>

              <th className="pb-3 font-semibold text-neutral-700">
                Status
              </th>

              <th className="pb-3 font-semibold text-neutral-700">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((application) => (

              <tr
                key={`${application.company}-${application.role}`}
                className="border-b border-neutral-100 hover:bg-neutral-50"
              >

                <td className="py-4 font-medium text-neutral-900">
                  {application.company}
                </td>

                <td className="py-4 text-neutral-600">
                  {application.role}
                </td>

                <td className="py-4 text-neutral-600">
                  {application.appliedOn}
                </td>

                <td className="py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status]}`}
                  >
                    {application.status}
                  </span>

                </td>

                <td className="py-4">

                  <button className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm transition hover:bg-neutral-100">

                    <Eye size={16} />

                    View

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default RecentApplications;