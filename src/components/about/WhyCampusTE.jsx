const traditional = [
    "Manual resume screening",
    "Spreadsheet-based management",
    "Scattered communication",
    "Slow placement process",
    "Limited analytics",
    "Difficult student tracking",
  ];
  
  const campuste = [
    "AI-powered resume analysis",
    "Centralized smart dashboard",
    "Real-time notifications",
    "Automated recruitment workflow",
    "Advanced analytics & insights",
    "Complete student lifecycle tracking",
  ];
  
  function WhyCampusTE() {
    return (
      <section className="bg-gradient-to-b from-blue-50/40 via-white to-purple-50/30 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
  
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Why CampusTE?
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Traditional Placement vs CampusTE
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              CampusTE replaces outdated placement processes with a modern,
              AI-powered ecosystem that improves efficiency, transparency,
              and collaboration.
            </p>
  
          </div>
  
          {/* Comparison */}
  
          <div className="grid gap-8 lg:grid-cols-2">
  
            {/* Traditional */}
  
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">
  
              <h3 className="mb-8 text-2xl font-bold text-red-600">
                Traditional Placement System
              </h3>
  
              <ul className="space-y-5">
  
                {traditional.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                      ✕
                    </span>
  
                    <span className="text-neutral-700">
                      {item}
                    </span>
                  </li>
                ))}
  
              </ul>
  
            </div>
  
            {/* CampusTE */}
  
            <div className="rounded-3xl border border-green-200 bg-green-50 p-8 shadow-sm">
  
              <h3 className="mb-8 text-2xl font-bold text-green-600">
                CampusTE Platform
              </h3>
  
              <ul className="space-y-5">
  
                {campuste.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                      ✓
                    </span>
  
                    <span className="text-neutral-700">
                      {item}
                    </span>
                  </li>
                ))}
  
              </ul>
  
            </div>
  
          </div>
  
          {/* Bottom Card */}
  
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-center text-white shadow-xl">
  
            <h3 className="text-3xl font-bold">
              Smarter Hiring Begins Here
            </h3>
  
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
              CampusTE combines automation, artificial intelligence,
              analytics, and collaboration into one unified platform,
              enabling universities and recruiters to achieve faster,
              fairer, and more successful placement outcomes.
            </p>
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default WhyCampusTE;