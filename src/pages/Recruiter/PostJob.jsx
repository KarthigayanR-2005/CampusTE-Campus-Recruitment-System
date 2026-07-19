import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  FileText,
  GraduationCap,
  IndianRupee,
  MapPin,
  Plus,
  Save,
  Send,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

const initialForm = {
  jobTitle: "",
  department: "",
  employmentType: "Full-time",
  experience: "Fresher",
  salaryMin: "",
  salaryMax: "",
  city: "",
  country: "India",
  workMode: "On-site",
  openings: "1",
  applicationDeadline: "",
  minimumCgpa: "6.5",
  jobDescription: "",
  responsibilities: "",
  requirements: "",
};

function PostJob() {
  const [formData, setFormData] = useState(initialForm);
  const [requiredSkills, setRequiredSkills] = useState([
    "JavaScript",
    "React",
  ]);
  const [preferredSkills, setPreferredSkills] = useState([
    "Node.js",
    "Git",
  ]);
  const [requiredSkillInput, setRequiredSkillInput] = useState("");
  const [preferredSkillInput, setPreferredSkillInput] = useState("");
  const [eligibleBranches, setEligibleBranches] = useState([
    "Computer Science and Engineering",
    "Information Technology",
  ]);
  const [statusMessage, setStatusMessage] = useState("");

  const branches = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Artificial Intelligence and Data Science",
    "Mechanical Engineering",
    "Civil Engineering",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setStatusMessage("");
  };

  const addSkill = (type) => {
    if (type === "required") {
      const skill = requiredSkillInput.trim();

      if (
        skill &&
        !requiredSkills.some(
          (existingSkill) =>
            existingSkill.toLowerCase() === skill.toLowerCase()
        )
      ) {
        setRequiredSkills((previousSkills) => [
          ...previousSkills,
          skill,
        ]);
      }

      setRequiredSkillInput("");
      return;
    }

    const skill = preferredSkillInput.trim();

    if (
      skill &&
      !preferredSkills.some(
        (existingSkill) =>
          existingSkill.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setPreferredSkills((previousSkills) => [
        ...previousSkills,
        skill,
      ]);
    }

    setPreferredSkillInput("");
  };

  const removeSkill = (skillToRemove, type) => {
    if (type === "required") {
      setRequiredSkills((previousSkills) =>
        previousSkills.filter((skill) => skill !== skillToRemove)
      );
      return;
    }

    setPreferredSkills((previousSkills) =>
      previousSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSkillKeyDown = (event, type) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill(type);
    }
  };

  const toggleBranch = (branch) => {
    setEligibleBranches((previousBranches) =>
      previousBranches.includes(branch)
        ? previousBranches.filter(
            (existingBranch) => existingBranch !== branch
          )
        : [...previousBranches, branch]
    );
  };

  const handleSaveDraft = () => {
    setStatusMessage("Job saved successfully as a draft.");
  };

  const handlePreview = () => {
    setStatusMessage(
      "Preview mode is ready. Review the information before publishing."
    );
  };

  const handlePublish = (event) => {
    event.preventDefault();

    if (
      !formData.jobTitle.trim() ||
      !formData.department.trim() ||
      !formData.applicationDeadline ||
      !formData.jobDescription.trim()
    ) {
      setStatusMessage(
        "Please complete the job title, department, deadline and job description."
      );
      return;
    }

    setStatusMessage("Job published successfully.");
  };

  return (
    <form onSubmit={handlePublish} className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <BriefcaseBusiness size={25} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Recruitment
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Create a New Job Opening
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Add complete job details, define eligibility criteria and
                publish the opportunity for suitable students.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Save size={18} />
                Save Draft
              </button>

              <button
                type="button"
                onClick={handlePreview}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <Eye size={18} />
                Preview
              </button>
            </div>
          </div>
        </div>

        {statusMessage && (
          <div className="flex items-start gap-3 border-t border-neutral-200 bg-blue-50 px-6 py-4 text-sm font-medium text-blue-800 sm:px-8">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.45fr_0.75fr]">
        <div className="space-y-8">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <BriefcaseBusiness size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Basic Job Details
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Enter the primary information candidates will see first.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Job Title
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Example: Software Development Engineer"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition placeholder:text-neutral-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Department
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Engineering"
                    className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Employment Type
                </label>

                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Graduate Trainee</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Experience Level
                </label>

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Fresher</option>
                  <option>0 - 1 Year</option>
                  <option>1 - 2 Years</option>
                  <option>2 - 4 Years</option>
                  <option>4+ Years</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Number of Openings
                </label>

                <div className="relative">
                  <Users
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="number"
                    name="openings"
                    value={formData.openings}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <IndianRupee size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Compensation and Location
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Add salary information and specify where the role is based.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Minimum Salary
                </label>

                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="500000"
                    className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Maximum Salary
                </label>

                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="900000"
                    className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  City
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bengaluru"
                    className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-semibold text-neutral-700">
                  Work Mode
                </label>

                <div className="grid gap-3 sm:grid-cols-3">
                  {["On-site", "Hybrid", "Remote"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() =>
                        setFormData((previousData) => ({
                          ...previousData,
                          workMode: mode,
                        }))
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        formData.workMode === mode
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-neutral-300 text-neutral-700 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                <Sparkles size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Skills
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Add required and preferred skills for candidate matching.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Required Skills
                </label>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={requiredSkillInput}
                    onChange={(event) =>
                      setRequiredSkillInput(event.target.value)
                    }
                    onKeyDown={(event) =>
                      handleSkillKeyDown(event, "required")
                    }
                    placeholder="Enter a skill and press Enter"
                    className="min-w-0 flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => addSkill("required")}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 text-white transition hover:bg-blue-700"
                    aria-label="Add required skill"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() => removeSkill(skill, "required")}
                        className="text-blue-500 hover:text-blue-800"
                        aria-label={`Remove ${skill}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Preferred Skills
                </label>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={preferredSkillInput}
                    onChange={(event) =>
                      setPreferredSkillInput(event.target.value)
                    }
                    onKeyDown={(event) =>
                      handleSkillKeyDown(event, "preferred")
                    }
                    placeholder="Enter an optional skill"
                    className="min-w-0 flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => addSkill("preferred")}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 text-neutral-700 transition hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700"
                    aria-label="Add preferred skill"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {preferredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700"
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() => removeSkill(skill, "preferred")}
                        className="text-purple-500 hover:text-purple-800"
                        aria-label={`Remove ${skill}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <FileText size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Job Description
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Explain the role, responsibilities and expected
                  qualifications.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Role Overview
                </label>

                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe the role, team and career opportunity..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Key Responsibilities
                </label>

                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Enter one responsibility per line..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Candidate Requirements
                </label>

                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Mention technical, academic and communication requirements..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                <GraduationCap size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Eligibility
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Define academic requirements.
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Minimum CGPA
                </label>

                <input
                  type="number"
                  name="minimumCgpa"
                  value={formData.minimumCgpa}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-neutral-700">
                  Eligible Branches
                </label>

                <div className="space-y-3">
                  {branches.map((branch) => (
                    <label
                      key={branch}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50"
                    >
                      <input
                        type="checkbox"
                        checked={eligibleBranches.includes(branch)}
                        onChange={() => toggleBranch(branch)}
                        className="mt-1 h-4 w-4 accent-blue-600"
                      />

                      <span className="text-sm font-medium leading-5 text-neutral-700">
                        {branch}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                <CalendarDays size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Application Deadline
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Select the final date for applications.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Sparkles size={21} className="text-blue-700" />

              <h2 className="text-lg font-bold text-neutral-900">
                AI Assistance
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              AI-based job description improvement, skill suggestions and
              eligibility recommendations can be integrated later.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 w-full cursor-not-allowed rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-400 shadow-sm"
            >
              Generate with AI
            </button>
          </section>

          <section className="sticky top-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-neutral-900">
              Ready to Publish?
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Review all entered details before making the job visible to
              students.
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.01] hover:shadow-lg"
              >
                <Send size={18} />
                Publish Job
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
              >
                <Save size={18} />
                Save as Draft
              </button>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}

export default PostJob;