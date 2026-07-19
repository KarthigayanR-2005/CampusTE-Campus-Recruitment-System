import { useState } from "react";
import {
  Building2,
  Camera,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Users,
} from "lucide-react";

function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState({
    name: "TechNova Solutions",
    industry: "Information Technology",
    size: "201 - 500 Employees",
    founded: "2018",
    website: "https://technova.example.com",
    email: "careers@technova.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    hrName: "Ananya Sharma",
    hrDesignation: "Senior Talent Acquisition Manager",
    description:
      "TechNova Solutions is a technology-driven company focused on developing modern software products, cloud solutions, and AI-powered business platforms. We work with talented professionals and students to build meaningful digital experiences.",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCompany((previousCompany) => ({
      ...previousCompany,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600" />

        <div className="px-6 pb-8 sm:px-8">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-white bg-neutral-900 text-white shadow-lg">
                <Building2 size={54} />

                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                  aria-label="Change company logo"
                >
                  <Camera size={18} />
                </button>
              </div>

              <div className="pb-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Company Profile
                </p>

                <h1 className="mt-2 text-3xl font-bold text-neutral-900">
                  {company.name}
                </h1>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-2">
                    <Building2 size={16} />
                    {company.industry}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} />
                    {company.location}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Users size={16} />
                    {company.size}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                isEditing ? handleSave() : setIsEditing(true)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
            >
              <Save size={18} />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Company Information
            </h2>

            <p className="mt-2 text-neutral-600">
              Manage the information visible to students and applicants.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Company Name
              </label>

              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Industry
              </label>

              <input
                type="text"
                name="industry"
                value={company.industry}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Company Size
              </label>

              <select
                name="size"
                value={company.size}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                <option>1 - 50 Employees</option>
                <option>51 - 200 Employees</option>
                <option>201 - 500 Employees</option>
                <option>501 - 1000 Employees</option>
                <option>1000+ Employees</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Founded Year
              </label>

              <input
                type="number"
                name="founded"
                value={company.founded}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Company Description
              </label>

              <textarea
                name="description"
                value={company.description}
                onChange={handleChange}
                disabled={!isEditing}
                rows={6}
                className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 leading-7 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900">
              Contact Details
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Website
                </label>

                <div className="relative">
                  <Globe
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="url"
                    name="website"
                    value={company.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={company.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Phone
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={company.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={company.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900">
              HR Contact
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  HR Name
                </label>

                <input
                  type="text"
                  name="hrName"
                  value={company.hrName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Designation
                </label>

                <input
                  type="text"
                  name="hrDesignation"
                  value={company.hrDesignation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;