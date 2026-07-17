import {
    FileText,
    CalendarDays,
    RefreshCw,
    HardDrive,
  } from "lucide-react";
  
  function ResumeStats({ resume }) {
    const stats = [
      {
        title: "Resume Name",
        value: resume.fileName,
        icon: FileText,
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Uploaded On",
        value: resume.uploadedOn,
        icon: CalendarDays,
        color: "bg-green-100 text-green-600",
      },
      {
        title: "Last Updated",
        value: resume.updatedOn,
        icon: RefreshCw,
        color: "bg-purple-100 text-purple-600",
      },
      {
        title: "File Size",
        value: resume.fileSize,
        icon: HardDrive,
        color: "bg-orange-100 text-orange-600",
      },
    ];
  
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
  
              <div className="flex items-center justify-between">
  
                <div>
  
                  <p className="text-sm text-neutral-500">
                    {stat.title}
                  </p>
  
                  <h2 className="mt-2 break-words text-lg font-bold text-neutral-800">
                    {stat.value}
                  </h2>
  
                </div>
  
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
                >
  
                  <Icon size={28} />
  
                </div>
  
              </div>
  
            </div>
          );
        })}
  
      </section>
    );
  }
  
  export default ResumeStats;