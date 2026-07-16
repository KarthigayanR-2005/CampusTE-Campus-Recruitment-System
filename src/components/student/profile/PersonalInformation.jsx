import { Mail, Phone, Calendar, MapPin } from "lucide-react";

function PersonalInformation() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-neutral-900">
          Personal Information
        </h2>

        <p className="mt-2 text-neutral-600">
          Keep your personal information up to date.
        </p>

      </div>

      <form className="grid gap-6 md:grid-cols-2">

        {/* Full Name */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Email Address
          </label>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Phone Number
          </label>

          <div className="relative">

            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* DOB */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Date of Birth
          </label>

          <div className="relative">

            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="date"
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* Gender */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Gender
          </label>

          <select className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        {/* City */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            City
          </label>

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="text"
              placeholder="Enter your city"
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* State */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            State
          </label>

          <input
            type="text"
            placeholder="Enter your state"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Country */}

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Country
          </label>

          <input
            type="text"
            placeholder="Enter your country"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

      </form>

      <div className="mt-8 flex justify-end">

        <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02]">
          Save Changes
        </button>

      </div>

    </section>
  );
}

export default PersonalInformation;