import {
  Calendar,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function PersonalInformation({
  profile,
  onChange,
  onSave,
  isSaving,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave();
  };

  return (
    <section
      id="personal-information"
      className="scroll-mt-28 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Personal Information
        </h2>

        <p className="mt-2 text-neutral-600">
          Keep your personal information
          up to date.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >
        <Field
          label="Full Name"
          value={profile.fullName}
          onChange={(value) =>
            onChange(
              "fullName",
              value
            )
          }
          placeholder="Enter your full name"
          disabled={isSaving}
        />

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
              value={profile.email}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-neutral-300 bg-neutral-100 py-3 pl-11 pr-4 text-neutral-600 outline-none"
            />
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            Your login email cannot be
            changed here.
          </p>
        </div>

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
              value={profile.phone}
              onChange={(event) =>
                onChange(
                  "phone",
                  event.target.value
                )
              }
              disabled={isSaving}
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
            />
          </div>
        </div>

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
              value={
                profile.dateOfBirth
              }
              onChange={(event) =>
                onChange(
                  "dateOfBirth",
                  event.target.value
                )
              }
              disabled={isSaving}
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Gender
          </label>

          <select
            value={profile.gender}
            onChange={(event) =>
              onChange(
                "gender",
                event.target.value
              )
            }
            disabled={isSaving}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
          >
            <option value="">
              Select gender
            </option>
            <option value="male">
              Male
            </option>
            <option value="female">
              Female
            </option>
            <option value="other">
              Other
            </option>
            <option value="prefer_not_to_say">
              Prefer not to say
            </option>
          </select>
        </div>

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
              value={profile.city}
              onChange={(event) =>
                onChange(
                  "city",
                  event.target.value
                )
              }
              disabled={isSaving}
              placeholder="Enter your city"
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
            />
          </div>
        </div>

        <Field
          label="State"
          value={profile.state}
          onChange={(value) =>
            onChange("state", value)
          }
          placeholder="Enter your state"
          disabled={isSaving}
        />

        <Field
          label="Country"
          value={profile.country}
          onChange={(value) =>
            onChange(
              "country",
              value
            )
          }
          placeholder="Enter your country"
          disabled={isSaving}
        />

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-neutral-700">
            Profile Summary
          </label>

          <textarea
            value={
              profile.profileSummary
            }
            onChange={(event) =>
              onChange(
                "profileSummary",
                event.target.value
              )
            }
            disabled={isSaving}
            rows={5}
            maxLength={2000}
            placeholder="Write a short professional summary about your interests, skills and career goals."
            className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
          />

          <p className="mt-2 text-right text-xs text-neutral-500">
            {
              profile.profileSummary
                .length
            }
            /2000
          </p>
        </div>

        <div className="flex justify-end md:col-span-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving && (
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
            )}

            {isSaving
              ? "Saving..."
              : "Save Personal Information"}
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}) {
  return (
    <div>
      <label className="mb-2 block font-medium text-neutral-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        disabled={disabled}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
      />
    </div>
  );
}

export default PersonalInformation;