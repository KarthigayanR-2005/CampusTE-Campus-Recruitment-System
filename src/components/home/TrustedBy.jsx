const partners = [
  {
    name: 'Amrita University',
    initials: 'AU',
    category: 'University',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'IIT Madras',
    initials: 'IIT',
    category: 'University',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Anna University',
    initials: 'AU',
    category: 'University',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'NIT Trichy',
    initials: 'NIT',
    category: 'University',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'TCS',
    initials: 'TCS',
    category: 'Technology Partner',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'Infosys',
    initials: 'IN',
    category: 'Technology Partner',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    name: 'Accenture',
    initials: 'AC',
    category: 'Recruitment Partner',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'Zoho',
    initials: 'Z',
    category: 'Technology Partner',
    gradient: 'from-blue-600 to-purple-600',
  },
];

function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Trusted By
          </p>
          <h2
            id="trusted-by-heading"
            className="mb-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
          >
            Trusted by Leading Universities &amp; Recruiters
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
            CampusTE helps educational institutions and organizations streamline
            campus recruitment through AI-powered automation and intelligent
            hiring workflows.
          </p>
        </div>

        <ul
          aria-label="Partner organizations"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {partners.map((partner) => (
            <li key={partner.name}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div
                  aria-hidden="true"
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${partner.gradient} text-sm font-bold text-white shadow-md transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:brightness-110`}
                >
                  {partner.initials}
                </div>
                <h3 className="mb-1 text-sm font-semibold text-neutral-900">
                  {partner.name}
                </h3>
                <p className="text-xs font-medium text-neutral-500">
                  {partner.category}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TrustedBy;
