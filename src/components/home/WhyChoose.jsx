const dashboardMetrics = [
  {
    label: 'Resume Match Score',
    value: '96%',
    width: 'w-[96%]',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    label: 'Hiring Accuracy',
    value: '98%',
    width: 'w-[98%]',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    label: 'Placement Success',
    value: '94%',
    width: 'w-[94%]',
    gradient: 'from-purple-500 to-purple-600',
  },
];

const floatingCards = [
  {
    label: 'AI Matching',
    position: 'absolute -left-4 top-8 sm:-left-8',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    label: 'Live Interviews',
    position: 'absolute -right-3 top-20 sm:-right-6',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    label: 'Analytics',
    position: 'absolute -bottom-4 left-1/2 -translate-x-1/2 sm:bottom-0',
    gradient: 'from-purple-500 to-blue-600',
  },
];

const benefits = [
  {
    title: 'AI Resume Intelligence',
    description:
      'Automatically evaluates resumes and provides personalized recommendations.',
    icon: 'AI',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Automated Recruitment Workflow',
    description:
      'Manage hiring from job posting to final selection in one platform.',
    icon: 'WF',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Track hiring performance and placement statistics instantly.',
    icon: 'RT',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Role-Based Dashboards',
    description:
      'Dedicated experiences for students, recruiters, placement officers, and administrators.',
    icon: 'RB',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Enterprise Security',
    description:
      'Secure authentication, encrypted data, and role-based access control.',
    icon: 'ES',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Scalable Cloud Platform',
    description:
      'Built to support universities of every size with high performance.',
    icon: 'SC',
    gradient: 'from-blue-600 to-purple-600',
  },
];

function WhyChoose() {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="bg-gradient-to-b from-white via-blue-50/30 to-blue-50/50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Why Choose CampusTE
          </p>
          <h2
            id="why-choose-heading"
            className="mb-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          >
            Why Universities and Recruiters Choose CampusTE
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
            CampusTE transforms traditional placement management into an
            intelligent AI-powered ecosystem that improves recruitment
            efficiency, student success, and institutional productivity.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -right-4 bottom-12 h-32 w-32 rounded-full bg-purple-400/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-neutral-200/60 pb-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    CampusTE Insights
                  </p>
                  <p className="text-xs text-neutral-500">
                    Performance overview
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-emerald-600">
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {dashboardMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-medium text-neutral-600 sm:text-sm">
                        {metric.label}
                      </p>
                      <p className="text-lg font-bold text-neutral-900">
                        {metric.value}
                      </p>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${metric.gradient} ${metric.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {floatingCards.map((card) => (
              <div
                key={card.label}
                className={`${card.position} rounded-xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md`}
              >
                <div
                  className={`mb-1 h-1.5 w-8 rounded-full bg-gradient-to-r ${card.gradient}`}
                />
                <p className="text-xs font-semibold text-neutral-800 sm:text-sm">
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {benefits.map((benefit) => (
              <li key={benefit.title}>
                <article className="group h-full rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-blue-500/10 sm:p-6">
                  <div
                    aria-hidden="true"
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${benefit.gradient} text-xs font-bold text-white shadow-md transition-all duration-200 group-hover:scale-105 group-hover:brightness-110`}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-neutral-900 sm:text-base">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {benefit.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
