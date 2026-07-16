import { Link } from 'react-router-dom';

const dashboardMetrics = [
  {
    label: 'Resume Match Score',
    value: '95%',
    width: 'w-[95%]',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    label: 'Interview Readiness',
    value: '92%',
    width: 'w-[92%]',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    label: 'Placement Success',
    value: '87%',
    width: 'w-[87%]',
    gradient: 'from-purple-500 to-purple-600',
  },
];

const floatingStats = [
  {
    value: '120+',
    label: 'Companies',
    position: 'absolute -left-6 top-16 sm:-left-10',
    accent: 'text-blue-600',
  },
  {
    value: '5000+',
    label: 'Students',
    position: 'absolute -right-4 top-8 sm:-right-8',
    accent: 'text-purple-600',
  },
  {
    value: '98%',
    label: 'Hiring Accuracy',
    position: 'absolute -bottom-6 right-6 sm:-bottom-8 sm:right-4',
    accent: 'text-white',
    filled: true,
  },
];

function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-purple-50/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-16 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 left-1/3 h-72 w-72 rounded-full bg-indigo-300/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-blue-300/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/80 via-blue-100/20 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/70 px-5 py-2 text-sm font-medium text-blue-700 shadow-md shadow-blue-500/5 backdrop-blur-md">
              <span aria-hidden="true">✨</span>
              AI-Powered Campus Recruitment Platform
            </span>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
                Transforming Campus Recruitment
                <br />
                with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>

              <p className="text-xl font-semibold leading-relaxed text-neutral-700 sm:text-2xl sm:leading-relaxed">
                Connecting Students,
                <br className="hidden sm:block" />
                Recruiters &amp;
                <br className="hidden sm:block" />
                Universities through{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Intelligent Hiring
                </span>
                .
              </p>

              <p className="mx-auto max-w-[600px] text-base leading-relaxed text-neutral-600 sm:text-lg lg:mx-0">
                CampusTE is an AI-powered placement ecosystem that intelligently
                connects students, recruiters, placement officers, and
                administrators through automated hiring workflows, resume
                intelligence, analytics, and real-time collaboration.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/register"
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 sm:w-auto"
              >
                Get Started Free
              </Link>
              <Link
                to="/features"
                className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-white/80 px-8 py-3.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 sm:w-auto"
              >
                Explore Platform
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-8 top-12 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-30 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -right-6 bottom-20 h-28 w-28 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 opacity-30 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute left-12 top-4 h-14 w-14 rounded-full border border-white/70 bg-white/50 shadow-lg backdrop-blur-md"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-24 right-16 h-10 w-10 rounded-full border border-purple-200/60 bg-purple-100/40 shadow-md backdrop-blur-sm"
            />
            <div
              aria-hidden="true"
              className="absolute right-1/3 top-2 h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-60"
            />

            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-neutral-200/60 pb-5">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    CampusTE Analytics
                  </p>
                  <p className="text-xs text-neutral-500">
                    Real-time recruitment intelligence
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-emerald-600">
                    Live
                  </span>
                </div>
              </div>

              <div className="mb-5 rounded-2xl border border-blue-100/80 bg-gradient-to-br from-blue-50/80 to-white/90 p-5 shadow-sm backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-neutral-700">
                    Resume Match Score
                  </p>
                  <p className="text-2xl font-bold text-blue-600">95%</p>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-blue-100">
                  <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                </div>
              </div>

              <div className="mb-5 rounded-2xl border border-purple-100/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  AI Recommendation
                </p>
                <p className="text-lg font-semibold text-neutral-900">
                  Excellent Candidate
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-3 py-1">
                  <div
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                  <span className="text-xs font-medium text-purple-700">
                    High confidence match
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dashboardMetrics.slice(1).map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-medium text-neutral-600">
                        {metric.label}
                      </p>
                      <p className="text-sm font-bold text-neutral-900">
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

            {floatingStats.map((stat) => (
              <div
                key={stat.label}
                aria-hidden="true"
                className={`${stat.position} rounded-2xl border border-white/80 px-4 py-3 shadow-lg backdrop-blur-md ${
                  stat.filled
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-white/90'
                }`}
              >
                <p
                  className={`text-2xl font-bold ${stat.accent}`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-xs font-medium ${
                    stat.filled ? 'text-blue-100' : 'text-neutral-500'
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
