import { GraduationCap, Plus, Pencil, Trash2 } from "lucide-react";

const educationData = [
  {
    id: 1,
    institution: "Amrita Vishwa Vidyapeetham",
    degree: "B.Tech",
    branch: "Computer Science Engineering",
    cgpa: "8.72",
    duration: "2023 - 2027",
  },
];

function Education() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-neutral-900">
            Education
          </h2>

          <p className="mt-2 text-neutral-600">
            Manage your academic qualifications.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]">

          <Plus size={18} />

          Add Education

        </button>

      </div>

      <div className="space-y-6">

        {educationData.map((education) => (

          <div
            key={education.id}
            className="rounded-xl border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">

                  <GraduationCap size={28} />

                </div>

                <div>

                  <h3 className="text-xl font-semibold text-neutral-900">
                    {education.institution}
                  </h3>

                  <p className="mt-1 text-neutral-700">
                    {education.degree} • {education.branch}
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    CGPA: {education.cgpa}
                  </p>

                  <p className="text-sm text-neutral-500">
                    {education.duration}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button className="rounded-lg border border-neutral-200 p-3 transition hover:bg-neutral-100">

                  <Pencil size={18} />

                </button>

                <button className="rounded-lg border border-red-200 p-3 text-red-600 transition hover:bg-red-50">

                  <Trash2 size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Education;