const workflowSteps = [
    {
      step: "01",
      title: "Student Registration",
      description:
        "Students create their profiles, upload resumes, certificates, projects, and skill details.",
    },
    {
      step: "02",
      title: "AI Resume Analysis",
      description:
        "CampusTE analyzes resumes, identifies strengths, detects skill gaps, and provides personalized recommendations.",
    },
    {
      step: "03",
      title: "Smart Job Matching",
      description:
        "The AI engine automatically recommends the most relevant placement opportunities based on student profiles.",
    },
    {
      step: "04",
      title: "Recruiter Shortlisting",
      description:
        "Recruiters review AI-ranked candidates, shortlist applicants, and schedule interviews effortlessly.",
    },
    {
      step: "05",
      title: "Interview Process",
      description:
        "Students attend interviews while placement officers monitor the entire recruitment workflow in real time.",
    },
    {
      step: "06",
      title: "Offer & Placement",
      description:
        "Selected candidates receive offers, placement statistics are updated automatically, and reports are generated.",
    },
  ];
  
  function Workflow() {
    return (
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
              Recruitment Workflow
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              From Registration to Placement
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              CampusTE automates the entire recruitment journey, ensuring a
              seamless experience for students, recruiters, and placement officers.
            </p>
          </div>
  
          {/* Timeline */}
  
          <div className="relative">
  
            {/* Vertical Line */}
  
            <div className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-600 md:block"></div>
  
            <div className="space-y-10">
  
              {workflowSteps.map((item) => (
  
                <div
                  key={item.step}
                  className="relative flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:ml-12 md:flex-row md:items-start"
                >
  
                  {/* Circle */}
  
                  <div className="absolute -left-16 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white shadow-lg">
                    {item.step}
                  </div>
  
                  {/* Mobile Badge */}
  
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white md:hidden">
                    {item.step}
                  </div>
  
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {item.title}
                    </h3>
  
                    <p className="mt-3 leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>
  
                </div>
  
              ))}
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Workflow;