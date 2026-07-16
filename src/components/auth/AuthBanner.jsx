const stats = [
    {
      value: "10K+",
      label: "Students",
    },
    {
      value: "500+",
      label: "Recruiters",
    },
    {
      value: "50+",
      label: "Universities",
    },
  ];
  
  const highlights = [
    "AI Resume Analysis",
    "Smart Job Matching",
    "Placement Analytics",
    "Campus Recruitment Automation",
  ];
  
  function AuthBanner() {
    return (
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 lg:flex lg:flex-col lg:justify-between">
  
        {/* Background Glow */}
  
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />
  
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-300/10 blur-3xl"
        />
  
        <div className="relative flex h-full flex-col justify-between p-12">
  
          {/* Branding */}
  
          <div>
  
            <div className="flex items-center gap-4">
  
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-blue-700 shadow-xl">
                CT
              </div>
  
              <div>
  
                <h1 className="text-3xl font-bold text-white">
                  CampusTE
                </h1>
  
                <p className="text-blue-100">
                  AI Placement Platform
                </p>
  
              </div>
  
            </div>
  
            <h2 className="mt-14 text-5xl font-bold leading-tight text-white">
              Shape the Future
              <br />
              of Campus
              <br />
              Recruitment
            </h2>
  
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-blue-100">
              One intelligent platform connecting students,
              recruiters, placement officers, and universities
              through AI-powered campus recruitment.
            </p>
  
          </div>
  
          {/* Stats */}
  
          <div className="mt-14 grid grid-cols-3 gap-5">
  
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur"
              >
                <h3 className="text-3xl font-bold text-white">
                  {item.value}
                </h3>
  
                <p className="mt-2 text-sm text-blue-100">
                  {item.label}
                </p>
              </div>
            ))}
  
          </div>
  
          {/* Highlights */}
  
          <div className="mt-14 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur">
  
            <h3 className="text-xl font-semibold text-white">
              Why CampusTE?
            </h3>
  
            <ul className="mt-6 space-y-4">
  
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-blue-100"
                >
                  <span className="text-green-300">✓</span>
  
                  {item}
                </li>
              ))}
  
            </ul>
  
          </div>
  
        </div>
  
      </aside>
    );
  }
  
  export default AuthBanner;