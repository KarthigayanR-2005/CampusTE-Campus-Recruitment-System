import { Link } from "react-router-dom";

const modules = [
  {
    title: "Student Portal",
    description:
      "Manage your profile, resume, applications, interviews, certificates, and placement progress from one personalized dashboard.",
    icon: "🎓",
  },
  {
    title: "Recruiter Workspace",
    description:
      "Post jobs, shortlist candidates using AI, schedule interviews, and monitor hiring progress effortlessly.",
    icon: "💼",
  },
  {
    title: "Placement Officer",
    description:
      "Coordinate campus drives, manage eligibility, monitor student progress, and generate placement reports.",
    icon: "🏛️",
  },
  {
    title: "Admin Dashboard",
    description:
      "Manage universities, users, recruiters, permissions, and platform-wide analytics with complete control.",
    icon: "⚙️",
  },
  {
    title: "Analytics & Reports",
    description:
      "Visualize hiring trends, placement statistics, recruiter engagement, and student performance through interactive dashboards.",
    icon: "📊",
  },
  {
    title: "Communication Center",
    description:
      "Centralized announcements, notifications, interview reminders, and email automation for all stakeholders.",
    icon: "📢",
  },
];

function CoreModules() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
            Core Modules
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            One Platform.
            <span className="block text-blue-600">
              Every Stakeholder Connected.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            CampusTE provides specialized workspaces for students,
            recruiters, placement officers, and administrators while
            keeping everyone connected through one intelligent ecosystem.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {modules.map((module) => (

            <article
              key={module.title}
              className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
            >

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                {module.icon}
              </div>

              <h3 className="text-xl font-bold text-neutral-900">
                {module.title}
              </h3>

              <p className="mt-4 leading-relaxed text-neutral-600">
                {module.description}
              </p>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center font-semibold text-blue-600 transition-colors duration-300 hover:text-purple-600"
              >
                Learn More →
              </Link>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}

export default CoreModules;