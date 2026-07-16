import {
    Briefcase,
    Building2,
    MapPin,
    CalendarDays,
    Plus,
    Pencil,
    Trash2,
  } from "lucide-react";
  
  const experiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineering Intern",
      location: "Bangalore, India",
      duration: "May 2026 - July 2026",
      description:
        "Worked on frontend development using React and TypeScript while collaborating with the Cloud team.",
    },
    {
      id: 2,
      company: "Open Source",
      role: "Frontend Contributor",
      location: "Remote",
      duration: "Jan 2026 - Present",
      description:
        "Contributed UI improvements, fixed bugs, and implemented reusable React components.",
    },
  ];
  
  function Experience() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        <div className="mb-8 flex items-center justify-between">
  
          <div>
  
            <h2 className="text-2xl font-bold text-neutral-900">
              Experience
            </h2>
  
            <p className="mt-2 text-neutral-600">
              Highlight your internships, freelance work, and professional experience.
            </p>
  
          </div>
  
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]">
  
            <Plus size={18} />
  
            Add Experience
  
          </button>
  
        </div>
  
        <div className="space-y-6">
  
          {experiences.map((experience) => (
  
            <article
              key={experience.id}
              className="rounded-xl border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
            >
  
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
  
                <div className="flex-1">
  
                  <div className="flex items-center gap-4">
  
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
  
                      <Briefcase size={22} />
  
                    </div>
  
                    <div>
  
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {experience.role}
                      </h3>
  
                      <p className="mt-1 flex items-center gap-2 text-neutral-600">
  
                        <Building2 size={16} />
  
                        {experience.company}
  
                      </p>
  
                    </div>
  
                  </div>
  
                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-neutral-500">
  
                    <span className="flex items-center gap-2">
  
                      <MapPin size={16} />
  
                      {experience.location}
  
                    </span>
  
                    <span className="flex items-center gap-2">
  
                      <CalendarDays size={16} />
  
                      {experience.duration}
  
                    </span>
  
                  </div>
  
                  <p className="mt-5 leading-relaxed text-neutral-600">
                    {experience.description}
                  </p>
  
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
  
  export default Experience;