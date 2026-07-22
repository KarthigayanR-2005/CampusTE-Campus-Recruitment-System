import {
  Camera,
  Pencil,
} from "lucide-react";

function getInitials(fullName) {
  if (!fullName) {
    return "ST";
  }

  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) =>
      word.charAt(0).toUpperCase()
    )
    .join("");
}

function ProfileHeader({
  profile,
  onEdit,
}) {
  const qualification = [
    profile.degree,
    profile.department,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-4xl font-bold text-white">
              {getInitials(
                profile.fullName
              )}
            </div>

            <button
              type="button"
              disabled
              title="Photo upload will be added with the resume and media stage."
              className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-neutral-400 shadow-lg"
            >
              <Camera size={18} />
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              {profile.fullName ||
                "Complete Your Profile"}
            </h1>

            <p className="mt-2 text-neutral-600">
              {qualification ||
                "Add your degree and department"}
            </p>

            <p className="mt-1 text-neutral-500">
              {profile.institution ||
                "Add your institution"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition hover:scale-[1.02]"
        >
          <Pencil size={18} />
          Edit Profile
        </button>
      </div>
    </section>
  );
}

export default ProfileHeader;