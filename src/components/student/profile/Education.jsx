import {
  GraduationCap,
  LoaderCircle,
} from "lucide-react";

function Education({
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
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <GraduationCap size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Primary Education
          </h2>

          <p className="mt-2 text-neutral-600">
            Add your current degree and
            academic information.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >
        <EducationField
          label="Institution"
          value={profile.institution}
          onChange={(value) =>
            onChange(
              "institution",
              value
            )
          }
          placeholder="Amrita Vishwa Vidyapeetham"
          disabled={isSaving}
        />

        <EducationField
          label="Roll Number"
          value={profile.rollNumber}
          onChange={(value) =>
            onChange(
              "rollNumber",
              value
            )
          }
          placeholder="Enter your roll number"
          disabled={isSaving}
        />

        <EducationField
          label="Degree"
          value={profile.degree}
          onChange={(value) =>
            onChange("degree", value)
          }
          placeholder="B.Tech"
          disabled={isSaving}
        />

        <EducationField
          label="Department / Branch"
          value={profile.department}
          onChange={(value) =>
            onChange(
              "department",
              value
            )
          }
          placeholder="Computer Science Engineering"
          disabled={isSaving}
        />

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Year of Study
          </label>

          <select
            value={
              profile.yearOfStudy
            }
            onChange={(event) =>
              onChange(
                "yearOfStudy",
                event.target.value
              )
            }
            disabled={isSaving}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
          >
            <option value="">
              Select year
            </option>

            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (year) => (
                <option
                  key={year}
                  value={year}
                >
                  Year {year}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            CGPA
          </label>

          <input
            type="number"
            min="0"
            max="10"
            step="0.01"
            value={profile.cgpa}
            onChange={(event) =>
              onChange(
                "cgpa",
                event.target.value
              )
            }
            disabled={isSaving}
            placeholder="8.72"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Graduation Year
          </label>

          <input
            type="number"
            min="2000"
            max="2200"
            value={
              profile.graduationYear
            }
            onChange={(event) =>
              onChange(
                "graduationYear",
                event.target.value
              )
            }
            disabled={isSaving}
            placeholder="2027"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
          />
        </div>

        <div className="flex items-end justify-end md:col-span-2">
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
              : "Save Education"}
          </button>
        </div>
      </form>
    </section>
  );
}

function EducationField({
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

export default Education;