import {
    Award,
    CalendarDays,
    ExternalLink,
    Plus,
    Pencil,
    Trash2,
  } from "lucide-react";
  
  const certifications = [
    {
      id: 1,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "June 2026",
      credentialUrl: "#",
    },
    {
      id: 2,
      title: "Google Data Analytics",
      issuer: "Google",
      issueDate: "March 2026",
      credentialUrl: "#",
    },
  ];
  
  function Certifications() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        <div className="mb-8 flex items-center justify-between">
  
          <div>
  
            <h2 className="text-2xl font-bold text-neutral-900">
              Certifications
            </h2>
  
            <p className="mt-2 text-neutral-600">
              Showcase certifications that strengthen your profile.
            </p>
  
          </div>
  
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]">
  
            <Plus size={18} />
  
            Add Certification
  
          </button>
  
        </div>
  
        <div className="space-y-6">
  
          {certifications.map((certificate) => (
  
            <article
              key={certificate.id}
              className="rounded-xl border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
            >
  
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
  
                <div className="flex-1">
  
                  <div className="flex items-center gap-4">
  
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
  
                      <Award size={22} />
  
                    </div>
  
                    <div>
  
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {certificate.title}
                      </h3>
  
                      <p className="mt-1 text-neutral-600">
                        {certificate.issuer}
                      </p>
  
                    </div>
  
                  </div>
  
                  <div className="mt-5 flex items-center gap-2 text-sm text-neutral-500">
  
                    <CalendarDays size={16} />
  
                    {certificate.issueDate}
  
                  </div>
  
                  <a
                    href={certificate.credentialUrl}
                    className="mt-5 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                  >
  
                    <ExternalLink size={18} />
  
                    View Credential
  
                  </a>
  
                </div>
  
                <div className="flex gap-3">
  
                  <button className="rounded-lg border border-neutral-200 p-3 transition hover:bg-neutral-100">
  
                    <Pencil size={18} />
  
                  </button>
  
                  <button className="rounded-lg border border-red-200 p-3 text-red-600 transition hover:bg-red-50">
  
                    <Trash2 size={18} />
  
                  </button>
  
                </div>
  
              </div>
  
            </article>
  
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default Certifications;