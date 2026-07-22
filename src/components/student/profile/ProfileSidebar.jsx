import {
  Award,
  Briefcase,
  CheckCircle,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";

const completionFields = [
  "fullName",
  "phone",
  "dateOfBirth",
  "gender",
  "city",
  "state",
  "country",
  "rollNumber",
  "institution",
  "degree",
  "department",
  "yearOfStudy",
  "cgpa",
  "graduationYear",
  "linkedinUrl",
  "githubUrl",
  "profileSummary",
];

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

function ProfileSidebar({ profile }) {
  const completedFields =
    completionFields.filter(
      (fieldName) =>
        String(
          profile[fieldName] ?? ""
        ).trim() !== ""
    ).length;

  const completionPercentage =
    Math.round(
      (completedFields /
        completionFields.length) *
        100
    );

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-3xl font-bold text-white">
          {getInitials(
            profile.fullName
          )}
        </div>

        <h2 className="mt-4 text-xl font-bold">
          {profile.fullName ||
            "Student"}
        </h2>

        <p className="text-sm text-neutral-500">
          {profile.department ||
            profile.degree ||
            "Student Profile"}
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">
            Profile Completion
          </span>

          <span className="font-bold text-blue-600">
            {completionPercentage}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <SidebarItem
          icon={<User size={18} />}
          label="Personal Info"
        />

        <SidebarItem
          icon={
            <GraduationCap size={18} />
          }
          label="Education"
        />

        <SidebarItem
          icon={<Briefcase size={18} />}
          label="Experience"
        />

        <SidebarItem
          icon={<Award size={18} />}
          label="Certifications"
        />

        <SidebarItem
          icon={<FileText size={18} />}
          label="Resume"
        />

        <SidebarItem
          icon={
            <CheckCircle size={18} />
          }
          label="AI Score"
        />
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-neutral-100">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default ProfileSidebar;