import {
  Building2,
  CalendarDays,
} from "lucide-react";

function UpcomingDrives() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          Upcoming Placement Drives
        </h2>

        <p className="mt-1 text-neutral-600">
          Recruitment opportunities
          published by approved
          recruiters.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
          <Building2 size={30} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-neutral-900">
          No placement drives available
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
          Upcoming drives will appear
          here after the recruitment
          drive module is implemented
          and recruiters publish
          opportunities.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-600">
          <CalendarDays size={16} />
          Nothing scheduled
        </div>
      </div>
    </section>
  );
}

export default UpcomingDrives;