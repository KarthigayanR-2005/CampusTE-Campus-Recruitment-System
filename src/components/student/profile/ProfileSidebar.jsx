import {
    User,
    FileText,
    Award,
    Briefcase,
    GraduationCap,
    CheckCircle,
  } from "lucide-react";
  
  function ProfileSidebar() {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
  
        <div className="flex flex-col items-center">
  
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-blue-100 object-cover"
          />
  
          <h2 className="mt-4 text-xl font-bold">
            John Doe
          </h2>
  
          <p className="text-sm text-neutral-500">
            Computer Science Student
          </p>
  
        </div>
  
        <div className="mt-8">
  
          <div className="mb-2 flex items-center justify-between">
  
            <span className="font-medium">
              Profile Completion
            </span>
  
            <span className="font-bold text-blue-600">
              82%
            </span>
  
          </div>
  
          <div className="h-3 rounded-full bg-neutral-200">
  
            <div className="h-3 w-[82%] rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
  
          </div>
  
        </div>
  
        <div className="mt-8 space-y-4">
  
          <SidebarItem icon={<User size={18} />} label="Personal Info" />
  
          <SidebarItem icon={<GraduationCap size={18} />} label="Education" />
  
          <SidebarItem icon={<Briefcase size={18} />} label="Experience" />
  
          <SidebarItem icon={<Award size={18} />} label="Certifications" />
  
          <SidebarItem icon={<FileText size={18} />} label="Resume" />
  
          <SidebarItem icon={<CheckCircle size={18} />} label="AI Score" />
  
        </div>
  
      </div>
    );
  }
  
  function SidebarItem({ icon, label }) {
    return (
      <div className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-neutral-100">
  
        {icon}
  
        <span>{label}</span>
  
      </div>
    );
  }
  
  export default ProfileSidebar;