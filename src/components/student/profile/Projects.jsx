import {
    FolderGit2,
    Github,
    ExternalLink,
    Plus,
    Pencil,
    Trash2,
  } from "lucide-react";
  
  const projects = [
    {
      id: 1,
      title: "CampusTE",
      description:
        "AI-powered campus recruitment platform connecting students, recruiters, and placement officers.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "Hospital Management System",
      description:
        "A web application for managing patient records, appointments, and billing.",
      technologies: ["Java", "MySQL", "Spring Boot"],
      github: "#",
      demo: "#",
    },
  ];
  
  function Projects() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        <div className="mb-8 flex items-center justify-between">
  
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Projects
            </h2>
  
            <p className="mt-2 text-neutral-600">
              Showcase your academic and personal projects.
            </p>
          </div>
  
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]">
            <Plus size={18} />
            Add Project
          </button>
  
        </div>
  
        <div className="space-y-6">
  
          {projects.map((project) => (
  
            <article
              key={project.id}
              className="rounded-xl border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
            >
  
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
  
                <div className="flex-1">
  
                  <div className="flex items-center gap-3">
  
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <FolderGit2 size={22} />
                    </div>
  
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {project.title}
                    </h3>
  
                  </div>
  
                  <p className="mt-5 leading-relaxed text-neutral-600">
                    {project.description}
                  </p>
  
                  <div className="mt-5 flex flex-wrap gap-2">
  
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
  
                  </div>
  
                  <div className="mt-6 flex gap-5">
  
                    <a
                      href={project.github}
                      className="flex items-center gap-2 font-medium text-neutral-700 hover:text-blue-600"
                    >
                      <Github size={18} />
                      GitHub
                    </a>
  
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 font-medium text-neutral-700 hover:text-blue-600"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
  
                  </div>
  
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
  
  export default Projects;