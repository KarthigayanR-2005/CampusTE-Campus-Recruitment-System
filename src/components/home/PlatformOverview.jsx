import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Student Portal',
    description:
      'Manage profiles, resumes, applications, interviews, certificates, and career progress.',
    icon: 'SP',
    gradient: 'from-blue-500 to-blue-600',
    glow: 'group-hover:shadow-blue-500/20',
  },
  {
    title: 'Recruiter Workspace',
    description:
      'Post jobs, shortlist candidates, schedule interviews, and manage hiring effortlessly.',
    icon: 'RW',
    gradient: 'from-indigo-500 to-purple-500',
    glow: 'group-hover:shadow-purple-500/20',
  },
  {
    title: 'Placement Officer Dashboard',
    description:
      'Manage students, placement drives, eligibility, announcements, and reports.',
    icon: 'PO',
    gradient: 'from-purple-500 to-purple-600',
    glow: 'group-hover:shadow-purple-500/25',
  },
  {
    title: 'AI Resume Analyzer',
    description:
      'Evaluate resumes using AI and provide personalized recommendations for improvement.',
    icon: 'AI',
    gradient: 'from-blue-600 to-indigo-600',
    glow: 'group-hover:shadow-indigo-500/20',
  },
  {
    title: 'Placement Drive Management',
    description:
      'Create, organize, monitor, and automate campus recruitment drives.',
    icon: 'PD',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  {
    title: 'Analytics & Reports',
    description:
      'Visualize placement statistics, hiring trends, recruiter engagement, and student performance.',
    icon: 'AR',
    gradient: 'from-blue-600 to-purple-600',
    glow: 'group-hover:shadow-blue-500/25',
  },
];

function PlatformOverview() {
  return (
    <section
      aria-labelledby="platform-overview-heading"
      className="bg-gradient-to-b from-blue-50/40 via-white to-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Platform Overview
          </p>
          <h2
            id="platform-overview-heading"
            className="mb-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          >
            Everything You Need to Modernize Campus Recruitment
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
            CampusTE brings students, recruiters, placement officers, and
            administrators together in one intelligent platform powered by AI
            and automation.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <li key={feature.title}>
              <article
                className={`group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl ${feature.glow} sm:p-8`}
              >
                <div
                  aria-hidden="true"
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-sm font-bold text-white shadow-md transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:brightness-110`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {feature.description}
                </p>
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                >
                  Learn More
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PlatformOverview;
