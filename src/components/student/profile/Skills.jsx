import { Code2, Plus, Pencil, Trash2 } from "lucide-react";

const skills = [
  {
    id: 1,
    name: "React",
    level: "Advanced",
  },
  {
    id: 2,
    name: "Java",
    level: "Intermediate",
  },
  {
    id: 3,
    name: "Python",
    level: "Advanced",
  },
  {
    id: 4,
    name: "SQL",
    level: "Intermediate",
  },
  {
    id: 5,
    name: "Node.js",
    level: "Beginner",
  },
];

const badgeColors = {
  Beginner: "bg-red-100 text-red-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-green-100 text-green-700",
};

function Skills() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-neutral-900">
            Skills
          </h2>

          <p className="mt-2 text-neutral-600">
            Showcase your technical and professional skills.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]">

          <Plus size={18} />

          Add Skill

        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {skills.map((skill) => (

          <div
            key={skill.id}
            className="flex items-center justify-between rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:shadow-md"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">

                <Code2 size={22} />

              </div>

              <div>

                <h3 className="font-semibold text-neutral-900">
                  {skill.name}
                </h3>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[skill.level]}`}
                >
                  {skill.level}
                </span>

              </div>

            </div>

            <div className="flex gap-2">

              <button className="rounded-lg border border-neutral-200 p-2 transition hover:bg-neutral-100">

                <Pencil size={18} />

              </button>

              <button className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50">

                <Trash2 size={18} />

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Skills;