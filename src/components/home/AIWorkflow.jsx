const steps = [
  {
    title: 'Resume Upload',
    description:
      'Students upload resumes and academic profiles securely.',
    icon: 'RU',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    title: 'AI Resume Analysis',
    description:
      'AI evaluates resumes, skills, and projects to generate insights.',
    icon: 'AI',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Eligibility Verification',
    description:
      'Automatically checks CGPA, backlogs, branch, and company criteria.',
    icon: 'EV',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Smart Shortlisting',
    description:
      'AI ranks eligible candidates using customizable recruitment criteria.',
    icon: 'SS',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    title: 'Interview Scheduling',
    description:
      'Automatically schedule interviews and notify candidates.',
    icon: 'IS',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Placement Analytics',
    description:
      'Generate hiring insights, reports, and placement statistics.',
    icon: 'PA',
    gradient: 'from-blue-600 to-purple-600',
  },
];

function StepCard({ step, stepNumber }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-blue-500/10 focus-within:-translate-y-1 focus-within:border-purple-200 focus-within:shadow-lg sm:p-6">
      <div className="mb-1 text-xs font-semibold text-blue-600">
        Step {stepNumber}
      </div>
      <div
        aria-hidden="true"
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} text-xs font-bold text-white shadow-md transition-all duration-200 group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-lg`}
      >
        {step.icon}
      </div>
      <h3 className="mb-2 text-sm font-semibold text-neutral-900 sm:text-base">
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed text-neutral-600">
        {step.description}
      </p>
    </article>
  );
}

function HorizontalConnector() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center px-1 transition-opacity duration-200 group-hover/step:opacity-100 lg:px-2"
    >
      <div className="h-0.5 w-4 bg-gradient-to-r from-blue-400 to-purple-400 opacity-60 transition-all duration-200 group-hover/step:opacity-100 group-hover/step:from-blue-500 group-hover/step:to-purple-500 lg:w-6" />
      <div className="h-2 w-2 rotate-45 border-r-2 border-t-2 border-purple-400 opacity-60 transition-all duration-200 group-hover/step:border-purple-600 group-hover/step:opacity-100" />
    </div>
  );
}

function RowConnector({ direction = 'right' }) {
  if (direction === 'right') {
    return (
      <div
        aria-hidden="true"
        className="hidden items-center self-center md:flex lg:hidden"
      >
        <div className="h-0.5 w-6 bg-gradient-to-r from-blue-400 to-purple-400 opacity-60 transition-all duration-200 group-hover/step:opacity-100" />
        <div className="h-2 w-2 rotate-45 border-r-2 border-t-2 border-purple-400 opacity-60" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="col-span-3 hidden justify-center py-2 md:flex lg:hidden"
    >
      <div className="flex flex-col items-center">
        <div className="h-4 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 opacity-60" />
        <div className="h-2 w-2 rotate-[135deg] border-r-2 border-t-2 border-purple-400 opacity-60" />
      </div>
    </div>
  );
}

function AIWorkflow() {
  return (
    <section
      aria-labelledby="ai-workflow-heading"
      className="bg-gradient-to-b from-blue-50/40 via-white to-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            AI Workflow
          </p>
          <h2
            id="ai-workflow-heading"
            className="mb-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          >
            How CampusTE&apos;s AI Powers Smarter Recruitment
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
            From resume submission to hiring insights, CampusTE automates every
            stage of campus recruitment with intelligent AI-driven workflows
            that save time, improve accuracy, and enhance decision-making.
          </p>
        </div>

        <ol
          aria-label="CampusTE AI recruitment workflow"
          className="relative space-y-6 md:hidden"
        >
          {steps.map((step, index) => (
            <li key={step.title} className="group/step relative pl-12">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[1.125rem] top-14 h-[calc(100%+0.5rem)] w-0.5 bg-gradient-to-b from-blue-400 to-purple-400 opacity-60 transition-all duration-200 group-hover/step:opacity-100"
                />
              )}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} text-xs font-bold text-white shadow-md transition-all duration-200 group-hover/step:scale-105 group-hover/step:brightness-110`}
              >
                {index + 1}
              </span>
              <StepCard step={step} stepNumber={index + 1} />
            </li>
          ))}
        </ol>

        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-y-6 lg:hidden">
          {steps.map((step, index) => {
            const isEndOfFirstRow = index === 2;
            const isNotLastInRow = index % 3 !== 2 && index < steps.length - 1;
            const showRowConnector = index === 2;

            return (
              <div
                key={step.title}
                className={`group/step contents ${showRowConnector ? '' : ''}`}
              >
                <div className="flex min-w-0">
                  <StepCard step={step} stepNumber={index + 1} />
                </div>
                {isNotLastInRow && !isEndOfFirstRow && index < 3 && (
                  <RowConnector direction="right" />
                )}
                {isNotLastInRow && index >= 3 && (
                  <RowConnector direction="right" />
                )}
                {showRowConnector && <RowConnector direction="down" />}
              </div>
            );
          })}
        </div>

        <ol
          aria-label="CampusTE AI recruitment workflow steps"
          className="hidden items-stretch lg:flex"
        >
          {steps.map((step, index) => (
            <li key={step.title} className="group/step flex min-w-0 flex-1 items-stretch">
              <div className="flex min-w-0 flex-1 flex-col">
                <StepCard step={step} stepNumber={index + 1} />
              </div>
              {index < steps.length - 1 && <HorizontalConnector />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default AIWorkflow;
